"""add foreign-key to tasks table

Revision ID: 485ad5d35bdf
Revises: 32a00340498d
Create Date: 2025-09-03 01:21:56.148384

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "485ad5d35bdf"
down_revision: Union[str, Sequence[str], None] = "32a00340498d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column("tasks", sa.Column("owner_id", sa.Uuid(), nullable=False))
    op.create_foreign_key(
        "tasks_employees_fk",
        source_table="tasks",
        referent_table="employees",
        local_cols=["owner_id"],
        remote_cols=["employee_id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(constraint_name="tasks_employees_fk", table_name="tasks")
    op.drop_column(table_name="tasks", column_name="owner_id")
