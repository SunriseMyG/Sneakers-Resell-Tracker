import mysql.connector
from mysql.connector import errorcode

def insertItem(cnx, cursor, name, price, url, image, description, sku, color):
    query = ("INSERT INTO items "
             "(name, price, url, image, description, sku, color) "
             "VALUES (%s, %s, %s, %s, %s, %s, %s)")
    data = (name, price, url, image, description, sku, color)

    try:
        cursor.execute(query, data)
        cnx.commit()
        #print(f"Item {name} inserted successfully.")
    except mysql.connector.Error as err:
        #print(f"Error: {err}")
        cnx.rollback()