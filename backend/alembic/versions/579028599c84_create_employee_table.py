"""create employee table

Revision ID: 579028599c84
Revises:
Create Date: 2025-09-03 00:21:56.334505

"""

import array
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "579028599c84"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "employees",
        sa.Column(
            "employee_id",
            sa.Uuid,
            nullable=False,
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()"),
        ),
        sa.Column("first_name", sa.String, nullable=False),
        sa.Column("middle_name", sa.String, nullable=True),
        sa.Column("last_name", sa.String, nullable=False),
        sa.Column("gender", sa.String, nullable=False),
        sa.Column("roles", sa.ARRAY((sa.String)), nullable=False, default=[]),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("employees")
