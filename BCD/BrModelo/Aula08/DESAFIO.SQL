-- Active: 1788867847857@@127.0.0.1@3306@smartcoffee_dml_pablo
-- PARTE A

-- 1.
INSERT INTO cliente (NOME,EMAIL,TELEFONE,CIDADE,ATIVO) VALUES
('Henque', 'henrique@email.com', '1999999919', 'Limeira', TRUE),
('Ricardo', 'ricardo@email.com', '1999999920', 'Londres', TRUE),
('Julio', 'julio@email.com', NULL, 'Limeira', TRUE)

-- 2.
INSERT INTO categoria (NOME_CATEGORIA) VALUES
('ESPECIAIS DA CASA');
-- 3.

-- 4.
INSERT INTO cliente (NOME,EMAIL,TELEFONE,CIDADE,ATIVO) VALUES
('Julio', 'julio@email.com', NULL, 'Limeira', TRUE)

-- 5.

-- 6.



-- PARTE B

-- 1.
UPDATE cliente
SET TELEFONE = 911111191
WHERE ID_CLIENTE = 26;

-- 2.
UPDATE cliente
SET TELEFONE = '1234567991',
SET CIDADE = 'Limeira'
WHERE ID_CLIENTE = 27;

SELECT * FROM cliente