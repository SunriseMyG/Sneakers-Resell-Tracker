from fastapi import APIRouter, HTTPException, Query
from sql.connection import getDataBaseConnection

router = APIRouter()

@router.get("/api/all")
async def read_all(sku: str = Query(None)):
    with getDataBaseConnection() as (cnx, cursor):
        if sku:
            query = "SELECT name, sku, color, price FROM items WHERE sku = %s"
            cursor.execute(query, (sku,))
        else:
            query = "SELECT name, sku, color, price FROM items"
            cursor.execute(query)
        
        result = cursor.fetchall()

        if not result:
            raise HTTPException(status_code=404, detail="No items found")

        items = []
        for row in result:
            item = {
                "name": row[0],
                "sku": row[1],
                "color": row[2],
                "price": row[3]
            }
            items.append(item)

        return items