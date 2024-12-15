import mysql.connector
import time

def insertItem(cnx, cursor, name, price, url, image, description, sku, color, retailer):
    if not image:
        print("Image is required.")
        return

    if not description:
        print("Description is required.")
        return

    if not sku:
        print("SKU is required.")
        return

    if not color:
        print("Color is required.")
        return

    if not retailer:
        print("Retailer is required.")
        return

    query = ("INSERT INTO items "
             "(name, price, url, image, description, sku, color, retailer) "
             "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")
    data = (name, price, url, image, description, sku, color, retailer)

    max_retries = 3
    for attempt in range(max_retries):
        try:
            cursor.execute(query, data)
            cnx.commit()
            print(f"Item {name} inserted successfully.")
            break
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            cnx.rollback()
            if attempt < max_retries - 1:
                print("Retrying...")
                time.sleep(2)
            else:
                print("Failed to insert item after multiple attempts.")
        except Exception as e:
            print(f"Unexpected error: {e}")
            break