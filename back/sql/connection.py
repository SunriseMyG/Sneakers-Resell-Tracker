import mysql.connector

def connectDatabase():
    config = {
        'user': 'root',
        'password': '',
        'host': '127.0.0.1',
        connection_timeout=300,
        autocommit=True
    }

    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        print("Connected to MySQL server.")
        return cnx, cursor
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        exit(1)

def disconnectDatabase(cnx, cursor):
    cursor.close()
    cnx.close()
    print("MySQL connection closed.")