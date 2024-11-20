from fastapi import APIRouter, HTTPException, Query
from sql.connection import getDataBaseConnection

router = APIRouter()

@router.get("/api/all")
async def read_all(sku: str = Query(None)):
    with getDataBaseConnection() as (cnx, cursor):
        if sku:
            query = "SELECT * FROM items WHERE sku = %s"
            cursor.execute(query, (sku,))
        else:
            query = "SELECT * FROM items"
            cursor.execute(query)
        
        result = cursor.fetchall()

        if not result:
            raise HTTPException(status_code=404, detail="No items found")            

        return result