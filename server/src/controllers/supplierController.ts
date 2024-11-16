import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { updateSupplier } from '../service/supplierService';

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
            res.status(500).json({ message: 'Erro ao registrar fornecedor', error: err.message });
        } else {
            res.status(201).json({
                message: 'Fornecedor registrado com sucesso',
                supplier: {
                    id: this.lastID,
                    nome,
                    cnpj,
                    contato,
                    endereco,
                },
            });
        }
    });
};

export const updateSupplierController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, cnpj, contato, endereco } = req.body;

    try {
        const updatedSupplier = await updateSupplier(id, nome, cnpj, contato, endereco);
        res.status(200).json({ message: 'Fornecedor atualizado com sucesso', supplier: updatedSupplier });
    } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
    }
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
