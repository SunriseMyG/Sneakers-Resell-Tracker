from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/api/nike")
async def read_nike():
    return {"Hello": "Nike"}