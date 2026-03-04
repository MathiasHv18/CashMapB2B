import os
import psycopg2


def connectDB():
    conn = psycopg2.connect(
        dbname=os.getenv('POSTGRES_DB'),
        user=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD'),
        host='localhost'
    )
    print("Connection established!")
    return conn


def testConnectionDB():
    conn = None
    try:
        conn = connectDB()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM TYPE_TRANSACTIONS")
        records = cursor.fetchall()
        for row in records:
            print(row)
        print("Connection testing went OK")
    except Exception as e:
        print("Error during connection: ", e)
    finally:
        if conn:
            conn.close()
            print("Conn closed")


def verifyUserExistenceByEmail(email):
    conn = connectDB()
    cursor = conn.cursor()
    try:
        query = """SELECT 1 FROM OWNERS WHERE EMAIL = %s"""
        cursor.execute(query, (email,))
        result = cursor.fetchone()
        return result is not None
    finally:
        cursor.close()
        conn.close()

def getUserByEmail(email):
    conn = connectDB()
    cursor = conn.cursor()
    try:
        query = """SELECT idOwner, email, password FROM OWNERS WHERE EMAIL = %s"""
        cursor.execute(query, (email,))
        return cursor.fetchone() 
    finally:
        cursor.close()
        conn.close()