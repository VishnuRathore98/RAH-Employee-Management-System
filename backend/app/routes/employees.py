# Code using ORM(Object Relational Model) sqlalchemy
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.schemas import schemas
from app.models import models
from app.crud import database


router = APIRouter(prefix="/api/v1/employee", tags=["Employees"])


# Get user info from database
@router.get("/", response_model=List[schemas.Users])
async def fetch_employees(db: Session = Depends(database.get_db)):
    employees = db.query(models.Employee).all()
    return employees


# Get single user info from database
@router.get("/{user_id}", response_model=schemas.Users)
async def fetch_employee(user_id: UUID, db: Session = Depends(database.get_db)):

    employee = (
        db.query(models.Employee).filter(models.Employee.user_id == user_id).first()
    )

    if employee == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found!"
        )

    return employee


# Add a new user
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Users)
async def add_employee(user: models.User, db: Session = Depends(database.get_db)):
    employee = models.Employee(**user.model_dump())
    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


# Update user data with user_id
@router.put(
    "/{user_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.Users,
)
async def update_employee(
    user_update: models.UserUpdateRequest,
    user_id: UUID,
    db: Session = Depends(database.get_db),
):
    employee = db.query(models.Employee).filter(models.Employee.user_id == user_id)

    if employee.first() == None:
        raise HTTPException(status_code=404, detail="User not found!")

    employee.update(user_update.model_dump())
    db.commit()

    return employee.first()


# Delete user with user_id
@router.delete(
    "/{user_id}",
    status_code=status.HTTP_200_OK,
)
async def delete_employee(user_id: UUID, db: Session = Depends(database.get_db)):

    employee = db.query(models.Employee).filter(models.Employee.user_id == user_id)

    if employee.first() == None:
        raise HTTPException(status_code=404, detail="User does not exists.")
    employee.delete(synchronize_session=False)
    db.commit()

    return {"message": f"User with id:{user_id} deleted successfully"}
