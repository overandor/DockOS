from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str | None = None
    role: str = "guest"


class UserOut(BaseModel):
    id: UUID
    email: EmailStr
    name: str | None
    role: str

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SpaceCreate(BaseModel):
    title: str
    description: str | None = None
    space_type: str
    address: str | None = None
    price_per_minute_usd: float
    minimum_minutes: int = 10
    maximum_minutes: int = 180


class SpaceOut(BaseModel):
    id: UUID
    host_id: UUID
    title: str
    price_per_minute_usd: float
    minimum_minutes: int
    maximum_minutes: int

    class Config:
        from_attributes = True


class AvailabilityCreate(BaseModel):
    start_time: datetime
    end_time: datetime
    price_override_per_minute: float | None = None
    premium_private_access: bool = False
    host_away: bool = False
    auto_accept: bool = False


class BookingRequestCreate(BaseModel):
    space_id: UUID
    requested_start: datetime
    requested_end: datetime
    guest_message: str | None = None


class BookingOut(BaseModel):
    id: UUID
    space_id: UUID
    guest_id: UUID
    host_id: UUID
    start_time: datetime
    end_time: datetime
    status: str
    total_price_usd: float | None = None
    platform_fee_usd: float | None = None
    host_payout_usd: float | None = None

    class Config:
        from_attributes = True
