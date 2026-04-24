# DockOS

**Operating system for physical presence.**

DockOS is a real-time infrastructure layer that converts physical space into programmable, schedulable units. It enables minute-level allocation, permission control, and monetization of environments — forming the foundation for next-generation spatial marketplaces.

---

## 🧠 Overview

DockOS reframes physical space as a dynamic system.

Instead of static locations, DockOS models space as:
- allocatable
- time-bound
- permission-controlled
- monetizable

This allows real-world environments to behave like infrastructure — scheduled, executed, and released in real time.

---

## 💡 Core Thesis

> Space + time = programmable resource

DockOS introduces a model where:
- space becomes a unit
- availability becomes a timeline
- presence becomes a session
- usage becomes measurable and priced

---

## ⚙️ Core Capabilities

- **Minute-level scheduling engine**
- **Conflict-free allocation logic**
- **Host-defined rule systems**
- **Private access / “host-away” mode**
- **Live session runtime (check-in / checkout / extension)**
- **Payment + payout ledger**
- **Messaging and dispute handling**
- **Role-based access control**

---

## 🧩 System Primitives

| Entity | Description |
|------|-------------|
| SpaceUnit | A physical space (couch, desk, room) |
| AvailabilityWindow | Time ranges for usage |
| BookingRequest | Intent to reserve |
| MicroBooking | Confirmed allocation |
| CheckInSession | Active runtime session |
| PaymentLedger | Financial record |
| RuleSet | Behavioral constraints |

---

## 🧱 Architecture

**Backend**
- FastAPI / Node API
- PostgreSQL
- Redis
- WebSockets

**Flow**
1. Define space + rules  
2. Define availability  
3. Guest requests time  
4. System validates + allocates  
5. Session runs live  
6. Usage is finalized + paid  

---

## 🐳 Local Setup

```bash
docker-compose up --build
