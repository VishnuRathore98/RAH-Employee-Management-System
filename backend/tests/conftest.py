# This file is global access for all the tests and everything inside it will be automatically made
# avaiable for every test files and the fixtures will both accessible and executed before running
# the tests.
from app.main import app
from fastapi.testclient import TestClient
import pytest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from app.config.config import Settings
from app.models.models import Base
from app.crud.database import get_db
from app.utils.oauth import create_access_token

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


@pytest.fixture
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield TestClient(app)

#Base = declarative_base()


@pytest.fixture
def test_user(client):
    user_data = {
        "email":"john@mail.com",
        "password":"12345678"
    }
    res = client.post("/api/v1/user/", json=user_data)
    new_user = res.json()
    assert res.status_code == 201
    assert new_user['email'] == 'john@mail.com'
    new_user['password'] = '12345678'
    # print(new_user)
    return new_user


@pytest.fixture
def token(test_user):
    return create_access_token({'employee_id':test_user['employee_id']})


@pytest.fixture
def authorized_client(client, token):
    client.headers = {
        **client.headers,
        'Authorization':f'Bearer {token}'
    }
    return client
