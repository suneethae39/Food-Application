import sqlite3


def create_database():

    connection = sqlite3.connect("database/food.db")

    cursor = connection.cursor()


    # Foods table

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS foods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price INTEGER NOT NULL
        )
    """)


    # Add food items

    cursor.execute("""
        INSERT INTO foods (name, price)
        SELECT ?, ?
        WHERE NOT EXISTS (
            SELECT 1 FROM foods WHERE name = ?
        )
    """, ("Burger", 120, "Burger"))


    cursor.execute("""
        INSERT INTO foods (name, price)
        SELECT ?, ?
        WHERE NOT EXISTS (
            SELECT 1 FROM foods WHERE name = ?
        )
    """, ("Roller", 150, "Roller"))


    cursor.execute("""
        INSERT INTO foods (name, price)
        SELECT ?, ?
        WHERE NOT EXISTS (
            SELECT 1 FROM foods WHERE name = ?
        )
    """, ("Wings", 180, "Wings"))


    cursor.execute("""
        INSERT INTO foods (name, price)
        SELECT ?, ?
        WHERE NOT EXISTS (
            SELECT 1 FROM foods WHERE name = ?
        )
    """, ("Krusher", 70, "Krusher"))


    # Orders table

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            mobile TEXT NOT NULL,
            address TEXT NOT NULL,
            total INTEGER NOT NULL
        )
    """)


    connection.commit()

    connection.close()

  
create_database()