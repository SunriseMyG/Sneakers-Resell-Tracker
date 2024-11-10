from fastapi import FastAPI
from middlewares.middleware import setupMiddlewares
from routes.default import router as defaultRouter
from routes.corteiz import router as corteizRouter
from routes.nike import router as nikeRouter
from routes.adidas import router as adidasRouter
from routes.nocta import router as noctaRouter
from monitors.snkrs import monitor_snkrs
from monitors.shopify import monitor_shopify
import threading

app = FastAPI()

setupMiddlewares(app)

app.include_router(defaultRouter)
app.include_router(corteizRouter)
app.include_router(nikeRouter)
app.include_router(adidasRouter)
app.include_router(noctaRouter)

def start_monitoring():
    snkrs_thread = threading.Thread(target=monitor_snkrs, daemon=True)
    snkrs_thread.start()
    
    corteiz_thread = threading.Thread(target=monitor_shopify, args=('https://www.crtz.xyz/products.json',), daemon=True)
    corteiz_thread.start()

    nocta_thread = threading.Thread(target=monitor_shopify, args=('https://www.nocta.com/products.json',), daemon=True)
    nocta_thread.start()

    snkrs_thread.join()
    corteiz_thread.join()
    nocta_thread.join()

@app.on_event("startup")
def startup_event():
    start_monitoring()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
