import os
import sys
import requests
import json
import time

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from useragents import random_user_agent

snkrs = {
    "language": "fr",
    "location": "FR"
}

def sleep(ms):
    time.sleep(ms / 1000)

def monitor_snkrs():
    print("\n---------------------------------\n--- NIKE MONITOR HAS STARTED ---\n---------------------------------\n")

    session = requests.Session()
    session.headers.update({
        'User-Agent': random_user_agent()
    })

    try:
        with open('logsSNKRS.json', 'r') as file:
            logs = json.load(file)
            print('Logs loaded from file:', logs)
    except (FileNotFoundError, json.JSONDecodeError):
        logs = []
        print('Error loading logs.')

    anchor = 0
    count = 50

    try:
        while anchor < 160:
            locale_formats = [
                f"{snkrs['language']}_{snkrs['location']}",
                f"{snkrs['language']}-{snkrs['location']}",
                snkrs['language']
            ]

            for locale in locale_formats:
                url = (f"https://api.nike.com/product_feed/threads/v3/?anchor={anchor}&count={count}"
                       f"&filter=marketplace({snkrs['location']})"
                       f"&filter=language({snkrs['language']})"
                       f"&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)"
                       "&filter=exclusiveAccess(true,false)")

                print('Requesting URL:', url)
                response = session.get(url)
                response_data = response.json()

                print("Total Pages:", response_data['pages']['totalPages'])
                print("Total Resources:", response_data['pages']['totalResources'])

                for obj in response_data['objects']:
                    
                    if 'productInfo' not in obj:
                        print('No product info found in object.')
                        continue
                
                    product_info = obj['productInfo']
                
                    for product in product_info:
                        product_content = product['productContent']
                        product_id = product_content['globalPid']
                
                        if product_id in logs:
                            continue
                
                        full_title = product_content.get('fullTitle', 'Unknown')
                        color_description = product_content.get('colorDescription', 'Unknown')
                        price = product['merchPrice'].get('currentPrice', 'Unknown')
                        product_url = (f"https://www.nike.com/{snkrs['location']}/launch/t/"
                                       f"{product_content.get('slug', 'Unknown')}")
                        
                        img = 'Unknown'
                        desc = 'Unknown'
                        sku = 'Unknown'
                        
                        if 'publishedContent' in obj and 'nodes' in obj['publishedContent']:
                            nodes = obj['publishedContent']['nodes']
                            if len(nodes) > 0 and 'nodes' in nodes[0]:
                                sub_nodes = nodes[0]['nodes']
                                if len(sub_nodes) > 0 and 'properties' in sub_nodes[0]:
                                    properties = sub_nodes[0]['properties']
                                    img = properties.get('squarishURL', 'Unknown')
                                    if 'jsonBody' in properties and 'content' in properties['jsonBody']:
                                        content = properties['jsonBody']['content']
                                        if len(content) > 0 and 'content' in content[0]:
                                            desc = content[0]['content'][0].get('text', 'Unknown')
                                        if len(content) > 1 and 'content' in content[1]:
                                            sku = content[1]['content'][1].get('text', 'Unknown')
                
                        logs.append(product_id)
                        with open('logsSNKRS.json', 'w') as file:
                            json.dump(logs, file, indent=2)
                
                        print(f"New product found: {full_title} - {color_description} - {price} - {product_url} - {img} - {desc} - {sku}")
                        sleep(2500)

                anchor += count
    except Exception as e:
        print('Error retrieving data:', e, 'Line:', sys.exc_info()[-1].tb_lineno)
