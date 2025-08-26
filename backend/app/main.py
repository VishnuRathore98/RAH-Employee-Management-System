import sys
import time
from typing import List
from uuid import UUID, uuid4
from fastapi import FastAPI, HTTPException, status, Depends
import psycopg
import psycopg.rows
from sqlalchemy.orm import Session
from app.models.models import Gender, Role, User, UserUpdateRequest, Base, Employee
from app.database import engine, get_db
from app.schemas import schemas

# Required FastAPI setup

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Welcome to the RAH-EMS"}


# Code using ORM(Object Relational Model) sqlalchemy

# Base from models
Base.metadata.create_all(bind=engine)


# # Get user info from database
@app.get("/api/v1/users", response_model=List[schemas.Users])
async def fetch_users(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    return employees


# Get single user info from database
@app.get("/api/v1/users/{user_id}", response_model=schemas.Users)
async def fetch_users(user_id: UUID, db: Session = Depends(get_db)):

    employee = db.query(Employee).filter(Employee.user_id == user_id).first()

    if employee == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found!"
        )

    return employee


# Add a new user
@app.post(
    "/api/v1/users", status_code=status.HTTP_201_CREATED, response_model=schemas.Users
)
async def create_user(user: User, db: Session = Depends(get_db)):
    employee = Employee(**user.model_dump())
    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


# Update user data with user_id
@app.put(
    "/api/v1/users/{user_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.Users,
)
async def update_user(
    user_update: UserUpdateRequest, user_id: UUID, db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(Employee.user_id == user_id)

    if employee.first() == None:
        raise HTTPException(status_code=404, detail="User not found!")

    employee.update(user_update.model_dump())
    db.commit()

    return employee.first()


# Delete user with user_id
@app.delete(
    "/api/v1/users/{user_id}",
    status_code=status.HTTP_200_OK,
)
async def delete_user(user_id: UUID, db: Session = Depends(get_db)):

    employee = db.query(Employee).filter(Employee.user_id == user_id)

    if employee.first() == None:
        raise HTTPException(status_code=404, detail="User does not exists.")
    employee.delete(synchronize_session=False)
    db.commit()

    return {"message": f"User with id:{user_id} deleted successfully"}


# ------------------ Code using psycopg ---------------------------

# while True:
#     try:
#         connection = psycopg.connect(
#             dbname="mydb",
#             user="vpsr",
#             password="12345678",
#             host="localhost",
#             port=5432,
#         )
#         cursor = connection.cursor(row_factory=psycopg.rows.dict_row)
#         print("Database connected successfully!")
#         break
#     except KeyboardInterrupt:
#         print("Interrupted by user, exiting...")
#         sys.exit(0)
#     except psycopg.OperationalError as error:
#         print("Error connecting database: ", error)
#         time.sleep(5)

# # For debugging
# # cursor.execute("SELECT * FROM users;")
# # # print(col.name for col in cursor.description)
# # colnames = [col.name for col in cursor.description]
# # print(colnames)
# # print(cursor.fetchall())

# db: List[User] = [
#     User(
#         id=uuid4(),
#         first_name="John",
#         last_name="Doe",
#         gender=Gender.male,
#         roles=[Role.employee],
#     ),
#     User(
#         id=uuid4(),
#         first_name="Hina",
#         last_name="Doe",
#         gender=Gender.female,
#         roles=[Role.manager],
#     ),
# ]


# @app.get("/orm")
# async def create_table(db: Session = Depends(get_db)):
#     employees = db.query(Employee).all()

#     return employees


# # Get user info from database
# @app.get("/api/v1/users")
# async def fetch_users():
#     cursor.execute(""" SELECT * FROM users; """)
#     users = cursor.fetchall()
#     return users


# # Get single user info from database
# @app.get("/api/v1/users/{user_id}")
# async def fetch_users(user_id: UUID):
#     print(user_id)
#     cursor.execute(""" SELECT * FROM users WHERE user_id = (%s); """, (user_id,))
#     user = cursor.fetchone()
#     return user


# # Add a new user
# @app.post("/api/v1/users", status_code=status.HTTP_201_CREATED)
# async def create_user(user: User):
#     db.append(user)
#     cursor.execute(
#         """INSERT INTO users (user_id, first_name, middle_name, last_name, gender, roles)
#             VALUES (%s, %s, %s, %s, %s, %s) RETURNING *;""",
#         (
#             user.id,
#             user.first_name,
#             user.middle_name,
#             user.last_name,
#             user.gender,
#             user.roles,
#         ),
#     )
#     new_user = cursor.fetchone()
#     connection.commit()
#     return {"id": new_user["user_id"]}


# # Update user data with user_id
# @app.put("/api/v1/users/{user_id}", status_code=status.HTTP_202_ACCEPTED)
# async def update_user(user_update: UserUpdateRequest, user_id: UUID):

#     cursor.execute(
#         """UPDATE users SET first_name=(%s), middle_name=(%s), last_name=(%s), roles=(%s)
#                    WHERE user_id = (%s) RETURNING *;""",
#         (
#             user_update.first_name,
#             user_update.middle_name,
#             user_update.last_name,
#             user_update.roles,
#             user_id,
#         ),
#     )
#     updated_user = cursor.fetchone()
#     connection.commit()

#     if updated_user == None:
#         raise HTTPException(status_code=404, detail="User not found!")

#     return updated_user


# # Delete user with user_id
# @app.delete("/api/v1/users/{user_id}", status_code=status.HTTP_200_OK)
# async def delete_user(user_id: UUID):

#     cursor.execute(
#         """ DELETE FROM users WHERE user_id=(%s) RETURNING *; """, (user_id,)
#     )
#     deleted_user = cursor.fetchone()
#     connection.commit()

#     if deleted_user == None:
#         raise HTTPException(status_code=404, detail="User does not exists.")

#     return {"message": f"User with id:{deleted_user["user_id"]} deleted successfully"}
