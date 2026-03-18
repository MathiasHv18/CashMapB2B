from fastapi import APIRouter, HTTPException, Depends, status
from typing import Annotated
from database.dbManagement import connectDB, releaseDB
from api.authEP import get_current_user

dashboardRouter = APIRouter()


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
