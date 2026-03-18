from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status, Depends
from typing import Annotated
from database.dbManagement import connectDB
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
    sellPrice: float
    stock: float
    isService: bool


class ItemCreateResponse(BaseModel):
    message: str
    data: ItemCreate


class ItemListResponse(BaseModel):
    items: list[ItemOut]


@itemRouter.post("/add", response_model=ItemCreateResponse, status_code=status.HTTP_201_CREATED)
def addItem(item: ItemCreate, current_user: Annotated[tuple, Depends(get_current_user)]):
    owner_id = current_user[0]
    conn = None

    try:
        conn = connectDB()
        cursor = conn.cursor()

        # SEGURIDAD: Verificar que el negocio pertenece al dueño autenticado
        check_query = "SELECT 1 FROM BUSINESSES WHERE idBusiness = %s AND idOwner = %s"
        cursor.execute(check_query, (item.idBusiness, owner_id))
        if not cursor.fetchone():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permiso para modificar este negocio"
            )

        # INSERTAR el nuevo Item
        query = """
            INSERT INTO ITEMS (idBusiness, name, description, costPrice, sellPrice, isService, stock)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING idItem
        """
        cursor.execute(query, (
            item.idBusiness,
            item.name,
            item.description,
            item.costPrice,
            item.sellPrice,
            item.isService,
            item.stock
        ))

        conn.commit()

        return ItemCreateResponse(
            message="Item creado exitosamente",
            data=item
        )

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


@itemRouter.get("/list/{idBusiness}", response_model=ItemListResponse)
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
            "SELECT idItem, name, sellPrice, stock, isService FROM ITEMS WHERE idBusiness = %s", (idBusiness,))

        items = []
        for row in cursor.fetchall():
            items.append(ItemOut(
                idItem=row[0],
                name=row[1],
                sellPrice=row[2],
                stock=row[3],
                isService=row[4]
            ))

        return ItemListResponse(items=items)
    finally:
        if conn:
            conn.close()
