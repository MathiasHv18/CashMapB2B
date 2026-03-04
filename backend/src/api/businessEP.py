from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status, Depends
import os
from typing import Annotated
from api.authEP import get_current_user
from database.dbManagement import connectDB
from datetime import datetime

businessRouter = APIRouter()


class BusinessIn(BaseModel):
    idCategoryBusiness: int
    name: str
    description: str
    email: str
    foundationYear: int


class BalanceUpdate(BaseModel):
    digitalBalance: float
    cashBalance: float = 0.0


@businessRouter.patch("/{idBusiness}/set-initial-balance")
def setInitialBalance(idBusiness: int, initialBalances: BalanceUpdate,  current_user: Annotated[tuple, Depends(get_current_user)]):
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()

        total = initialBalances.digitalBalance + initialBalances.cashBalance

        query = """
        UPDATE BUSINESSES 
        SET digitalBalance = %s, cashBalance = %s, totalBalance = %s 
        WHERE idBusiness = %s AND idOwner = %s
        """
        cursor.execute(query, (
            initialBalances.digitalBalance,
            initialBalances.cashBalance,
            total,
            idBusiness,
            current_user[0] 
        ))

        if cursor.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Negocio no encontrado o no autorizado")

        conn.commit()
        return {"message": "Balances actualizados correctamente", "total": total}
    except Exception as e:
        print(e)
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()

@businessRouter.post("/create")
def createBusiness(businessRecieved: BusinessIn, current_user: Annotated[tuple, Depends(get_current_user)]):
    owner_id = current_user[0]
    conn = None
    query = """INSERT INTO BUSINESSES (idOwner, idCategoryBusiness, name, description, email, foundationYear)
    VALUES (%s, %s, %s, %s, %s, %s)"""

    try:
        conn = connectDB()
        cursor = conn.cursor()
        cursor.execute(query, (
            owner_id,
            businessRecieved.idCategoryBusiness,
            businessRecieved.name,
            businessRecieved.description,
            businessRecieved.email,
            businessRecieved.foundationYear,
        ))
        conn.commit()
        return {"message": "Negocio inicializado", "data": businessRecieved}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        if conn:
            conn.close()
