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
SELECT ID_PEDIDO, DATA_PEDIDO, VALOR_TOTAL
FROM pedido
WHERE STATUS_PEDIDO = 'Finalizado' AND VALOR_TOTAL > 20.00
ORDER BY VALOR_TOTAL DESC;

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
SELECT SUM(VALOR_TOTAL) AS Faturamento_Total
FROM pedido
WHERE STATUS_PEDIDO = 'Finalizado';

-- PARTE D - RELACIONAMENTOS

-- 16. Liste cada pedido exibindo id, data, nome do cliente, status e valor total.
SELECT P.ID_PEDIDO, P.DATA_PEDIDO, P.STATUS_PEDIDO, C.NOME AS cliente, P.VALOR_TOTAL
FROM pedido AS P
INNER JOIN cliente AS C
ON C.ID_CLIENTE = P.ID_CLIENTE

-- 17. Liste cada produto acompanhado do nome de sua categoria.
SELECT PR.NOME_PRODUTO AS PRODUTO, CA.NOME_CATEGORIA AS CATEGORIA
FROM PRODUTO AS PR
INNER JOIN CATEGORIA AS CA
ON CA.ID_CATEGORIA = PR.ID_CATEGORIA
ORDER BY CA.NOME_CATEGORIA, PR.NOME_PRODUTO

-- 18. Gere um relatório dos itens vendidos: pedido, produto, quantidade,
--     preço unitário e subtotal.
SELECT P.ID_PEDIDO, C.NOME AS CLIENTE, PR.NOME_PRODUTO AS PRODUTO, IP.QUANTIDADE, IP.PRECO_UNITARIO, IP.QUANTIDADE * IP.PRECO_UNITARIO AS SUBTOTAL
FROM PEDIDO AS P
INNER JOIN CLIENTE AS C 
ON C.ID_CLIENTE = P.ID_CLIENTE
INNER JOIN ITEM_PEDIDO AS IP
ON IP.ID_PEDIDO = P.ID_PEDIDO
INNER JOIN PRODUTO AS PR 
ON PR.ID_PRODUTO = IP.ID_PRODUTO
ORDER BY P.ID_PEDIDO

-- 19. Mostre todos os clientes, inclusive aqueles que nunca fizeram pedidos.
SELECT C.NOME, P.ID_PEDIDO, P.DATA_PEDIDO
FROM CLIENTE AS C 
LEFT JOIN PEDIDO AS P 
ON C.ID_CLIENTE = P.ID_CLIENTE
ORDER BY C.NOME;

-- 20. Liste apenas os clientes que nunca fizeram pedidos.
SELECT C.ID_CLIENTE, C.NOME 
FROM CLIENTE AS C 
LEFT JOIN PEDIDO AS P
ON P.ID_CLIENTE = C.ID_CLIENTE
WHERE P.ID_PEDIDO IS NULL;


-- PARTE E - DESAFIO GERENCIAL

-- 21. Informe quantos pedidos FINALIZADOS cada cliente realizou e quanto
--     cada cliente gastou. Ordene do maior gasto para o menor.
SELECT C.NOME AS CLIENTE, COUNT(P.ID_PEDIDO) AS QTDE_PEDIDO, SUM(P.VALOR_TOTAL) AS TOTAL_COMPRADO
FROM CLIENTE AS C 
INNER JOIN PEDIDO AS P 
ON P.ID_CLIENTE = C.ID_CLIENTE
WHERE P.STATUS_PEDIDO = 'FINALIZADO'
GROUP BY C.ID_CLIENTE, C.NOME
ORDER BY TOTAL_COMPRADO DESC;

-- 22. Mostre a quantidade de produtos e o preço médio de cada categoria.
SELECT CA.NOME_CATEGORIA AS CATEGORIA, COUNT(PR.ID_PRODUTO) AS QTDE_PRODUTOS, AVG(PR.PRECO) AS MEDIA_PRECO
FROM CATEGORIA AS CA
LEFT JOIN PRODUTO AS PR
ON CA.ID_CATEGORIA = PR.ID_CATEGORIA
GROUP BY CA.NOME_CATEGORIA;

-- 23. Descubra quais produtos possuem preço superior ao preço médio geral.
SELECT NOME_PRODUTO, PRECO
FROM PRODUTO
WHERE PRECO > (SELECT AVG(PRECO) FROM PRODUTO)

-- 24. Classifique os produtos como Econômico, Intermediário ou Premium.
--     Defina e informe suas faixas de preço.
SELECT NOME_PRODUTO, PRECO,
CASE 
WHEN PRECO < 8.00 THEN 'Economico'
WHEN PRECO < 15.00 THEN 'Intermediario'
ELSE 'Premium'
END AS CLASSIFICAÇÃO_PRECOS
FROM produto
ORDER BY PRECO;

-- 25. CONSULTA AUTORAL
-- Pergunta de negócio:
--
-- Por que essa informação é útil?