from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status, Depends
from typing import Annotated
from database.dbManagement import connectDB, releaseDB
from api.authEP import get_current_user

itemRouter = APIRouter()


class ItemCreate(BaseModel):
    idBusiness: int
    name: str
    description: str | None = None
    costPrice: float = 0.0
    sellPrice: float
    isService: bool
    stock: float = 0.0


class ItemOut(BaseModel):
    idItem: int
    name: str
    description: str
    sellPrice: float
    stock: float
    isService: bool


@itemRouter.post("/add", status_code=status.HTTP_201_CREATED)
def addItem(item: ItemCreate, current_user: Annotated[tuple, Depends(get_current_user)]):
    owner_id = current_user[0]
    conn = None

    try:
        conn = connectDB()
        cursor = conn.cursor()

        query = """
            INSERT INTO ITEMS (idBusiness, name, description, costPrice, sellPrice, isService, stock)
            SELECT idBusiness, %s, %s, %s, %s, %s, %s
            FROM BUSINESSES
            WHERE idBusiness = %s AND idOwner = %s
            RETURNING idItem
        """
        cursor.execute(query, (
            item.name,
            item.description,
            item.costPrice,
            item.sellPrice,
            item.isService,
            item.stock,
            item.idBusiness,
            owner_id
        ))

        result = cursor.fetchone()
        if not result:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permiso para modificar este negocio o el negocio no existe"
            )

        conn.commit()

        return {
            "message": "Item creado exitosamente",
            "data": item
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


@itemRouter.get("/list/{idBusiness}")
def list_items(idBusiness: int, current_user: Annotated[tuple, Depends(get_current_user)]):
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()

        cursor.execute("SELECT 1 FROM BUSINESSES WHERE idBusiness = %s AND idOwner = %s",
                       (idBusiness, current_user[0]))
        if not cursor.fetchone():
            raise HTTPException(status_code=403, detail="No autorizado")

        cursor.execute(
            "SELECT idItem, name, description, sellPrice, stock, isService FROM ITEMS WHERE idBusiness = %s", (idBusiness,))

        items = []
        for row in cursor.fetchall():
            items.append(ItemOut(
                idItem=row[0],
                name=row[1],
                description=row[2],
                sellPrice=row[3],
                stock=row[4],
                isService=row[5]
            ))

        return {"message": "Items listados exitosamente", "data": items}
    finally:
        if conn:
            releaseDB(conn)
