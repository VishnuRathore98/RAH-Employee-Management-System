from jose import jwt
import pytest
from app.config.config import settings
from app.schemas import schemas

# Testing for server availability
def test_root(client):
    res = client.get("/")
    assert res.status_code == 200

# ------ Schemas for referece --------
#
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
#class User(BaseModel):
#     user_id: Optional[UUID] = Field(default_factory=uuid4)
#     first_name: str
#     middle_name: Optional[str] = None
#     last_name: str
#     gender: Gender
#     roles: List[Role]
#
# -------- Schemas for referece --------

# Testing for create employee
def test_create_employee(client):
    res = client.post("/api/v1/employee/",
                      json={"first_name":"Ken","last_name":"William","gender":"male","roles":["employee"]})
    new_user = schemas.ResponseUsers(**res.json())
    assert new_user.first_name == "Ken"
    assert res.status_code == 201

# Testing for employee login
def test_login_employee(client,test_user):
    res = client.post("/api/v1/login",json={'email':test_user['email'],'password':test_user['password']})
    login_res = schemas.Token(**res.json())
    decoded_token = jwt.decode(login_res.access_token, settings.secret_key, algorithms=[settings.algorithm])
    assert decoded_token['employee_id'] == test_user['employee_id']
    assert login_res.token_type == 'Bearer'
    assert res.status_code == 200

# Testing for incorrect employee login
@pytest.mark.parametrize("email, password, status_code", [
    ('john@mail.com','wrongpassword',403),
    ('wrongmail@mail.com','12345678',403),
    ('wrong@mail.com','wrongpassword',403),
    (None,'12345678',422),
    ('john@mail.com',None,422),
    (None,None,422),
])
def test_incorrect_login(test_user, client, email, password, status_code):
    res = client.post("/api/v1/login",json={
        'email': email,
        'password': password
    })
    assert res.status_code == status_code 
