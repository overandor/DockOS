# DockOS Infrastructure (MVP 0.1)

DockOS is the infrastructure layer for physical-presence products. Couchify is the first client app that will consume DockOS APIs.

## Stack
- FastAPI
- PostgreSQL 16
- Redis 7
- SQLAlchemy
- Alembic
- JWT auth
- Docker Compose
- pytest

## Repository Layout

```text
dockos/
├── apps/
│   ├── api/
│   ├── worker/
│   └── admin/
├── packages/
│   ├── database/
│   ├── auth/
│   ├── booking-engine/
│   ├── payments/
│   ├── realtime/
│   ├── safety/
│   └── shared/
├── clients/
│   └── couchify/
├── infra/
│   ├── docker/
│   ├── nginx/
│   └── terraform/
├── docs/
├── docker-compose.yml
├── .env.example
└── Makefile
```

## MVP 0.1 Scope Implemented
- Auth: register/login/me
- Create space
- Create availability window
- Explore spaces
- Request booking
- Overlap prevention for confirmed bookings
- Accept/reject booking request
- Check-in/check-out lifecycle
- Platform fee and host payout settlement
- Payment ledger stub and dispute/admin/message/review stubs

## Quick Start

```bash
cp .env.example .env
docker-compose up --build
```

API docs: `http://localhost:8000/docs`

## Key Endpoints
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /spaces`
- `GET /spaces`
- `GET /spaces/{space_id}`
- `POST /spaces/{space_id}/availability`
- `GET /explore`
- `POST /booking-requests`
- `POST /booking-requests/{id}/accept`
- `POST /booking-requests/{id}/reject`
- `POST /bookings/{id}/check-in`
- `POST /bookings/{id}/check-out`
- `GET /payments/ledger`

## Local tests

```bash
pytest -q
```

## Seed Data

Once DB is running locally:

```bash
PYTHONPATH=apps/api python packages/database/seed.py
```
