import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { updateCustomer } from '../service/customerService';

const db = new sqlite3.Database('./server/src/database/database.db');

export const registerCustomer = (req: Request, res: Response) => {
    console.log("Dados recebidos:", req.body);

    const { nome, cpf_cnpj, contato, endereco } = req.body;

    if (!nome || !cpf_cnpj || !contato || !endereco) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const query = `INSERT INTO cliente (nome, cpf_cnpj, contato, endereco) VALUES (?, ?, ?, ?)`;

    db.run(query, [nome, cpf_cnpj, contato, endereco], function (err) {
        if (err) {
            console.error("Erro ao registrar cliente:", err);
            res.status(500).json({ message: 'Erro ao registrar cliente', error: err.message });
        } else {
            res.status(201).json({
                message: 'Cliente registrado com sucesso',
                customer: {
                    id: this.lastID,
                    name: nome,
                    cpf_cnpj,
                    contato,
                    address: endereco,
                },
            });
        }
    });
};




export const updateCustomerController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, cpf_cnpj, contato, endereco } = req.body;

    try {
        const updatedCustomer = await updateCustomer(id, nome, cpf_cnpj, contato, endereco);
        res.status(200).json({ message: 'Cliente atualizado com sucesso', supplier: updatedCustomer });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};


export const getAllCustomers = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM cliente';
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error("Erro no banco de dados:", err);
                return reject(err);
            }
            console.log("Cliente carregados:", rows);
            resolve(rows);
        });
    });
};


export const deleteCustomer = (id: string) => {
    const query = 'DELETE FROM cliente WHERE id = ?';
    return new Promise<void>((resolve, reject) => {
        db.run(query, [id], function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
