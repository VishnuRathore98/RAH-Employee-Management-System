from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from app.crud.database import get_db
from app.schemas import schemas
from app.models import models
from app.utils import utils


router = APIRouter(prefix="/api/v1/user", tags=["Users"])


# Register new user
@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.UserRegisterResponse,
)
async def register_new_user(
    user: schemas.UserRegisterRequest, db: Session = Depends(get_db)
):
    user.password = utils.hash(user.password)
    user_data = models.UserRegistration(**user.model_dump())
    db.add(user_data)
    db.commit()
    db.refresh(user_data)

    return user_data
