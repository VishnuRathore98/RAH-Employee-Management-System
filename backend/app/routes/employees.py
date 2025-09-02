# Code using ORM(Object Relational Model) sqlalchemy
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.schemas import schemas
from app.models import models
from app.crud import database
from app.utils import oauth

router = APIRouter(prefix="/api/v1/employee", tags=["Employees"])


# Get employee info from database
@router.get("/", response_model=List[schemas.ResponseUsers])
async def fetch_employees(
    db: Session = Depends(database.get_db),
    user_id: str = Depends(oauth.get_current_user),
):
    employees = db.query(models.Employee).all()
    return employees


# Get single employee info from database
@router.get(
    "/{user_id}",
    response_model=schemas.ResponseUsers,
)
async def fetch_employee(
    user_id: UUID,
    db: Session = Depends(database.get_db),
    id: str = Depends(oauth.get_current_user),
):

    employee = db.query(models.Employee).filter(models.Employee.id == user_id).first()

    if employee == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found!"
        )

    return employee


# Add a new employee
@router.post(
    "/", status_code=status.HTTP_201_CREATED, response_model=schemas.ResponseUsers
)
async def add_employee(
    user: schemas.User,
    db: Session = Depends(database.get_db),
):
    employee = models.Employee(**user.model_dump())
    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


# Update employee data with employee_id
@router.put(
    "/{employee_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.ResponseUsers,
)
async def update_employee(
    user_update: schemas.UserUpdateRequest,
    employee_id: UUID,
    db: Session = Depends(database.get_db),
    id: str = Depends(oauth.get_current_user),
):
    employee = db.query(models.Employee).filter(models.Employee.user_id == employee_id)

    if employee.first() == None:
        raise HTTPException(status_code=404, detail="User not found!")

    employee.update(user_update.model_dump())
    db.commit()

    return employee.first()


# Delete employee with employee_id
@router.delete(
    "/{employee_id}",
    status_code=status.HTTP_200_OK,
)
async def delete_employee(
    employee_id: UUID,
    db: Session = Depends(database.get_db),
    id: str = Depends(oauth.get_current_user),
):

    employee = db.query(models.Employee).filter(models.Employee.user_id == employee_id)

    if employee.first() == None:
        raise HTTPException(status_code=404, detail="Employee does not exists.")
    employee.delete(synchronize_session=False)
    db.commit()

    return {"message": f"Employee with id:{employee_id} deleted successfully"}
