from datetime import datetime

from fastapi import HTTPException
from sqlalchemy import and_, or_, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models import AvailabilityWindow, Booking, Space


def minutes_between(start: datetime, end: datetime) -> int:
    return int((end - start).total_seconds() // 60)


def ensure_duration_valid(space: Space, start: datetime, end: datetime) -> int:
    duration = minutes_between(start, end)
    if duration < space.minimum_minutes or duration > space.maximum_minutes:
        raise HTTPException(status_code=400, detail="Requested duration outside allowed range")
    return duration


def ensure_no_overlap(db: Session, space_id, start: datetime, end: datetime):
    overlap_stmt = select(Booking).where(
        Booking.space_id == space_id,
        Booking.status.in_(["confirmed", "checked_in"]),
        Booking.start_time < end,
        Booking.end_time > start,
    )
    existing = db.execute(overlap_stmt).scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=409, detail="Booking overlaps with existing booking")


def quote_price(db: Session, space: Space, start: datetime, end: datetime) -> float:
    duration = minutes_between(start, end)
    base_rate = float(space.price_per_minute_usd)
    price = duration * base_rate

    window_stmt = select(AvailabilityWindow).where(
        AvailabilityWindow.space_id == space.id,
        AvailabilityWindow.start_time <= start,
        AvailabilityWindow.end_time >= end,
    )
    window = db.execute(window_stmt).scalar_one_or_none()
    if window and window.price_override_per_minute:
        price = duration * float(window.price_override_per_minute)
    if window and window.host_away and window.premium_private_access:
        price *= 1.2
    return round(price, 2)


def settlement_amounts(total_price: float) -> tuple[float, float]:
    platform_fee = round(total_price * settings.platform_fee_rate, 2)
    host_payout = round(total_price - platform_fee, 2)
    return platform_fee, host_payout
