from datetime import datetime
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr
from enum import Enum

from app.routes import employees


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


class ResponseUsers(BaseModel):
    user_id: UUID
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    gender: Gender
    roles: List[str]
    created_at: datetime

    class Config:
        orm_mode = True


class UserUpdateRequest(BaseModel):
    first_name: Optional[str] = None
    middle_name: Optional[str] = None
    last_name: Optional[str] = None
    roles: Optional[List[Role]] = []


class DeleteUser(BaseModel):
    user_id: UUID

    class Config:
        orm_mode = True


class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str


class UserRegisterResponse(BaseModel):
    employee_id: UUID
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        orm_mode = True


class TokenData(BaseModel):
    employee_id: str


# Task related schemas
class Task(BaseModel):
    # task_id: UUID
    # employee_id: UUID
    task_title: str
    task_description: Optional[str] = None
    # task_status: str
    # task_start_date: str
    # task_end_date: str
    # created_at: datetime


class ResponseTask(BaseModel):
    task_id: UUID
    employee_id: UUID
    task_title: str
    task_description: Optional[str]
    created_at: datetime
    owner: UserRegisterResponse

    class Config:
        orm_mode = True


class CreateTask(BaseModel):
    task_id: UUID
    employee_id: UUID
    task_title: str
    task_description: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True


class TaskUpdateRequest(BaseModel):
    task_title: Optional[str] = None
    task_description: Optional[str] = None
