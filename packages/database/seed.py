"""Simple seed script for DockOS local development."""

import uuid
from datetime import datetime, timedelta

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.security import hash_password
from app.models import AvailabilityWindow, Space, SpaceRule, User

DATABASE_URL = "postgresql+psycopg2://dockos:dockos_dev@localhost:5432/dockos"


def main():
    engine = create_engine(DATABASE_URL)
    Session = sessionmaker(bind=engine)
    db = Session()

    host = User(id=uuid.uuid4(), email="host@dockos.dev", name="Host One", role="host", hashed_password=hash_password("password123"))
    guest = User(id=uuid.uuid4(), email="guest@dockos.dev", name="Guest One", role="guest", hashed_password=hash_password("password123"))
    db.add_all([host, guest])
    db.flush()

    space = Space(
        id=uuid.uuid4(),
        host_id=host.id,
        title="Quiet Focus Couch",
        description="Semi-private couch for deep work",
        space_type="couch",
        address="Downtown",
        price_per_minute_usd=0.5,
        minimum_minutes=10,
        maximum_minutes=120,
    )
    db.add(space)
    db.flush()

    db.add(SpaceRule(space_id=space.id, quiet_required=True, wifi=True))
    db.add(
        AvailabilityWindow(
            space_id=space.id,
            start_time=datetime.utcnow(),
            end_time=datetime.utcnow() + timedelta(hours=12),
            premium_private_access=True,
            host_away=True,
            auto_accept=False,
        )
    )

    db.commit()
    print("Seed data created.")


if __name__ == "__main__":
    main()
