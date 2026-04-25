from fastapi import FastAPI

from app.db import Base, engine
from app.routers import auth, bookings, spaces

Base.metadata.create_all(bind=engine)

app = FastAPI(title="DockOS API", version="0.1.0")

app.include_router(auth.router)
app.include_router(spaces.router)
app.include_router(bookings.router)


@app.get("/")
def root():
    return {"service": "dockos-api", "status": "ok"}
