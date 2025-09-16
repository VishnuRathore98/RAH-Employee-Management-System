def test_get_all_posts(authorized_client):
    res = authorized_client.get("/api/v1/employee/tasks/")
    print(res.json())
    assert res.status_code == 200
