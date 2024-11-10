import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar no banco de dados', err);
    } else {
        console.log('Conectado ao banco de dados SQLite');

        const createTables = `
      CREATE TABLE IF NOT EXISTS fornecedor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cnpj TEXT NOT NULL,
        contato TEXT,
        endereco TEXT
      );

      CREATE TABLE IF NOT EXISTS produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco REAL NOT NULL,
        quantidade INTEGER NOT NULL,
        imagem TEXT,
        fornecedorId INTEGER,
        FOREIGN KEY (fornecedorId) REFERENCES fornecedor(id)
      );

      CREATE TABLE IF NOT EXISTS cliente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cpf_cnpj TEXT NOT NULL,
        contato TEXT,
        endereco TEXT
      );

      CREATE TABLE IF NOT EXISTS pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        clienteId INTEGER,
        status TEXT NOT NULL,
        total REAL NOT NULL,
        FOREIGN KEY (clienteId) REFERENCES cliente(id)
      );

      CREATE TABLE IF NOT EXISTS itemPedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedidoId INTEGER,
        produtoId INTEGER,
        quantidade INTEGER NOT NULL,
        precoUnitario REAL NOT NULL,
        FOREIGN KEY (pedidoId) REFERENCES pedido(id),
        FOREIGN KEY (produtoId) REFERENCES produto(id)
      );

      CREATE TABLE IF NOT EXISTS transacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        tipo TEXT NOT NULL,
        valor REAL NOT NULL,
        produtoId INTEGER,
        pedidoId INTEGER,
        FOREIGN KEY (produtoId) REFERENCES produto(id),
        FOREIGN KEY (pedidoId) REFERENCES pedido(id)
      );

      CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL
      );
    `;

        db.exec(createTables, (err) => {
            if (err) {
                console.error('Erro ao criar as tabelas:', err);
            } else {
                console.log('Tabelas criadas com sucesso!');
            }
        });
    }
});

export default db;
