from jose import jwt
import pytest
from app.config.config import settings
from app.schemas import schemas
from tests.dummy_database import client

# class UserRegisterRequest(BaseModel):
#     email: EmailStr
#     password: str
#
#
# class UserRegisterResponse(BaseModel):
#     employee_id: UUID
#     email: EmailStr
#     created_at: datetime
#
#     class Config:
#         from_attributes = True
#

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

def test_root(client):
    res = client.get("/")
    # print(res.json())
    assert res.status_code == 200

#class User(BaseModel):
    #     # user_id: Optional[UUID] = Field(default_factory=uuid4)
    # first_name: str
    # middle_name: Optional[str] = None
    # last_name: str
    # gender: Gender
    # roles: List[Role]
def test_login_employee(client,test_user):
    res = client.post("/api/v1/login",json={'email':test_user['email'],'password':test_user['password']})
    # print(res.json())
    login_res = schemas.Token(**res.json())
    decoded_token = jwt.decode(login_res.access_token, settings.secret_key, algorithms=[settings.algorithm])
    # print("decoded_token[employee_id]:", decoded_token['employee_id'])
    # print("test_user[id]:", test_user['employee_id'])
    assert decoded_token['employee_id'] == test_user['employee_id']
    assert login_res.token_type == 'Bearer'
    assert res.status_code == 200



def test_create_employee(client):
    res = client.post("/api/v1/employee/",
                      json={"first_name":"Ken","last_name":"William","gender":"male","roles":["employee"]})
    new_user = schemas.ResponseUsers(**res.json())
    # print(res.json())
    assert new_user.first_name == "Ken"
    assert res.status_code == 201


