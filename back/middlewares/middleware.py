from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def setupMiddlewares(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3006"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app