from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status, Depends
from typing import Annotated, List
from database.dbManagement import connectDB, releaseDB
from api.authEP import get_current_user

transactionRouter = APIRouter()


class ItemSale(BaseModel):
    idItem: int
    quantity: float
    unitPrice: float


class SaleCreate(BaseModel):
    idBusiness: int
    idPaymentMethod: int  # 1: Efectivo, 2: Yape, etc.
    description: str | None = None
    items: List[ItemSale]


class ExpenseCreate(BaseModel):
    idBusiness: int
    idPaymentMethod: int
    amount: float  # Monto total del gasto
    description: str
    isStockPurchase: bool = False  # ¿Esta compra aumenta el stock?
    items: List[ItemSale] | None = None  # Solo si isStockPurchase es True


@transactionRouter.post("/sale")
def registerSale(sale: SaleCreate, current_user: Annotated[tuple, Depends(get_current_user)]):
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()
        total_amount = sum(
            item.quantity * item.unitPrice for item in sale.items)

        cursor.execute("""
            INSERT INTO TRANSACTIONS (idBusiness, idTypeTransaction, idPaymentMethod, amount, description)
            VALUES (%s, 1, %s, %s, %s) RETURNING idTransaction
        """, (sale.idBusiness, sale.idPaymentMethod, total_amount, sale.description))

        result = cursor.fetchone()

        if result is None:
            raise HTTPException(
                status_code=500, detail="Failed to create transaction")

        id_tx = result[0]

        # 2. Registrar detalles y actualizar Stock
        for item in sale.items:
            # Insertar detalle
            cursor.execute("""
                INSERT INTO TRANSACTION_DETAILS (idTransaction, idItem, quantity, unitPrice, subtotal)
                VALUES (%s, %s, %s, %s, %s)
            """, (id_tx, item.idItem, item.quantity, item.unitPrice, item.quantity * item.unitPrice))

            # Actualizar stock solo si NO es servicio
            cursor.execute("""
                UPDATE ITEMS SET stock = stock - %s 
                WHERE idItem = %s AND isService = FALSE
            """, (item.quantity, item.idItem))

        # 3. Actualizar Balances del Negocio
        # Dependiendo del método de pago, sumamos a cash o digital
        if sale.idPaymentMethod == 1:  # Efectivo (según tus inserts)
            balance_query = "UPDATE BUSINESSES SET cashBalance = cashBalance + %s, totalBalance = totalBalance + %s WHERE idBusiness = %s"
        else:  # Digital (Yape, Plin, Tarjeta, etc.)
            balance_query = "UPDATE BUSINESSES SET digitalBalance = digitalBalance + %s, totalBalance = totalBalance + %s WHERE idBusiness = %s"

        cursor.execute(balance_query, (total_amount,
                       total_amount, sale.idBusiness))

        conn.commit()
        return {"message": "Venta registrada con éxito", "total": total_amount, "idTransaction": id_tx}

    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            releaseDB(conn)


@transactionRouter.post("/expense")
def registerExpense(expense: ExpenseCreate, current_user: Annotated[tuple, Depends(get_current_user)]):
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()

        # 1. Crear la Transacción (idTypeTransaction 2 = Gasto)
        cursor.execute("""
            INSERT INTO TRANSACTIONS (idBusiness, idTypeTransaction, idPaymentMethod, amount, description)
            VALUES (%s, 2, %s, %s, %s) RETURNING idTransaction
        """, (expense.idBusiness, expense.idPaymentMethod, expense.amount, expense.description))
        result = cursor.fetchone()
        if result is None:
            raise HTTPException(
                status_code=500, detail="Failed to create transaction")
        id_tx = result[0]

        # 2. Si es compra de stock, registramos detalles e INCREMENTAMOS stock
        if expense.isStockPurchase and expense.items:
            for item in expense.items:
                cursor.execute("""
                    INSERT INTO TRANSACTION_DETAILS (idTransaction, idItem, quantity, unitPrice, subtotal)
                    VALUES (%s, %s, %s, %s, %s)
                """, (id_tx, item.idItem, item.quantity, item.unitPrice, item.quantity * item.unitPrice))

                cursor.execute("""
                    UPDATE ITEMS SET stock = stock + %s WHERE idItem = %s
                """, (item.quantity, item.idItem))

        # 3. Actualizar Balances (RESTANDO dinero)
        column = "cashBalance" if expense.idPaymentMethod == 1 else "digitalBalance"
        cursor.execute(f"""
            UPDATE BUSINESSES 
            SET {column} = {column} - %s, totalBalance = totalBalance - %s 
            WHERE idBusiness = %s
        """, (expense.amount, expense.amount, expense.idBusiness))

        conn.commit()
        return {"message": "Gasto registrado", "idTransaction": id_tx}
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            releaseDB(conn)
