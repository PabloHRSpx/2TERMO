-- Active: 1788867847857@@127.0.0.1@3306@smartcoffee_dml_pablo
-- REVISAO DE DML -- AULA 08

-- REVISAO DE INSERTS
INSERT INTO cliente (NOME, EMAIL, TELEFONE, CIDADE, ATIVO) VALUES
('Kauan R', 'kauan@email.com', '1999999900', 'Limeira', TRUE),
('Laura C', 'laura@email.com', '1999999901', 'Limeira', TRUE),
('Laura N', 'lauran@email.com', '1999999902', 'Limeira', TRUE),
('Laura R', 'laurar@email.com', '1999999903', 'Limeira', TRUE),
('Leonardo B', 'leonardob@email.com', '1999999904', 'Limeira', TRUE),
('Leonardo BT', 'leonardobt@email.com', '1999999905', 'Americana', TRUE),
('Lidia M', 'lidia@email.com', '1999999906', 'Belem', TRUE),
('Livia V', 'livia@email.com', NULL, 'Limeira', TRUE),
('Marcos V', 'marcos@email.com', '1999999907', 'Campo Mourão', TRUE),
('Nicolas N', 'nicolasn@email.com', '1999999908', '', FALSE),
('Nicolas F', 'nicolasf@email.com', '1999999909', 'Campinas', TRUE),
('Pablo H', 'pablo@email.com', '1999999910', 'Indaiatuba', TRUE),
('Sophie A', 'sophie@email.com', '1999999911', 'Campinas', TRUE),
('Vinicius H', 'vinicius@email.com', NULL, 'Limeira', TRUE),
('Vitoria S', 'vitoria@email.com', '1999999912', 'Limeira', TRUE),
('Virginia S', 'virginia@email.com', NULL, 'Boston', TRUE)

INSERT INTO categoria (NOME_CATEGORIA) VALUES
('Combos Especiais'),('Nutella');

INSERT INTO pedido (DATA_PEDIDO,STATUS_PEDIDO,VALOR_TOTAL,ID_CLIENTE) VALUES
(NOW(),'ABERTO',0.00,1);

INSERT INTO pedido (DATA_PEDIDO,STATUS_PEDIDO,VALOR_TOTAL,ID_CLIENTE) VALUES
(NOW(),'ABERTO',0.00,24);

SET @PEDIDO = LAST_INSERT_ID();
SELECT @PEDIDO;

INSERT INTO item_pedido (ID_PEDIDO, ID_PRODUTO, QUANTIDADE, PRECO_UNITARIO, OBSERVACAO) VALUES
(@PEDIDO, 4, 2, 13.00, 'MOCHHA')

------------------------------------------------------------------------------

-- ATUALIZANDO DADOS NO BD
UPDATE cliente
SET `TELEFONE` = '19999888801'
WHERE ID_CLIENTE = 5;

UPDATE cliente
SET TELEFONE = '19999777701',
    CIDADE = 'PIRACICABA',
    ATIVO = FALSE
WHERE ID_CLIENTE = 5;

----- TOMAR MUITO CUIDADO ----- NÃO ESQUECER :( --- DE COLOCAR O WHERE
UPDATE cliente
SET ATIVO = FALSE;

UPDATE pedido
SET `VALOR_TOTAL` = 1.00;

-----------------------------------------------------------------------------

-- DICAS DE OURO
-- EXECUTAR O SELECT SEMPRE ANTES DE ATUALIZAR
-- SELECT * FROM TABELA_QUE_DESEJO;

-----------------------------------------------------------------------------

-- CONDICIONAIS
UPDATE produto
SET PRECO =
CASE
    WHEN PRECO < 30 THEN PRECO * 1.50
    ELSE PRECO * 1.25
END
WHERE ATIVO = TRUE;

UPDATE cliente
SET TELEFONE = NULL
WHERE ID_CLIENTE = 23;

-- APAGANDO DADOS DO BD
DELETE FROM cliente
WHERE ID_CLIENTE = 16;

TRUNCATE TABLE cliente;

-- EXCLUINDO DADOS DE FORMA LOGICA
UPDATE cliente
SET ATIVO = FALSE
WHERE ID_CLIENTE = 23;

------------------------------------------------------------------------------

-- CADASTRANDO UM PROCEDIMENTO DE COMPRA

INSERT INTO cliente(NOME, EMAIL, TELEFONE, CIDADE, ATIVO) VALUES
('Bruno H', 'bruno@email.com', '1999999913', 'Piracicaba', TRUE);
SET @CLIENTE = LAST_INSERT_ID();

-- PASSO 2: ADICIONANDO UM NOVO PEDIDO
INSERT INTO pedido (DATA_PEDIDO, STATUS_PEDIDO, VALOR_TOTAL, ID_CLIENTE) VALUES
(NOW(),'ABERTO', 0.00, @CLIENTE);
SET @PEDIDO = LAST_INSERT_ID();

-- PASSO 3: ADICIONANDO ITENS AO PEDIDO
INSERT INTO item_pedido(ID_PEDIDO, ID_PRODUTO, QUANTIDADE, PRECO_UNITARIO, OBSERVACAO) VALUES
(@PEDIDO, 4, 2, 13.00, 'Mel'),
(@PEDIDO, 5, 1, 15.50,'');

-- PASSO 4: ATUALIZANDO O VALOR TOTAL DO PEDIDO
UPDATE pedido
SET `VALOR_TOTAL` = 22.00,
    `STATUS_PEDIDO` = 'PREPARANDO'
WHERE `ID_PEDIDO` = @PEDIDO;

-- PASSO 5: REGISTRANDO PAGAMENTO
INSERT INTO pagamento (`ID_PEDIDO`,`ID_FORMA_PAGAMENTO`, `VALOR`, `DATA_PAGAMENTO`) VALUES
(@PEDIDO, 2, 22.00, NOW());

--- CONSULTA DE FORMA COMPLETA
SELECT P.ID_PEDIDO,
C.NOME AS cliente,
P.STATUS_PEDIDO,
P.VALOR_TOTAL
FROM pedido P
JOIN cliente C ON C.`ID_CLIENTE` = P.`ID_CLIENTE`
WHERE P.`ID_PEDIDO` = @PEDIDO;


-- CONSULTA PARA OS DADOS NO BD
SELECT * FROM cliente;
SELECT * FROM cliente
WHERE `ID_CLIENTE` = 23;
