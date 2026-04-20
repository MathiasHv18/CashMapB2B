from datetime import date

from fastapi import APIRouter, HTTPException, Depends, status
from typing import Annotated

from pydantic import BaseModel
from database.dbManagement import connectDB, releaseDB
from api.authEP import get_current_user

dashboardRouter = APIRouter()


class RequestExpenses(BaseModel):
    idBusiness: int
    startDate: str
    endDate: str


class RequestIncome(BaseModel):
    idBusiness: int
    startDate: str
    endDate: str


class RequestTotalRange(BaseModel):
    idBusiness: int
    startDate: date
    endDate: date



@dashboardRouter.get("/get_payment_summary/{idBusiness}")
def getSummaryByPaymentMethod(idBusiness: int, current_user: Annotated[tuple, Depends(get_current_user)]):
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()
        owner_id = current_user[0]

        # Obtener resumen de ingresos por método de pago
        cursor.execute("""
            SELECT pm.method, COALESCE(SUM(amount), 0) 
            FROM TRANSACTIONS t
            LEFT JOIN PAYMENT_METHODS pm ON t.idPaymentMethod = pm.idPaymentMethod
            WHERE idBusiness = %s AND idTypeTransaction = 1
            GROUP BY t.idPaymentMethod, pm.method
        """, (idBusiness,))
        payment_summary = cursor.fetchall()
        payment_summary_out = [
            {
                "idPaymentMethod": row[0],
                "totalAmount": float(row[1])
            }
            for row in payment_summary
        ]

        return {"message": "Resumen de ingresos por método de pago extraído", "data": payment_summary_out}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        if conn:
            releaseDB(conn)


@dashboardRouter.post("/total_range")
def getIncomeExpensesRange(request: RequestTotalRange, current_user: Annotated[tuple, Depends(get_current_user)]):
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()
        owner_id = current_user[0]

        # Obtener ingresos y gastos agrupados por día en el rango de fechas
        cursor.execute("""
            SELECT created_at::date, idTypeTransaction, COALESCE(SUM(amount), 0) 
            FROM TRANSACTIONS 
            WHERE idBusiness = %s 
                AND created_at::date BETWEEN %s AND %s
            GROUP BY created_at::date, idTypeTransaction
            ORDER BY created_at::date
        """, (request.idBusiness, request.startDate, request.endDate))

        results = cursor.fetchall()

        daily_summary = {}
        for row in results:
            date_str = str(row[0])
            tx_type = row[1]
            amount = float(row[2])

            if date_str not in daily_summary:
                daily_summary[date_str] = {
                    "date": date_str,
                    "income": 0.0,
                    "expenses": 0.0
                }

            if tx_type == 1:
                daily_summary[date_str]["income"] += amount
            elif tx_type == 2:
                daily_summary[date_str]["expenses"] += amount

        data_out = list(daily_summary.values())

        return {
            "message": "Resumen diario extraido",
            "data": data_out
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        if conn:
            releaseDB(conn)


@dashboardRouter.post("/income_range")
def get_summary(request: RequestIncome, current_user: Annotated[tuple, Depends(get_current_user)]):
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()
        owner_id = current_user[0]

        # Obtener ingresos en el rango de fechas
        cursor.execute("""
            SELECT amount, description, created_at 
            FROM TRANSACTIONS 
            WHERE idBusiness = %s AND idTypeTransaction = 1 
                AND created_at::date BETWEEN %s AND %s
            ORDER BY created_at DESC
        """, (request.idBusiness, request.startDate, request.endDate))

        sales = cursor.fetchall()

        sales_out = [
            {
                "amount": float(sale[0]),
                "description": sale[1],
                "date": str(sale[2]),
            }
            for sale in sales
        ]

        return {"message": "Ingresos extraidos", "data": sales_out}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        if conn:
            releaseDB(conn)


@dashboardRouter.post("/expenses_range")
def get_expenses(request: RequestExpenses, current_user: Annotated[tuple, Depends(get_current_user)]):
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()
        owner_id = current_user[0]

        # Obtener gastos en el rango de fechas
        cursor.execute("""
            SELECT amount, description, created_at 
            FROM TRANSACTIONS 
            WHERE idBusiness = %s AND idTypeTransaction = 2 
                AND created_at::date BETWEEN %s AND %s
            ORDER BY created_at DESC
        """, (request.idBusiness, request.startDate, request.endDate))

        expenses = cursor.fetchall()

        expenses_out = [
            {
                "amount": float(expense[0]),
                "description": expense[1],
                "date": str(expense[2])
            }
            for expense in expenses
        ]

        return {"message": "Gastos extraidos", "data": expenses_out}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        if conn:
            releaseDB(conn)


@dashboardRouter.get("/summary/{idBusiness}")
def get_dashboard_summary(idBusiness: int, current_user: Annotated[tuple, Depends(get_current_user)]):
    """
    Devuelve el estado financiero actual del negocio y el resumen de hoy.
    """
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()
        owner_id = current_user[0]

        # Obtener datos del negocio y balances basicos
        cursor.execute("""
            SELECT name, cashBalance, digitalBalance, totalBalance 
            FROM BUSINESSES 
            WHERE idBusiness = %s AND idOwner = %s
        """, (idBusiness, owner_id))

        business_data = cursor.fetchone()
        if not business_data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No autorizado o negocio no encontrado"
            )

        # Obtener resumen de hoy (Ventas vs Gastos)
        cursor.execute("""
            SELECT idTypeTransaction, COALESCE(SUM(amount), 0) 
            FROM TRANSACTIONS 
            WHERE idBusiness = %s AND created_at::date = CURRENT_DATE 
            GROUP BY idTypeTransaction
        """, (idBusiness,))

        # Convertimos el resultado en un diccionario fácil de manejar: {tipo: monto}
        tx_summary = dict(cursor.fetchall())

        today_sales = float(tx_summary.get(1, 0))
        today_expenses = float(tx_summary.get(2, 0))

        return {
            "businessName": business_data[0],
            "balances": {
                "cash": float(business_data[1]),
                "digital": float(business_data[2]),
                "total": float(business_data[3])
            },
            "today": {
                "sales": today_sales,
                "expenses": today_expenses,
                "net": today_sales - today_expenses
            }
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        if conn:
            releaseDB(conn)
