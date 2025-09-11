from app.main import app
from fastapi.testclient import TestClient
from app.schemas import schemas
import pytest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from app.config.config import Settings
from app.models.models import Base
from app.crud.database import get_db

settings = Settings()

POSTGRES_DATABASE_URL = f"postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}_test"

engine = create_engine(POSTGRES_DATABASE_URL)

TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield TestClient(app)

#Base = declarative_base()


def test_root(client):
    res = client.get("/")
    print(res.json())
    assert res.status_code == 200

#class User(BaseModel):
    #     # user_id: Optional[UUID] = Field(default_factory=uuid4)
    # first_name: str
    # middle_name: Optional[str] = None
    # last_name: str
    # gender: Gender
    # roles: List[Role]


def test_create_employee(client):
    res = client.post("/api/v1/employee/",
                      json={"first_name":"Ken","last_name":"William","gender":"male","roles":["employee"]})
    new_user = schemas.ResponseUsers(**res.json())
    print(res.json())
    assert new_user.first_name == "Ken"
    assert res.status_code == 201

