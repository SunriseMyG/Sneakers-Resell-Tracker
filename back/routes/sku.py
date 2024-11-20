from fastapi import APIRouter, HTTPException
from sql.connection import getDataBaseConnection

router = APIRouter()

@router.get("/api/sku/{sku}")
async def read_sku(sku: str):
    with getDataBaseConnection() as (cnx, cursor):
        query = "SELECT * FROM items WHERE sku = %s"
        cursor.execute(query, (sku,))
        result = cursor.fetchall()

        if not result:
            raise HTTPException(status_code=404, detail="SKU {sku} not found")            

        return result[0]
