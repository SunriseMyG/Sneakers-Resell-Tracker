import requests
from fastapi import APIRouter, HTTPException
from sql.connection import getDataBaseConnection

router = APIRouter()

@router.get("/api/stockx/search/{string}")
async def search_stockx(string: str):
    url = "https://stockx-api.p.rapidapi.com/search"

    querystring = {"query": string}

    headers = {
        "x-rapidapi-key": "30fb07bcaemshed6c1f3616bf8bdp1e9223jsnf3c7fe1bc9e6",
        "x-rapidapi-host": "stockx-api.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    data = response.json()
    if data['hits'] is None or len(data['hits']) == 0:
        return {"error": "No hits found"}
    if data['hits'][0] is None:
        return {"error": "First hit is None"}

    first = data['hits'][0]
    avg_price = first['avg_price']
    link = first['link']
    release_date = first['release_date']

    return { "avg_price": avg_price, "link": link, "release_date": release_date }

