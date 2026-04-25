import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    phone: Mapped[str | None] = mapped_column(String, nullable=True)
    name: Mapped[str | None] = mapped_column(String, nullable=True)
    role: Mapped[str] = mapped_column(String, default="guest")
    verification_status: Mapped[str] = mapped_column(String, default="unverified")
    rating: Mapped[float] = mapped_column(Float, default=0.0)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class Space(Base):
    __tablename__ = "spaces"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    host_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    space_type: Mapped[str] = mapped_column(String, nullable=False)
    latitude: Mapped[float | None] = mapped_column(Numeric, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Numeric, nullable=True)
    address: Mapped[str | None] = mapped_column(String, nullable=True)
    price_per_minute_usd: Mapped[float] = mapped_column(Numeric, nullable=False)
    minimum_minutes: Mapped[int] = mapped_column(Integer, default=10)
    maximum_minutes: Mapped[int] = mapped_column(Integer, default=180)
    privacy_level: Mapped[str] = mapped_column(String, default="semi_private")
    host_presence_mode: Mapped[str] = mapped_column(String, default="host_present")
    approval_mode: Mapped[str] = mapped_column(String, default="manual")
    status: Mapped[str] = mapped_column(String, default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class SpaceRule(Base):
    __tablename__ = "space_rules"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    space_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("spaces.id"), nullable=False)
    smoking_allowed: Mapped[bool] = mapped_column(Boolean, default=False)
    talking_allowed: Mapped[bool] = mapped_column(Boolean, default=True)
    phone_calls_allowed: Mapped[bool] = mapped_column(Boolean, default=True)
    wifi: Mapped[bool] = mapped_column(Boolean, default=False)
    restroom_access: Mapped[bool] = mapped_column(Boolean, default=False)
    food_allowed: Mapped[bool] = mapped_column(Boolean, default=False)
    pets_allowed: Mapped[bool] = mapped_column(Boolean, default=False)
    quiet_required: Mapped[bool] = mapped_column(Boolean, default=False)
    host_away_confirmed: Mapped[bool] = mapped_column(Boolean, default=False)
    private_access_allowed: Mapped[bool] = mapped_column(Boolean, default=False)


class AvailabilityWindow(Base):
    __tablename__ = "availability_windows"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    space_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("spaces.id"), nullable=False)
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    price_override_per_minute: Mapped[float | None] = mapped_column(Numeric, nullable=True)
    premium_private_access: Mapped[bool] = mapped_column(Boolean, default=False)
    host_away: Mapped[bool] = mapped_column(Boolean, default=False)
    auto_accept: Mapped[bool] = mapped_column(Boolean, default=False)


class BookingRequest(Base):
    __tablename__ = "booking_requests"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    guest_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    host_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    space_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("spaces.id"), nullable=False)
    requested_start: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    requested_end: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    duration_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    quoted_price: Mapped[float] = mapped_column(Numeric, nullable=False)
    status: Mapped[str] = mapped_column(String, default="pending")
    guest_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    host_response_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_request_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("booking_requests.id"))
    guest_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    host_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    space_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("spaces.id"), nullable=False)
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    actual_checkin_time: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    actual_checkout_time: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    total_price_usd: Mapped[float | None] = mapped_column(Numeric, nullable=True)
    platform_fee_usd: Mapped[float | None] = mapped_column(Numeric, nullable=True)
    host_payout_usd: Mapped[float | None] = mapped_column(Numeric, nullable=True)
    status: Mapped[str] = mapped_column(String, default="confirmed")


class PaymentLedger(Base):
    __tablename__ = "payment_ledger"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("bookings.id"), nullable=False)
    gross_amount_usd: Mapped[float] = mapped_column(Numeric, nullable=False)
    platform_fee_usd: Mapped[float] = mapped_column(Numeric, nullable=False)
    host_payout_usd: Mapped[float] = mapped_column(Numeric, nullable=False)
    status: Mapped[str] = mapped_column(String, default="settled")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class Dispute(Base):
    __tablename__ = "disputes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("bookings.id"), nullable=False)
    reason: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String, default="open")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
