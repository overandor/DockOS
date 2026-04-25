"""initial schema

Revision ID: 0001_initial
Revises:
Create Date: 2026-04-25
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("email", sa.String(), nullable=False, unique=True),
        sa.Column("phone", sa.String(), nullable=True),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("role", sa.String(), nullable=False, server_default="guest"),
        sa.Column("verification_status", sa.String(), server_default="unverified"),
        sa.Column("rating", sa.Float(), server_default="0"),
        sa.Column("hashed_password", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True)),
    )


def downgrade() -> None:
    op.drop_table("users")
