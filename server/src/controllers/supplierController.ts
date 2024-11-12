import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./server/src/database/database.db');

export const registerSupplier = (req: Request, res: Response) => {
    const { nome, cnpj, contato, endereco } = req.body;

    if (!nome || !cnpj || !contato || !endereco) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const query = `INSERT INTO fornecedor (nome, cnpj, contato, endereco) VALUES (?, ?, ?, ?)`;

    db.run(query, [nome, cnpj, contato, endereco], function (err) {
        if (err) {
            console.error("Erro ao registrar fornecedor:", err);
            return res.status(500).json({ message: 'Erro ao registrar fornecedor', error: err.message });
        }

        return res.status(201).json({
            message: 'Fornecedor registrado com sucesso',
            supplier: {
                id: this.lastID,
                nome,
                cnpj,
                contato,
                endereco
            }
        });
    });
};




export const addSupplier = (req: Request, res: Response) => {
    const { nome, cnpj, contato, endereco } = req.body;

    const query = 'INSERT INTO suppliers (nome, cnpj, contato, endereco) VALUES (?, ?, ?, ?)';
    db.run(query, [nome, cnpj, contato, endereco], function (err) {
        if (err) {
            console.error("Erro ao adicionar fornecedor:", err);
            return res.status(500).json({ error: 'Erro ao adicionar fornecedor', details: err.message });
        }

        return res.status(201).json({
            id: this.lastID,
            nome,
            cnpj,
            contato,
            endereco,
        });
    });
};


export const getAllSuppliers = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM fornecedor';
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error("Erro no banco de dados:", err);
                return reject(err);
            }
            console.log("Fornecedores carregados:", rows);
            resolve(rows);
        });
    });
};


export const deleteSupplier = (id: string) => {
    const query = 'DELETE FROM fornecedor WHERE id = ?';
    return new Promise<void>((resolve, reject) => {
        db.run(query, [id], function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
