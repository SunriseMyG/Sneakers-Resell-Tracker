from fastapi import APIRouter, HTTPException
from sql.connection import getDataBaseConnection

router = APIRouter()

@router.get("/api/nike")
async def read_nike():
    with getDataBaseConnection() as (cnx, cursor):
        query = "SELECT id, name, sku, color, price, image, retailer FROM items WHERE retailer = 'Nike'"
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
                "image": row[5],
                "retailer": row[6]
            }
            items.append(item)

        return items