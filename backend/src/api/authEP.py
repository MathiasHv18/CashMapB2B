from pydantic import BaseModel
from database.dbManagement import getUserByEmail
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone
import jwt
import os
from core.config import settings
from typing import Annotated

authRouter = APIRouter()

# JWT PARAMS
password_hash = PasswordHash.recommended()
SECRET_KEY = settings.JWT_SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


class LoginData(BaseModel):
    email: str
    password: str


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar el token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")

        if email is None:
            raise credentials_exception

    except InvalidTokenError:
        raise credentials_exception

    user = getUserByEmail(email)
    if user is None:
        raise credentials_exception
    return user


def verifyPassword(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def hashPasswordHTTP(plain_password):
    try:
        hashed_password = password_hash.hash(plain_password)
        return hashed_password
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=str(e))


def generateTokenJWT(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta is None:
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.now(timezone.utc) + expires_delta

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@authRouter.post("/login")
def loginForAccessToken(recievedLoginData: LoginData):
    user = getUserByEmail(recievedLoginData.email)

    if not user or not verifyPassword(recievedLoginData.password, user[2]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    accessTokenJWT = generateTokenJWT(
        data={"sub": user[1]}, expires_delta=access_token_expires
    )

    return {"access_token": accessTokenJWT, "token_type": "bearer"}
