from app.crud.database import Base
from sqlalchemy import ARRAY, TIMESTAMP, Column, ForeignKey, String, Uuid, text
from sqlalchemy.orm import relationship
from app.routes import employees
import uuid
from sqlalchemy.dialects.postgresql import UUID

id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)


class Employee(Base):
    __tablename__ = "employee_detail"
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        default=uuid.uuid4,
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
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        default=uuid.uuid4,
    )
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )


class Task(Base):
    __tablename__ = "employee_tasks"
    task_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        default=uuid.uuid4,
    )
    task_title = Column(String, nullable=False)
    task_description = Column(String, nullable=True)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    employee_id = Column(
        Uuid,
        ForeignKey("employee_register.employee_id", ondelete="CASCADE"),
        nullable=False,
    )
    owner = relationship("UserRegistration")


class Vote(Base):
    __tablename__ = "votes"
    employee_id = Column(
        UUID(as_uuid=True),
        ForeignKey("employee_register.employee_id", ondelete="CASCADE"),
        nullable=False,
        primary_key=True,
    )
    task_id = Column(
        UUID(as_uuid=True),
        ForeignKey("employee_tasks.task_id", ondelete="CASCADE"),
        nullable=False,
        primary_key=True,
    )
