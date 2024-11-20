from fastapi import APIRouter, HTTPException
from sql.connection import getDataBaseConnection

router = APIRouter()

@router.get("/api/all")
async def read_all(sku: str):
    with getDataBaseConnection() as (cnx, cursor):
        query = "SELECT * FROM items"
        cursor.execute(query)
        result = cursor.fetchall()

        if not result:
            raise HTTPException(status_code=404, detail="No items found")            

        return result
