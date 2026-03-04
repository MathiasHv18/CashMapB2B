from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status, Depends
from database.dbManagement import connectDB, verifyUserExistenceByEmail
from datetime import datetime, timedelta, timezone
from api.authEP import hashPasswordHTTP

ownerRouter = APIRouter()


class OwnerProfile(BaseModel):
    name: str
    lastname: str
    age: int
    sex: str
    email: str
    password: str


@ownerRouter.post("/createOwner")
def createOwner(recievedOwner: OwnerProfile):
    conn = None
    if verifyUserExistenceByEmail(recievedOwner.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="USER ALREADY EXISTS"
        )

    current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    recievedOwner.password = hashPasswordHTTP(recievedOwner.password)

    try:
        conn = connectDB()
        cursor = conn.cursor()
        query = """INSERT INTO OWNERS (name, lastname, age, sex, email, password, created_at)
        VALUES (%s, %s, %s, %s , %s ,%s, %s)
        """

        cursor.execute(query, (
            recievedOwner.name,
            recievedOwner.lastname,
            recievedOwner.age,
            recievedOwner.sex,
            recievedOwner.email,
            recievedOwner.password,
            current_datetime
        ))

        conn.commit()
        response_data = recievedOwner.model_dump()
        response_data.pop("password")
        return {"message": "Owner created!", "data": response_data}

    except Exception as e:
        if conn:
            conn.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )
    finally:
        if conn:
            conn.close()
