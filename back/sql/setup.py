import mysql.connector
from mysql.connector import errorcode

DB_NAME = 'sneakers_resell_tracker'

def setupDatabase():
    config = {
        'user': 'root',
        'password': '',
        'host': '127.0.0.1',
        'connection_timeout': 300,
        'autocommit': True
    }

    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

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

    tables = {}

    # ITEMS
    # id, name, price, url, image, description, sku, color
    tables['items'] = (
        "CREATE TABLE `items` ("
        "  `id` int(11) NOT NULL AUTO_INCREMENT,"
        "  `name` varchar(255) NOT NULL,"
        "  `price` float(11) NOT NULL,"
        "  `url` varchar(255) NOT NULL,"
        "  `image` varchar(255) NOT NULL,"
        "  `description` blob NOT NULL,"
        "  `sku` varchar(255) NOT NULL,"
        "  `color` varchar(255) NOT NULL,"
        "  `retailer` varchar(255) NOT NULL,"
        "  PRIMARY KEY (`id`)"
        ") ENGINE=InnoDB"
    )

    for table_name in tables:
        table_description = tables[table_name]
        try:
            print(f"Creating table {table_name}: ", end='')
            cursor.execute(table_description)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print(f"Table {table_name} already exists.")
            else:
                print(err.msg)
        else:
            print("OK")