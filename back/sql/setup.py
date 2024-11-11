import mysql.connector
from mysql.connector import errorcode

DB_NAME = 'sneakers_resell_tracker'

def setupDatabase(cnx, cursor):
    try:
        cursor.execute(f"CREATE DATABASE {DB_NAME} DEFAULT CHARACTER SET 'utf8'")
        print(f"Database {DB_NAME} created successfully.")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_DB_CREATE_EXISTS:
            print(f"Database {DB_NAME} already exists.")
        else:
            print(err)
            exit(1)

    cursor.execute(f"USE {DB_NAME}")