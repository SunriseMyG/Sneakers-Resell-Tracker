import os
import json
import time
import requests

def sleep(ms):
    time.sleep(ms / 1000)

def monitor_shopify(url):
    print("\n---------------------------------\n--- SHOPIFY MONITOR HAS STARTED ---\n---------------------------------\n")
    print('Monitoring:', url)

    if not url.endswith('products.json'):
        print("URL invalide, veuillez entrer une URL valide se terminant par products.json\n Exemple: https://www.crtz.xyz/products.json")
        return

    logs_file = url.split('https://')[1].split('.')[1] + '.json'
    site_base_url = url.split('products.json')[0]

    try:
        with open(logs_file, 'r') as file:
            LOGS = json.load(file)
            print('Logs chargés depuis le fichier:', LOGS)
    except (FileNotFoundError, json.JSONDecodeError):
        LOGS = []
        print('Erreur lors du chargement des logs.')

    try:
        response = requests.get(url)
        response.raise_for_status()
        products = response.json().get('products', [])
        if not products:
            print("No products found")
            return

        for product in products:
            try:
                item = {
                    "title": product["title"],
                    "image": product["images"][0]["src"] if product["images"] else None,
                    "handle": product["handle"],
                    "variants": product["variants"],
                    "description": product.get("body_html", "")
                }
            except KeyError as e:
                print(f"Error processing product {product['title']}: {e}")
                continue

            if product["id"] in LOGS:
                continue

            print(f"New product found: {item['title']}")
            LOGS.append(product["id"])
            with open(logs_file, 'w') as file:
                json.dump(LOGS, file, indent=2)

            print(item['title'], item['image'], item['handle'], item['variants'], item['description'])
            sleep(1000)

        print("Successfully scraped site")

    except requests.RequestException as e:
        print(f"Error retrieving data: {e}")

