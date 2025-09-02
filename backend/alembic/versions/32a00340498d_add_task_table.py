"""add task table

Revision ID: 32a00340498d
Revises: 579028599c84
Create Date: 2025-09-03 00:57:33.589895

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "32a00340498d"
down_revision: Union[str, Sequence[str], None] = "579028599c84"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "tasks",
        sa.Column(
            "task_id",
            sa.Uuid,
            primary_key=True,
            nullable=False,
            server_default=sa.text("uuid_generate_v4()"),
        ),
        sa.Column("task_title", sa.String, nullable=False),
        sa.Column("task_description", sa.String, nullable=True),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DROP TABLE tasks CASCADE")
