from app.schemas import schemas
from tests.dummy_database import client

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

