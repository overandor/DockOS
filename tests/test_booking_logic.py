from datetime import datetime, timedelta

import pytest
from fastapi import HTTPException

from app.services.booking_logic import ensure_duration_valid, settlement_amounts


class SpaceStub:
    minimum_minutes = 10
    maximum_minutes = 60


def test_duration_enforced():
    start = datetime.utcnow()
    with pytest.raises(HTTPException):
        ensure_duration_valid(SpaceStub(), start, start + timedelta(minutes=5))

    duration = ensure_duration_valid(SpaceStub(), start, start + timedelta(minutes=30))
    assert duration == 30


def test_platform_fee_calculation():
    fee, payout = settlement_amounts(100.0)
    assert fee == 15.0
    assert payout == 85.0
