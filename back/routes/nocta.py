from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/api/nocta")
async def read_nocta():
    return {"Hello": "Nocta"}