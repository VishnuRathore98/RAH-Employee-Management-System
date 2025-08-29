from typing import List
from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session
from app.utils import utils, oauth
from app.schemas import schemas
from app.crud import database
from app.models import models

router = APIRouter(prefix="/api/v1/employee/tasks", tags=["Tasks"])


# Get all tasks
@router.get(
    "/", response_model=List[schemas.ResponseTask], status_code=status.HTTP_200_OK
)
async def get_all_tasks(
    db: Session = Depends(database.get_db),
    employee_id: str = Depends(oauth.get_current_user),
):
    tasks = db.query(models.Task).all()
    if not tasks:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No tasks found!"
        )
    return tasks


# Get specific employee's tasks


# Create new task
@router.post(
    "/create_task/{employee_id}",
    response_model=schemas.ResponseTask,
    status_code=status.HTTP_201_CREATED,
)
async def create_task(
    task: schemas.Task,
    db: Session = Depends(database.get_db),
    current_employee: str = Depends(oauth.get_current_user),
):
    created_task = models.Task(current_employee.user_id, **task.model_dump())
    db.add(created_task)
    db.commit()
    db.refresh(created_task)

    return created_task


# Update existing task

# Delete existing task
