from fastapi import APIRouter, HTTPException, Query
from sql.connection import getDataBaseConnection

router = APIRouter()

@router.get("/api/all")
async def read_all(sku: str = Query(None)):
    with getDataBaseConnection() as (cnx, cursor):
        if sku:
            query = "SELECT id, name, sku, color, price, image FROM items WHERE sku = %s"
            cursor.execute(query, (sku,))
        else:
            query = "SELECT id, name, sku, color, price, image FROM items"
            cursor.execute(query)
        
        result = cursor.fetchall()

        if not result:
            raise HTTPException(status_code=404, detail="No items found")

        items = []
        for row in result:
            item = {
                "id": row[0],
                "name": row[1],
                "sku": row[2],
                "color": row[3],
                "price": row[4],
                "image": row[5]
            }
            items.append(item)

        return items