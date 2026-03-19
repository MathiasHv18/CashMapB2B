from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status, Depends
from typing import Annotated
from database.dbManagement import connectDB, releaseDB, getUserByEmail, verifyUserExistenceByEmail
from datetime import datetime, timedelta, timezone
from api.authEP import ACCESS_TOKEN_EXPIRE_MINUTES, generateTokenJWT, hashPasswordHTTP
from api.authEP import get_current_user

ownerRouter = APIRouter()


class OwnerCreate(BaseModel):
    name: str
    lastname: str
    age: int
    sex: str
    email: str
    password: str


class OwnerOut(BaseModel):
    name: str
    lastname: str
    age: int
    sex: str
    email: str


@ownerRouter.get("/getBusinesses")
def getBusinesses(current_user: Annotated[tuple, Depends(get_current_user)]):
    owner_id = current_user[0]
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()

        query = "SELECT * from businesses WHERE idowner = %s"
        cursor.execute(query, (owner_id,))

        businesses = cursor.fetchall()

        businesses_out = []

        for business in businesses:
            business_out = {
                "idBusiness": business[0],
                "idOwner": business[1],
                "idCategoryBusiness": business[2],
                "name": business[3],
                "description": business[4],
                "email": business[5],
                "foundationYear": business[6],
                "created_at": str(business[7]),
                "cashBalance": float(business[8]),
                "digitalBalance": float(business[9]),
                "totalBalance": float(business[10])
            }
            businesses_out.append(business_out)

        return {"message": "Extraidos negocios", "data": businesses_out}

    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            releaseDB(conn)


@ownerRouter.post("/createOwner", status_code=status.HTTP_201_CREATED)
def createOwner(recievedOwner: OwnerCreate):
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

        # Validamos los datos de salida usando el modelo OwnerOut (filtrando automáticamente el password)
        owner_out_data = OwnerOut(**recievedOwner.model_dump())

        user = getUserByEmail(recievedOwner.email)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to retrieve created user"
            )

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        accessTokenJWT = generateTokenJWT(
            data={"sub": user[1]}, expires_delta=access_token_expires)

        return {
            "message": "Owner created!",
            "data": owner_out_data,
            "access_token": accessTokenJWT
        }

    except Exception as e:
        if conn:
            conn.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )
    finally:
        if conn:
            releaseDB(conn)
