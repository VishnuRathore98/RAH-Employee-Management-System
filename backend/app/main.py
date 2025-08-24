from typing import List
from uuid import UUID, uuid4
from fastapi import FastAPI, HTTPException, status
from h11 import Response

from .models.models import Gender, Role, User, UserUpdateRequest

app = FastAPI()

db: List[User] = [
    User(
        id=uuid4(),
        first_name="John",
        last_name="Doe",
        gender=Gender.male,
        roles=[Role.employee],
    ),
    User(
        id=uuid4(),
        first_name="Hina",
        last_name="Doe",
        gender=Gender.female,
        roles=[Role.manager],
    ),
]


@app.get("/")
def read_root():
    return {"message": "Welcome to the RAH-EMS"}


@app.get("/api/v1/users")
async def fetch_users():
    return db


@app.post("/api/v1/users", status_code=status.HTTP_201_CREATED)
async def create_user(user: User):
    db.append(user)
    return {"id": user.id}


@app.put("/api/v1/users/{user_id}", status_code=status.HTTP_202_ACCEPTED)
async def update_user(user_update: UserUpdateRequest, user_id: UUID):
    for user in db:
        if user_id == user.id:
            if user_update.first_name is not None:
                user.first_name = user_update.first_name
            if user_update.middle_name is not None:
                user.middle_name = user_update.middle_name
            if user_update.last_name is not None:
                user.last_name = user_update.last_name
            if user_update.roles is not None:
                user.roles = user_update.roles
            return user
    raise HTTPException(status_code=404, detail="User not found!")


@app.delete("/api/v1/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: UUID):
    for user in db:
        if user.id == user_id:
            db.remove(user)
            return
    raise HTTPException(
        status_code=404, detail=f"User with id: {user_id} does not exists."
    )
