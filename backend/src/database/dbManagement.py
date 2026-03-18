import psycopg2
from psycopg2 import pool
from core.config import settings

# Inicializar Connection Pool de forma global
try:
    connection_pool = psycopg2.pool.SimpleConnectionPool( # type: ignore
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

# Inyección de dependencia recomendada por FastAPI (Future-proof)


def get_db_connection():
    if not connection_pool:
        raise Exception("Database connection pool is not initialized")
    conn = connection_pool.getconn()
    try:
        yield conn
    finally:
        connection_pool.putconn(conn)


class PooledConnectionWrapper:
    """Wrapper para hacer el pool compatible con los `conn.close()` del código anterior"""

    def __init__(self, conn, pool):
        self._conn = conn
        self._pool = pool

    def __getattr__(self, name):
        return getattr(self._conn, name)

    def close(self):
        if self._conn:
            self._pool.putconn(self._conn)
            self._conn = None


def connectDB():
    if not connection_pool:
        raise Exception("Database connection pool is not initialized")
    conn = connection_pool.getconn()
    return PooledConnectionWrapper(conn, connection_pool)


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
