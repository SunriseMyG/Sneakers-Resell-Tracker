from fastapi import FastAPI
from sql.connection import getDataBaseConnection
from sql.setup import setupDatabase
from middlewares.middleware import setupMiddlewares
from routes.default import router as defaultRouter
from routes.corteiz import router as corteizRouter
from routes.nike import router as nikeRouter
from routes.adidas import router as adidasRouter
from routes.nocta import router as noctaRouter
from routes.sku import router as skuRouter 
from monitors.snkrs import monitor_snkrs
from monitors.shopify import monitor_shopify
import threading
import os

app = FastAPI()

setupMiddlewares(app)

app.include_router(defaultRouter)
app.include_router(corteizRouter)
app.include_router(nikeRouter)
app.include_router(adidasRouter)
app.include_router(noctaRouter)

app.include_router(skuRouter)

setupDatabase()

def monitor_snkrs_thread():
    with getDataBaseConnection() as (cnx, cursor):
        try:
            monitor_snkrs(cnx, cursor)
        except Exception as e:
            print(f"Error in monitor_snkrs_thread: {e}")

def monitor_shopify_thread(url):
    with getDataBaseConnection() as (cnx, cursor):
        try:
            monitor_shopify(url, cnx, cursor)
        except Exception as e:
            print(f"Error in monitor_shopify_thread: {e}")

def start_monitoring():
    if not os.path.exists('data'):
        os.makedirs('data')

    threading.Thread(target=monitor_snkrs_thread, daemon=True).start()
    threading.Thread(target=monitor_shopify_thread, args=('https://www.crtz.xyz/products.json',), daemon=True).start()
    threading.Thread(target=monitor_shopify_thread, args=('https://www.nocta.com/products.json',), daemon=True).start()

@app.on_event("startup")
def startup_event():
    start_monitoring()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
