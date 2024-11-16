import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { updateSupplier } from '../service/supplierService';

const db = new sqlite3.Database('./server/src/database/database.db');

export const registerProduct = (req: Request, res: Response) => {
    const { nome, descricao, preco, quantidade, imagem, fornecedorId } = req.body;

    if (!nome  || !descricao || !preco || !quantidade || !imagem || !fornecedorId) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const query = `INSERT INTO produto (nome, descricao, preco, quantidade, imagem, fornecedorId) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(query, [nome,  descricao, preco, quantidade, imagem, fornecedorId], function (err) {
        if (err) {
            console.error("Erro ao registrar produto:", err);
            res.status(500).json({ message: 'Erro ao registrar produto', error: err.message });
        } else {
            res.status(201).json({
                message: 'Produto registrado com sucesso',
                supplier: {
                    id: this.lastID,
                    nome,  descricao, preco, quantidade, imagem, fornecedorId,
                },
            });
        }
    });
};

export const getAllProducts = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM produto';
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error("Erro no banco de dados ", err);
                return reject(err);
            }
            console.log("Produtos carregados:", rows);
            resolve(rows);
        });
    });
};

export const deleteProduct = (id: string) => {
    const query = 'DELETE FROM produto WHERE id = ?';
    return new Promise<void>((resolve, reject) => {
        db.run(query, [id], function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
