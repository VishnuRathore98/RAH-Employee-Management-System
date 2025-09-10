from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_root():
    res = client.get("/")
    print(res.json())
    assert res.status_code == 200
