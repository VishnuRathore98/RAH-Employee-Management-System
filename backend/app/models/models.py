from app.crud.database import Base
from sqlalchemy import ARRAY, TIMESTAMP, Column, ForeignKey, String, Uuid, text

from app.routes import employees


class Employee(Base):
    __tablename__ = "employee_detail"
    id = Column(
        Uuid,
        primary_key=True,
        nullable=False,
        server_default=text("uuid_generate_v4()"),
    )
    first_name = Column(String, nullable=False)
    middle_name = Column(String, nullable=True)
    last_name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    roles = Column(ARRAY(String), nullable=False, default=[])
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )


class UserRegistration(Base):
    __tablename__ = "employee_register"
    employee_id = Column(
        Uuid,
        primary_key=True,
        nullable=False,
        server_default=text("uuid_generate_v4()"),
    )
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )


class Task(Base):
    __tablename__ = "employee_tasks"
    task_id = Column(
        Uuid,
        primary_key=True,
        nullable=False,
        server_default=text("uuid_generate_v4()"),
    )
    employee_id = Column(
        Uuid,
        ForeignKey("employee_detail.id", ondelete="CASCADE"),
        nullable=False,
    )
    task_title = Column(String, nullable=False)
    task_description = Column(String, nullable=True)
    # task_status: str
    # task_start_date: str
    # task_end_date: str
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
