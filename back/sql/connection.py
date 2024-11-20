from contextlib import contextmanager
import mysql.connector

@contextmanager
def getDataBaseConnection():
    config = {
        'user': 'root',
        'password': '',
        'host': '127.0.0.1',
        'connection_timeout': 300,
        'autocommit': True
    }
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    cursor.execute("USE sneakers_resell_tracker")

    try:
        yield cnx, cursor
    finally:
        cursor.close()
        cnx.close()
