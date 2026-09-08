-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE fornecedores (
ID_fornecedores int primary key auto_increment PRIMARY KEY,
razao_social varchar (100)
)

CREATE TABLE produtos (
ID_produtos int primary key auto_increment PRIMARY KEY,
nome_produto varchar (100)
)

CREATE TABLE item_produto (
ID_produtos int Unique,
ID_fornecedores int Unique,
quantidade int not null,
observacao text (300),
ID_item int auto_increment primary key PRIMARY KEY,
FOREIGN KEY(ID_produtos) REFERENCES produtos (ID_produtos)/*falha: chave estrangeira*/
)

