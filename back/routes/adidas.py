from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/api/adidas")
async def read_adidas():
    return {"Hello": "Adidas"}