from typing import Optional, List
from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from enum import Enum
from ..database import Base
from sqlalchemy import ARRAY, TIMESTAMP, Column, String, Uuid, text


class Role(str, Enum):
    admin = "admin"
    manager = "manager"
    employee = "employee"


class Gender(str, Enum):
    male = "male"
    female = "female"


class User(BaseModel):
    # user_id: Optional[UUID] = Field(default_factory=uuid4)
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    gender: Gender
    roles: List[Role]


class Employee(Base):
    __tablename__ = "employee"
    user_id = Column(
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


class UserUpdateRequest(BaseModel):
    first_name: Optional[str] = None
    middle_name: Optional[str] = None
    last_name: Optional[str] = None
    roles: Optional[List[Role]] = []
