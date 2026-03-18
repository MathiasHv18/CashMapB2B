from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status, Depends
from database.dbManagement import connectDB, getUserByEmail, verifyUserExistenceByEmail
from datetime import datetime, timedelta, timezone
from api.authEP import ACCESS_TOKEN_EXPIRE_MINUTES, generateTokenJWT, hashPasswordHTTP

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
            detail="Error! Este correo ya está en uso"
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

        user = getUserByEmail(recievedOwner.email)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to retrieve created user"
            )

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        accessTokenJWT = generateTokenJWT(
            data={"sub": user[1]}, expires_delta=access_token_expires)

        return {"message": "Owner created!", "data": response_data, "access_token": accessTokenJWT}

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
