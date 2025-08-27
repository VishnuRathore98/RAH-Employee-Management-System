from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.crud import database
from app.schemas import schemas
from app.models import models
from app.utils import utils
from app.utils import oauth

router = APIRouter(prefix="/api/v1", tags=["Authentication"])


@router.post("/login")
async def userLogin(
    user_credentials: schemas.UserRegisterRequest,
    db: Session = Depends(database.get_db),
):
    user = (
        db.query(models.UserRegistration)
        .filter(user_credentials.email == models.UserRegistration.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid user credentials!"
        )

    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid user credentials!"
        )

    access_token = oauth.create_access_token(data={"user_id": str(user.user_id)})
    # Create and return JWT token
    return {"access_token": "Bearer " + access_token}
