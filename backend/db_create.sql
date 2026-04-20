
-- Eliminar tablas si existen (orden inverso por dependencias)

DROP TABLE IF EXISTS TRANSACTIONS_DETAILS CASCADE;

DROP TABLE IF EXISTS ITEMS CASCADE;

DROP TABLE IF EXISTS SALE_PRODUCTS CASCADE;

DROP TABLE IF EXISTS TRANSACTIONS CASCADE;

DROP TABLE IF EXISTS PRODUCTS CASCADE;

DROP TABLE IF EXISTS PAYMENT_METHODS CASCADE;

DROP TABLE IF EXISTS TYPE_TRANSACTIONS CASCADE;

DROP TABLE IF EXISTS BUSINESSES CASCADE;

DROP TABLE IF EXISTS CATEGORY_BUSINESS CASCADE;

DROP TABLE IF EXISTS OWNERS CASCADE;

-- Table: OWNERS
CREATE TABLE
    OWNERS (
        idOwner serial NOT NULL,
        name varchar(100) NOT NULL,
        lastname varchar(100) NOT NULL,
        age int NULL,
        sex varchar(20) NULL,
        email varchar(150) NOT NULL, -- Corregido: de int a varchar
        password varchar(255) NOT NULL, -- Corregido: de int a varchar
        created_at timestamp NOT NULL DEFAULT current_timestamp,
        CONSTRAINT OWNERS_pk PRIMARY KEY (idOwner)
    );

-- Table: CATEGORY_BUSINESS
CREATE TABLE
    CATEGORY_BUSINESS (
        idCategoryBusiness serial NOT NULL,
        categoryBusiness varchar(30) NOT NULL,
        CONSTRAINT CATEGORY_BUSINESS_pk PRIMARY KEY (idCategoryBusiness)
    );

-- Table: BUSINESSES`
CREATE TABLE
    BUSINESSES (
        idBusiness serial NOT NULL,
        idOwner int NOT NULL,
        idCategoryBusiness int NOT NULL,
        name varchar(100) NOT NULL,
        description varchar(200) NOT NULL,
        email varchar(200) NOT NULL,
        foundationYear int NOT NULL,
        created_at timestamp NOT NULL DEFAULT current_timestamp,
        cashBalance decimal(12, 2) NOT NULL DEFAULT 0,
        digitalBalance decimal(12, 2) NOT NULL DEFAULT 0,
        totalBalance decimal(12, 2) NOT NULL DEFAULT 0,
        CONSTRAINT BUSINESSES_pk PRIMARY KEY (idBusiness)
    );


-- Table: TYPE_TRANSACTIONS
CREATE TABLE
    TYPE_TRANSACTIONS (
        idTypeTransaction serial NOT NULL,
        type varchar(20) NOT NULL,
        CONSTRAINT TYPE_TRANSACTIONS_pk PRIMARY KEY (idTypeTransaction)
    );

-- Table: PAYMENT_METHODS
CREATE TABLE
    PAYMENT_METHODS (
        idPaymentMethod serial NOT NULL,
        method varchar(20) NOT NULL,
        CONSTRAINT PAYMENT_METHODS_pk PRIMARY KEY (idPaymentMethod)
    );


-- Si es type 1 es ingreso, 2 es egreso
-- Table: TRANSACTIONS
CREATE TABLE
    TRANSACTIONS (
        idTransaction serial NOT NULL,
        idBusiness int NOT NULL,
        idTypeTransaction int NOT NULL,
        idPaymentMethod int NOT NULL,
        amount decimal(12, 2) NOT NULL DEFAULT 0, -- Agregado: para gastos y compras directas
        description varchar(200),
        created_at timestamp NOT NULL DEFAULT current_timestamp,
        CONSTRAINT TRANSACTIONS_pk PRIMARY KEY (idTransaction)
    );

-- Table: ITEMS
CREATE TABLE ITEMS (
    idItem serial PRIMARY KEY,
    idBusiness int NOT NULL REFERENCES BUSINESSES(idBusiness),
    name varchar(100) NOT NULL,
    description varchar(200),
    costPrice decimal(12, 2) DEFAULT 0, -- Lo que le cuesta al dueño (para bodega)
    sellPrice decimal(12, 2) NOT NULL, -- Lo que paga el cliente
    isService boolean NOT NULL,        -- true: Corte de cabello / false: Gaseosa
    stock decimal(12, 2) DEFAULT 0,    -- Para bodega (kilos, unidades)
    created_at timestamp DEFAULT current_timestamp
);

-- Table: TRANSACTION_DETAILS
CREATE TABLE TRANSACTION_DETAILS (
    idDetail serial PRIMARY KEY,
    idTransaction int NOT NULL REFERENCES TRANSACTIONS(idTransaction),
    idItem int NOT NULL REFERENCES ITEMS(idItem),
    quantity decimal(12, 2) NOT NULL, -- decimal por si venden medio kilo
    unitPrice decimal(12, 2) NOT NULL, -- Precio al momento de la operación
    subtotal decimal(12, 2) NOT NULL   -- quantity * unitPrice
);

ALTER TABLE BUSINESSES ADD CONSTRAINT BUSINESS_OWNER_FK FOREIGN KEY (idOwner) REFERENCES OWNERS (idOwner);
ALTER TABLE BUSINESSES ADD CONSTRAINT BUSINESS_CAT_FK FOREIGN KEY (idCategoryBusiness) REFERENCES CATEGORY_BUSINESS (idCategoryBusiness);

ALTER TABLE ITEMS ADD CONSTRAINT ITEMS_BUSINESS_FK FOREIGN KEY (idBusiness) REFERENCES BUSINESSES (idBusiness);

ALTER TABLE TRANSACTIONS ADD CONSTRAINT TRANS_BUSINESS_FK FOREIGN KEY (idBusiness) REFERENCES BUSINESSES (idBusiness);
ALTER TABLE TRANSACTIONS ADD CONSTRAINT TRANS_TYPE_FK FOREIGN KEY (idTypeTransaction) REFERENCES TYPE_TRANSACTIONS (idTypeTransaction);
ALTER TABLE TRANSACTIONS ADD CONSTRAINT TRANS_PAY_FK FOREIGN KEY (idPaymentMethod) REFERENCES PAYMENT_METHODS (idPaymentMethod);

-- Relaciona el detalle con la cabecera de la transacción y con el Item (Producto/Servicio)
ALTER TABLE TRANSACTION_DETAILS ADD CONSTRAINT DETAIL_ITEM_FK FOREIGN KEY (idItem) REFERENCES ITEMS (idItem);
ALTER TABLE TRANSACTION_DETAILS ADD CONSTRAINT DETAIL_TRANS_FK FOREIGN KEY (idTransaction) REFERENCES TRANSACTIONS (idTransaction);

-- Poblado de TYPE_TRANSACTIONS
-- ID 1: Para ingresos por ventas
-- ID 2: Para cualquier salida de dinero (incluye compras de stock y gastos operativos)
INSERT INTO
    TYPE_TRANSACTIONS (type)
VALUES
    ('Venta'),
    ('Gasto');

-- Poblado de PAYMENT_METHODS
-- Separando los métodos más usados en Perú
INSERT INTO
    PAYMENT_METHODS (method)
VALUES
    ('Efectivo'),
    ('Yape'),
    ('Plin'),
    ('Tarjeta'),
    ('Transferencia'),
    ('Otro');

-- Poblado de CATEGORY_BUSINESS (Opcional, para el registro inicial)
INSERT INTO
    CATEGORY_BUSINESS (categoryBusiness)
VALUES
    ('Bodega / Minimarket'),
    ('Barbería / Estética'),
    ('Restaurante / Cafetería'),
    ('Ropa / Calzado'),
    ('Otros');