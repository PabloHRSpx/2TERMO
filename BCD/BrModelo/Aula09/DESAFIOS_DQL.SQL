-- Active: 1788867847857@@127.0.0.1@3306@smartcoffee_dml_pablo
-- ============================================================
-- AULA 09 - ATIVIDADE PRÁTICA DE DQL
-- Nome: _______________________________________________
-- Turma: ______________________ Data: _________________
-- Base: smartcoffee_dql
-- ============================================================

-- PARTE A - AQUECIMENTO

-- 1. Liste todos os clientes cadastrados.
SELECT * FROM cliente;

-- 2. Exiba apenas nome, cidade e e-mail dos clientes.
SELECT NOME, CIDADE, EMAIL
FROM cliente;

-- 3. Liste os nomes das cidades sem repetir valores.
SELECT DISTINCT CIDADE
FROM cliente;

-- 4. Liste todos os produtos em ordem crescente de preço.
SELECT NOME_PRODUTO, PRECO
FROM produto
ORDER BY PRECO ASC;

-- 5. Mostre apenas os 5 produtos mais caros.
SELECT NOME_PRODUTO, PRECO
FROM produto
ORDER BY PRECO DESC
LIMIT 5;

-- PARTE B - FILTROS

-- 6. Liste os produtos com preço entre R$ 8,00 e R$ 15,00.
SELECT NOME_PRODUTO, PRECO
FROM produto
WHERE PRECO BETWEEN 8.00 AND 15.00;

-- 7. Liste os clientes das cidades Limeira ou Americana.
SELECT NOME, CIDADE, ATIVO
FROM cliente
WHERE ATIVO = TRUE
AND (CIDADE = 'Limeira' OR CIDADE = 'Americana');

-- 8. Localize os produtos cujo nome contém a palavra “Café”.
SELECT NOME_PRODUTO 
FROM produto
WHERE NOME_PRODUTO LIKE 'CAFÉ%';

-- 9. Liste os clientes que não informaram telefone.
SELECT NOME, TELEFONE
FROM cliente
WHERE TELEFONE IS NULL;

-- 10. Mostre os pedidos FINALIZADOS com valor acima de R$ 20,00,
--     do maior para o menor valor.


-- PARTE C - CÁLCULOS E AGRUPAMENTOS

-- 11. Informe quantos produtos estão cadastrados.
SELECT COUNT(*) AS TOTAL_PRODUTOS
FROM produto;

-- 12. Mostre menor preço, maior preço e preço médio dos produtos.
SELECT MIN(PRECO) AS MENORES_PRECOS,
        MAX(PRECO) AS MAIORES_PRECOS,
        AVG(PRECO) AS MEDIA_PRECOS
FROM produto;

-- 13. Informe quantos clientes existem em cada cidade.
SELECT CIDADE,
        COUNT(*) AS QUANTIDADE_CLIENTES
FROM cliente
GROUP BY CIDADE;

-- 14. Mostre somente as cidades que possuem dois ou mais clientes.
SELECT CIDADE,
        COUNT(*) AS QUANTIDADE_CLIENTES
FROM cliente
WHERE NOT ID_CLIENTE <= 2
GROUP BY CIDADE;

-- 15. Calcule o faturamento total considerando apenas pedidos FINALIZADOS.