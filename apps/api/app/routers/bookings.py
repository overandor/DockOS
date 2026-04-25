from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.deps import get_current_user
from app.models import Booking, BookingRequest, PaymentLedger, Space, User
from app.schemas.common import BookingRequestCreate
from app.services.booking_logic import ensure_duration_valid, ensure_no_overlap, quote_price, settlement_amounts

router = APIRouter(tags=["bookings"])


@router.post("/booking-requests")
def create_booking_request(payload: BookingRequestCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    space = db.get(Space, payload.space_id)
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    duration = ensure_duration_valid(space, payload.requested_start, payload.requested_end)
    quoted_price = quote_price(db, space, payload.requested_start, payload.requested_end)

    booking_request = BookingRequest(
        guest_id=user.id,
        host_id=space.host_id,
        space_id=space.id,
        requested_start=payload.requested_start,
        requested_end=payload.requested_end,
        duration_minutes=duration,
        quoted_price=quoted_price,
        guest_message=payload.guest_message,
    )
    db.add(booking_request)
    db.commit()
    db.refresh(booking_request)
    return booking_request


@router.post("/booking-requests/{request_id}/accept")
def accept_booking(request_id: UUID, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    req = db.get(BookingRequest, request_id)
    if not req:
        raise HTTPException(status_code=404, detail="Booking request not found")
    if req.host_id != user.id:
        raise HTTPException(status_code=403, detail="Only host can accept")

    ensure_no_overlap(db, req.space_id, req.requested_start, req.requested_end)
    req.status = "accepted"

    booking = Booking(
        booking_request_id=req.id,
        guest_id=req.guest_id,
        host_id=req.host_id,
        space_id=req.space_id,
        start_time=req.requested_start,
        end_time=req.requested_end,
        status="confirmed",
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


@router.post("/booking-requests/{request_id}/reject")
def reject_booking(request_id: UUID, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    req = db.get(BookingRequest, request_id)
    if not req:
        raise HTTPException(status_code=404, detail="Booking request not found")
    if req.host_id != user.id:
        raise HTTPException(status_code=403, detail="Only host can reject")
    req.status = "rejected"
    db.commit()
    return {"status": "rejected"}


@router.post("/bookings/{booking_id}/check-in")
def check_in(booking_id: UUID, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if user.id not in {booking.guest_id, booking.host_id}:
        raise HTTPException(status_code=403, detail="Not allowed")
    booking.actual_checkin_time = datetime.now(timezone.utc)
    booking.status = "checked_in"
    db.commit()
    db.refresh(booking)
    return booking


@router.post("/bookings/{booking_id}/check-out")
def check_out(booking_id: UUID, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if user.id not in {booking.guest_id, booking.host_id}:
        raise HTTPException(status_code=403, detail="Not allowed")

    request_obj = db.execute(select(BookingRequest).where(BookingRequest.id == booking.booking_request_id)).scalar_one()
    total_price = float(request_obj.quoted_price)
    platform_fee, host_payout = settlement_amounts(total_price)

    booking.actual_checkout_time = datetime.now(timezone.utc)
    booking.status = "completed"
    booking.total_price_usd = total_price
    booking.platform_fee_usd = platform_fee
    booking.host_payout_usd = host_payout

    db.add(PaymentLedger(
        booking_id=booking.id,
        gross_amount_usd=total_price,
        platform_fee_usd=platform_fee,
        host_payout_usd=host_payout,
        status="settled",
    ))
    db.commit()
    db.refresh(booking)
    return booking


@router.post("/bookings/{booking_id}/extend")
def extend_booking(booking_id: UUID):
    return {"status": "stub", "message": "Extension flow to be implemented"}


@router.get("/payments/ledger")
def payment_ledger(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.execute(select(PaymentLedger)).scalars().all()


@router.get("/messages")
def messages_stub():
    return {"status": "stub"}


@router.get("/reviews")
def reviews_stub():
    return {"status": "stub"}


@router.get("/disputes")
def disputes_stub():
    return {"status": "stub"}


@router.get("/admin")
def admin_stub():
    return {"status": "stub"}
