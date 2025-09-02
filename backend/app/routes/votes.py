from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.schemas import schemas
from app.crud import database
from app.models import models
from app.utils import oauth

router = APIRouter(prefix="/api/v1/vote", tags=["Vote"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_vote(
    vote: schemas.Vote,
    db: Session = Depends(database.get_db),
    auth: str = Depends(oauth.get_current_user),
):

    task = db.query(models.Task).filter(models.Task.task_id == vote.task_id).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found!"
        )

    vote_query = db.query(models.Vote).filter(models.Vote.task_id == vote.task_id)

    if vote.dir == True:
        if not vote_query.first():
            add_vote = models.Vote(task_id=vote.task_id, employee_id=auth.employee_id)
            db.add(add_vote)
            db.commit()

            return {"message": "vote added successfully!"}

        else:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="Already voted!"
            )

    else:
        if not vote_query.first():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Not voted yet!"
            )
        vote_query.delete(synchronize_session=False)
        db.commit()

        return {"message": "vote removed successfully!"}
