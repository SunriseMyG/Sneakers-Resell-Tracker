from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/api/about")
async def read_about():
    return {"Hello": "About"}

@router.get("/api/contact")
async def read_contact():
    return {"Hello": "Contact"}

@router.get("/api/privacy")
async def read_privacy():
    return {"Hello": "Privacy"}

@router.get("/api/terms")
async def read_terms():
    return {"Hello": "Terms"}

@router.get("/api/cookies")
async def read_cookies():
    return {"Hello": "Cookies"}

@router.get("/api/")
async def read_root():
    return {"Hello": "Root"}

@router.get("/")
async def hello_world():
    return {"Hello": "World"}