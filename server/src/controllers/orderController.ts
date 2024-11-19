import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { updateSupplier } from '../service/supplierService';

const db = new sqlite3.Database('./server/src/database/database.db');

export const registerOrder = (req: Request, res: Response) => {
    const { data, clienteId, status, total } = req.body;
    console.log("Dados recebidos no backend:", req.body);

    if (
        !data ||
        typeof clienteId !== 'number' ||
        typeof status !== 'string' ||
        typeof total !== 'number'
    ) {
        return res.status(400).json({ message: 'Campos inválidos ou ausentes' });
    }


    const query = `INSERT INTO pedido (data, clienteId, status, total) VALUES (?, ?, ?, ?)`;

    db.run(query, [data, clienteId, status, total], function (err) {
        if (err) {
            console.error("Erro ao registrar pedido no banco:", err.message);
            return res.status(500).json({
                message: 'Erro ao registrar pedido no banco de dados',
                error: err.message,
            });
        }

        res.status(201).json({
            message: 'Pedido registrado com sucesso',
            order: {
                id: this.lastID,
                data, clienteId, status, total,
            },
        });
    });

};

export const getAllOrders = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM pedido';
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error("Erro no banco de dados ", err);
                return reject(err);
            }
            console.log("Pedidos carregados:", rows);
            resolve(rows);
        });
    });
};

export const deleteOrder = (id: string) => {
    const query = 'DELETE FROM pedido WHERE id = ?';
    return new Promise<void>((resolve, reject) => {
        db.run(query, [id], function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};