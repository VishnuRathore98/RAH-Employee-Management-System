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


def downgrade() -> None:
    """Downgrade schema."""
