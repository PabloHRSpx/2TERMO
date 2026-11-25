-- Active: 1794917650052@@127.0.0.1@3306@projeto_assistencia_tecnica
DROP DATABASE projeto_assistencia_tecnica;
-- Criação do Banco de Dados 
CREATE DATABASE IF NOT EXISTS projeto_assistencia_tecnica;
USE projeto_assistencia_tecnica;




CREATE TABLE clientes (
    id_clientes INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(60) NOT NULL,


    CONSTRAINT pk_clientes PRIMARY KEY (id_clientes),
    CONSTRAINT uq_clientes_email UNIQUE (email),
    CONSTRAINT uq_clientes_telefone UNIQUE (telefone),
    CONSTRAINT uq_clientes_cpf UNIQUE (cpf)
);


CREATE TABLE tecnicos (
    id_tecnicos INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    turno VARCHAR(20) NOT NULL,
    setor VARCHAR(60),
    especialidade VARCHAR(40) NOT NULL,
    status VARCHAR(15) NOT NULL DEFAULT 'ATIVO',


    CONSTRAINT pk_tecnicos PRIMARY KEY (id_tecnicos),
    CONSTRAINT chk_tecnicos_status CHECK (status IN ('ATIVO', 'INATIVO'))
);


CREATE TABLE pecas (
    id_pecas INT AUTO_INCREMENT,
    descricao_pecas VARCHAR(120) NOT NULL,
    fabricante VARCHAR(60),
    valor_peca DECIMAL(10,2) NOT NULL,
    quantidade_estoque INT NOT NULL DEFAULT 0,


    CONSTRAINT pk_pecas PRIMARY KEY (id_pecas),
    CONSTRAINT chk_pecas_estoque CHECK (quantidade_estoque >= 0)
);




CREATE TABLE equipamentos (
    id_equipamentos INT AUTO_INCREMENT,
    tipo VARCHAR(100) NOT NULL,
    numero_serie VARCHAR(60) NOT NULL,
    marca VARCHAR(60),
    modelo VARCHAR(60) NOT NULL,
    estado_entrada VARCHAR(60),
    id_clientes INT NOT NULL,


    CONSTRAINT pk_equipamentos PRIMARY KEY (id_equipamentos),
    CONSTRAINT uq_equipamentos_serie UNIQUE (numero_serie),
    CONSTRAINT fk_equipamentos_clientes FOREIGN KEY (id_clientes) REFERENCES clientes(id_clientes)
);


CREATE TABLE chamados (
    id_chamados INT AUTO_INCREMENT,
    data_atendimento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    defeito_relatado VARCHAR(120) NOT NULL,
    diagnostico VARCHAR(120),
    valor_servico DECIMAL(10,2) DEFAULT 0.00,
    status_chamados VARCHAR(20) NOT NULL DEFAULT 'ABERTO',
    id_equipamentos INT NOT NULL,
    id_tecnicos INT,


    CONSTRAINT pk_chamados PRIMARY KEY (id_chamados),
    CONSTRAINT chk_chamados_status CHECK (status_chamados IN ('ABERTO', 'EM_ATENDIMENTO', 'FINALIZADO')),
    CONSTRAINT fk_chamados_equipamentos FOREIGN KEY (id_equipamentos) REFERENCES equipamentos(id_equipamentos),
    CONSTRAINT fk_chamados_tecnicos FOREIGN KEY (id_tecnicos) REFERENCES tecnicos(id_tecnicos)
);




CREATE TABLE chamados_pecas (
    id_chamados INT NOT NULL,
    id_pecas INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    valor_unitario DECIMAL(10,2) NOT NULL,


    CONSTRAINT pk_chamados_pecas PRIMARY KEY (id_chamados, id_pecas),
    CONSTRAINT chk_chamados_pecas_qtd CHECK (quantidade > 0),
    CONSTRAINT fk_cp_chamados FOREIGN KEY (id_chamados) REFERENCES chamados(id_chamados),
    CONSTRAINT fk_cp_pecas FOREIGN KEY (id_pecas) REFERENCES pecas(id_pecas)
);


SHOW TABLES;


-- DML


INSERT INTO clientes (nome, email, telefone, cpf) VALUES
('Laura C', 'laura.c@gmail.com', '123456789', 632636284628462),
('Leonardo', 'leonardo@gmail.com', '987654321', 2387397293),
('Pablo', 'pablo@gmail.com', '555555555', 2636634468736426),
('Sophie', 'sophie@gmail.com', '111111111', 8173274723749827);






INSERT INTO tecnicos (nome, turno, setor, especialidade, status) VALUES
('Laura', 'Tarde', 'Atendimento ao Cliente', 'Recuperação de Dados', 'ativo'),
('Pablo', 'Manhã', 'Manutenção', 'Microsoldagem', 'ativo'),
('Sophie', 'Noite', 'Manutenção', 'Infraestrutura e Redes', 'ativo'),
('Livia', 'Tarde', 'Controle de Qualidade', 'Segurança de Dados', 'ativo'),
('Leonardo', 'Noite', 'Estoque e Compra', 'Assistência Técnica Autorizada', 'ativo');




INSERT INTO pecas (descricao_pecas, fabricante, valor_peca, quantidade_estoque) VALUES
('Placa', 'Micron', 1000, 3652),
('Parafuso', 'PINGOOD', 85, 5631),
('Bateria', 'BYD ', 420, 2568),
('Compressor', 'Forward', 330, 413),
('Carcaça', 'ZAGG', 900, 1559),
('Sensores', 'Bosch Sensortec', 99.90, 5614);


INSERT INTO equipamentos (tipo, numero_serie, marca, modelo, estado_entrada) VALUES
('Placa Principal','156', 'Micron', 'ABERTO'),
('Parafuso Phillips','164','PINGOOD', 'ABERTO'),
('Baterias íon de lítio e polímero de lítio','147', 'BYD ', 'ABERTO'),
('Compressor Bomba de Ar Portátil Interphone','129','Forward', 'ABERTO'),
('Carcaça Tampa traseira e Aro lateral', '136', 'ZAGG', 'ABERTO'),
('Sensores Acelerômetro, Giroscópio, Magnetômetro, Barômetro', '171','Bosch Sensortec', 'ABERTO');


INSERT INTO chamados (data_atendimento, defeito_relatado, diagnostico, valor_servico, status_chamados) VALUES
('2026-09-24', 'Trava na tela inicial', NULL, 100.89, 'ABERTO'),
('2026-07-16', 'Demora no carregamento e ocorreu o estufamento da bateria', NULL, 800.40, 'ABERTO'),
('2026-08-17', NULL, NULL, 900, 'ABERTO'),
('2026-07-18', 'Dificuldade de Navegação na WEB e demora na abertura de abas', 'Vírus Dectadado e será feita formatação no computador', 300.40, 'ABERTO'),
('2026-08-18', NULL, NULL, 1020.45, 'ABERTO'),
('2026-11-18', NULL, NULL, 250.60, 'ABERTO');


-- DQL

-- SELEÇÃO DA TABELA CLIENTES.
SELECT * FROM clientes;

-- SELEÇÃO DE INFORMAÇÕES ESPECIFICAS DA TABELA CLIENTE.
SELECT nome, email FROM clientes;

-- SELEÇÃO DE INFORMAÇÕES ESPECIFICAS SOBRE UMA CONDIÇÃO.
SELECT nome, setor
from tecnicos
where turno = 'Tarde';

-- SELEÇÃO DE INFORMAÇÕES DE SETOR ESPECIFICO E TURNOS.
SELECT nome, turno, setor
FROM tecnicos
WHERE setor = 'Manutenção'
AND (turno = 'Manhã' OR turno = 'Noite');

-- SELEÇÃO DE INFORMAÇÕES ENTRE PREÇOS.
SELECT descricao_peca, valor_peca
FROM pecas
WHERE valor_peca BETWEEN 0 AND 420;

--SELEÇÃO DE INFORMAÇÕES QUE NÃO CONTEM ESSES FABRICANTES.
SELECT descricao_peca, fabricante
FROM pecas
WHERE fabricante NOT IN('BYD', 'Forward');

-- SELECIONA A PALAVRA PESQUISADA NA TABELA.
SELECT tipo, numero_serie, marca, modelo, estado_entrada
FROM equipamentos
WHERE tipo LIKE '%Placa Principal%';

--SELECIONA A TABELA E DEIXA EM CRESCENTE.
SELECT tipo, numero_serie
FROM equipamentos
ORDER BY numero_serie ASC;

--DEMONSTRA A QUANTIDADE DE CHAMADAS ABERTAS.
SELECT SUM(status_chamados) AS CHAMADAS
FROM chamados
WHERE status_chamados = 'ABERTO';

-- SELECIONA NA TABELA AS DATAS DOS CHAMADOS E DEMONSTRA VALOR.
SELECT id_chamados, data_atendimento, valor_servico
FROM chamados
WHERE data_atendimento BETWEEN '2026-07-16' AND '2026-08-18';