from typing import List
from uuid import UUID
from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy import delete
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
@router.get(
    "/{employee_id}",
    response_model=schemas.ResponseTask,
)
async def fetch_employee(
    employee_id: UUID,
    db: Session = Depends(database.get_db),
    current_employee: str = Depends(oauth.get_current_user),
):

    task = db.query(models.Task).filter(models.Task.employee_id == employee_id).first()

    if task == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No task found!"
        )

    return task


# Create new task
@router.post(
    "/create_task/{employee_id}",
    response_model=schemas.ResponseTask,
    status_code=status.HTTP_201_CREATED,
)
async def create_task(
    employee_id: UUID,
    task: schemas.Task,
    db: Session = Depends(database.get_db),
    current_employee: str = Depends(oauth.get_current_user),
):

    created_task = models.Task(employee_id=employee_id, **task.model_dump())
    db.add(created_task)
    db.commit()
    db.refresh(created_task)

    return created_task


# Update existing task
@router.put(
    "/{task_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.ResponseTask,
)
async def update_task(
    task_id: UUID,
    task_update: schemas.TaskUpdateRequest,
    db: Session = Depends(database.get_db),
    current_employee: str = Depends(oauth.get_current_user),
):
    task = db.query(models.Task).filter(models.Task.task_id == task_id)

    if task.first() == None:
        raise HTTPException(status_code=404, detail="Task not found!")

    if task.first().employee_id != UUID(current_employee.employee_id):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorized to perform this task.",
        )

    task.update(task_update.model_dump())
    db.commit()

    return task.first()


# Delete existing task
@router.delete("/delete/{task_id}", status_code=status.HTTP_200_OK)
async def delete_task(
    task_id: UUID,
    db: Session = Depends(database.get_db),
    current_user: str = Depends(oauth.get_current_user),
):

    task = db.query(models.Task).filter(task_id == models.Task.task_id)

    # print("task_id =====>", task_id)
    # print("model.Task.task_id ==>", type(models.Task.task_id))
    # print("task ========>", task.first().__dict__)

    if task.first() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found!"
        )

    # print(current_user)

    print(type(task.first().employee_id), "\t", type(current_user.employee_id))

    if str(task.first().employee_id) != current_user.employee_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorised to perform this operation!",
        )
    # print("success")
    task.delete(synchronize_session=False)
    db.commit()

    return task
