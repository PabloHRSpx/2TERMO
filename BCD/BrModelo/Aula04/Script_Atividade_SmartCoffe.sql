-- COMANDOS PARA CRIAR BANCO DE DADOS
create database ESCOLA_PABLO;

create database ESCOLA_PABLO2;

-- COMANDOS PARA APAGAR BANCO DE DADOS
drop database ESCOLA_PABLO;

-- COMANDO PARA ATIVAR BANCO DE DADOS
use ESCOLA_PABLO;

-- MOSTRAR TABELAS NO BANCO DE DADOS
show tables;

-- COMANDO PARA CRIAR TABELAS
create table Cliente (
Id_Clientes int auto_increment primary key,
nome varchar (50) not null,
Data_de_Nascimento varchar (12) not null,
Endereco varchar(25),
CPF varchar (15) not null,
Telefone varchar (20)
);

create table Produtos (
Id_Produtos int primary key auto_increment,
Peso varchar (10) not null,
Valor varchar (10) not null,
Nome varchar (25) not null,
Marca varchar (25),
Quantidade int not null
);

create table Funcionarios (
Id_Funcionarios int primary key auto_increment,
Nome varchar (50) not null,
Função varchar (25) not null,
Idade int not null,
carga_horaria datetime not null,
Quantidade int not null
);

-- COAMANDOS PARA ALTERAR INFORMAÇÕES

-- ADICIONAR UM NOVO ATRIBUTO
alter table Produtos add Id_Produtos int primary key auto_increment;

-- ALTERNAR O TIPO DE DADOS E TAMANHO DO ATRIBUTO
alter table Produtos modify Id_Produtos int primary key auto_increment;

-- RENOMEAR O NOME O ATRIBUTO
-- alter table Produtos change Id_Produtos int primary key auto_increment;

-- RENOMEAR TABELAS
alter table Produtos rename to Produtos;

-- EXCLUIR ATRIBUTO
alter table Produtos drop  column Nome;