from fastapi import FastAPI
from middlewares.middleware import setupMiddlewares
from routes.default import router as defaultRouter
from routes.corteiz import router as corteizRouter
from routes.nike import router as nikeRouter
from routes.adidas import router as adidasRouter
from routes.nocta import router as noctaRouter
from monitors.snkrs import monitor_snkrs
import threading

app = FastAPI()

setupMiddlewares(app)

app.include_router(defaultRouter)
app.include_router(corteizRouter)
app.include_router(nikeRouter)
app.include_router(adidasRouter)
app.include_router(noctaRouter)

def start_monitoring():
    monitoring_thread = threading.Thread(target=monitor_snkrs, daemon=True)
    monitoring_thread.start()

@app.on_event("startup")
def startup_event():
    start_monitoring()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
