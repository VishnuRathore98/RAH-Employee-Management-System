from typing import Optional, List
from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from enum import Enum


class Role(str, Enum):
    admin = "admin"
    manager = "manager"
    employee = "employee"


class Gender(str, Enum):
    male = "male"
    female = "female"


class User(BaseModel):
    id: Optional[UUID] = Field(default_factory=uuid4)
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    gender: Gender
    roles: List[Role]


class UserUpdateRequest(BaseModel):
    first_name: Optional[str] = None
    middle_name: Optional[str] = None
    last_name: Optional[str] = None
    roles: Optional[List[Role]] = []
