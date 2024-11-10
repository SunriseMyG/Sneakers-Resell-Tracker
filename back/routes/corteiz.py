from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/api/corteiz")
async def read_corteiz():
    return {"Hello": "Corteiz"}