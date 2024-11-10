from fastapi import FastAPI, HTTPException
from middlewares.middleware import setupMiddlewares

from routes.corteiz import router as corteizRouter
from routes.nike import router as nikeRouter
from routes.adidas import router as adidasRouter
from routes.nocta import router as noctaRouter

app = FastAPI()

setupMiddlewares(app)

app.include_router(corteizRouter)
app.include_router(nikeRouter)
app.include_router(adidasRouter)
app.include_router(noctaRouter)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
