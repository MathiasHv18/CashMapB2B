import psycopg2
import psycopg2.pool
from core.config import settings

try:
    connection_pool = psycopg2.pool.SimpleConnectionPool(
        1,   # Mínimo de conexiones abiertas
        20,  # Máximo de conexiones abiertas
        dbname=settings.POSTGRES_DB,
        user=settings.POSTGRES_USER,
        password=settings.POSTGRES_PASSWORD,
        host=settings.DB_HOST,
        port=settings.DB_PORT
    )
    if connection_pool:
        print("Connection pool created successfully")
except Exception as e:
    print("Error initializing connection pool: ", e)
    connection_pool = None


def connectDB():
    if not connection_pool:
        raise Exception("Database connection pool is not initialized")
    return connection_pool.getconn()


def releaseDB(conn):
    if connection_pool and conn:
        connection_pool.putconn(conn)


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
            releaseDB(conn)
            print("Conn released")


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
        releaseDB(conn)


def getUserByEmail(email):
    conn = connectDB()
    cursor = conn.cursor()
    try:
        query = """SELECT idOwner, email, password FROM OWNERS WHERE EMAIL = %s"""
        cursor.execute(query, (email,))
        return cursor.fetchone()
    finally:
        cursor.close()
        releaseDB(conn)
