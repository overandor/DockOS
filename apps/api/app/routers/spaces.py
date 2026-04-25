from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.deps import get_current_user
from app.models import AvailabilityWindow, Space, SpaceRule, User
from app.schemas.common import AvailabilityCreate, SpaceCreate, SpaceOut

router = APIRouter(tags=["spaces"])


@router.post("/spaces", response_model=SpaceOut)
def create_space(payload: SpaceCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    space = Space(host_id=user.id, **payload.model_dump())
    db.add(space)
    db.flush()
    db.add(SpaceRule(space_id=space.id))
    db.commit()
    db.refresh(space)
    return space


@router.get("/spaces")
def list_spaces(db: Session = Depends(get_db)):
    return db.execute(select(Space).where(Space.status == "active")).scalars().all()


@router.get("/spaces/{space_id}", response_model=SpaceOut)
def get_space(space_id: UUID, db: Session = Depends(get_db)):
    space = db.get(Space, space_id)
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    return space


@router.post("/spaces/{space_id}/availability")
def create_availability(space_id: UUID, payload: AvailabilityCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    space = db.get(Space, space_id)
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    if space.host_id != user.id:
        raise HTTPException(status_code=403, detail="Only host can manage availability")

    window = AvailabilityWindow(space_id=space_id, **payload.model_dump())
    db.add(window)
    db.commit()
    db.refresh(window)
    return window


@router.get("/explore")
def explore_spaces(db: Session = Depends(get_db)):
    return db.execute(select(Space).where(Space.status == "active")).scalars().all()
