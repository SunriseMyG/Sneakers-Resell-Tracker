from fastapi import APIRouter, HTTPException
from sql.connection import getDataBaseConnection

router = APIRouter()

@router.get("/api/sku/{sku}")
async def read_sku(sku: str):
    with getDataBaseConnection() as (cnx, cursor):
        query = "SELECT id, name, sku, color, price, image FROM items WHERE sku = %s"
        cursor.execute(query, (sku,))
        result = cursor.fetchall()

        if not result:
            raise HTTPException(status_code=404, detail=f"SKU {sku} not found")

        item = {
            "id": result[0][0],
            "name": result[0][1],
            "sku": result[0][2],
            "color": result[0][3],
            "price": result[0][4],
            "image": result[0][5]
        }

        return item