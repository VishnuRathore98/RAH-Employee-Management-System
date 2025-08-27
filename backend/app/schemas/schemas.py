from datetime import datetime
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr

from app.models.models import Gender


class Users(BaseModel):
    user_id: UUID
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    gender: Gender
    roles: List[str]
    created_at: datetime

    class Config:
        orm_mode = True


class DeleteUser(BaseModel):
    user_id: UUID

    class Config:
        orm_mode = True


class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str


class UserRegisterResponse(BaseModel):
    user_id: UUID
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True
