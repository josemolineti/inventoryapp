import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { getPrecoProduto, isQuantidadeMenor } from '../service/orderItemService';
import { subtrairValor } from '../service/orderService';

const db = new sqlite3.Database('./server/src/database/database.db');

export const registerOrderItem = async (req: Request, res: Response) => {
    const { pedidoId, produtoId, quantidade } = req.body;
    console.log("Dados recebidos no body:", req.body);

    if (
        !pedidoId ||
        typeof produtoId !== 'number' ||
        typeof quantidade !== 'number'
    ) {
        return res.status(400).json({
            message: 'Campos inválidos. Verifique os dados enviados.',
            fields: { pedidoId, produtoId, quantidade },
        });
    }

    try {
        const quantidadeEmEstoque = await isQuantidadeMenor(produtoId);
        const estoqueAtual = quantidadeEmEstoque?.quantidade || 0;

        if (quantidade > estoqueAtual) {
            return res.status(400).json({
                message: 'Estoque insuficiente.',
                detalhes: {
                    estoqueAtual,
                    quantidadeSolicitada: quantidade,
                },
            });
        }

        const precoProduto = await getPrecoProduto(produtoId);
        const precoUnitario = precoProduto?.preco || 0;

        if (precoUnitario === 0) {
            return res.status(404).json({
                message: 'Produto não encontrado ou preço inválido.',
                detalhes: { produtoId },
            });
        }

        const novoPrecoUnitario = quantidade * precoUnitario;

        const query = `INSERT INTO itemPedido (pedidoId, produtoId, quantidade, precoUnitario) VALUES (?, ?, ?, ?)`;
        db.run(query, [pedidoId, produtoId, quantidade, novoPrecoUnitario], function (err) {
            if (err) {
                console.error("Erro ao registrar item do pedido no banco: ", err.message);
                return res.status(500).json({
                    message: 'Erro ao registrar item do pedido',
                    detalhes: { erro: err.message },
                });
            }

            const queryTotal = `UPDATE pedido SET total = total + ? WHERE id = ?`;
            db.run(queryTotal, [novoPrecoUnitario, pedidoId], function (err) {
                if (err) {
                    console.error("Erro ao atualizar total do pedido: ", err.message);
                    return res.status(500).json({
                        message: 'Erro ao atualizar total do pedido',
                        detalhes: { erro: err.message },
                    });
                }

                res.status(201).json({
                    message: 'Item do pedido registrado com sucesso',
                    order: {
                        id: this.lastID,
                        pedidoId,
                        produtoId,
                        quantidade,
                        precoUnitario: novoPrecoUnitario,
                    },
                });
            });
        });
    } catch (error) {
        console.error("Erro ao processar a requisição: ", error);

        if (error instanceof Error) {
            return res.status(500).json({
                message: 'Erro interno no servidor',
                detalhes: { erro: error.message },
            });
        }

        res.status(500).json({
            message: 'Erro interno no servidor',
            detalhes: { erro: 'Erro desconhecido' },
        });
    }
};




export const getAllOrdersItens = (id: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM itemPedido WHERE pedidoId = ?';
        db.all(query, [id], (err, rows) => {
            if (err) {
                console.error("Erro no banco de dados ", err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};


export const deleteOrderItem = async (id: string, objectId: string) => {
    try {
        await subtrairValor(id, objectId);

        const query = 'DELETE FROM itemPedido WHERE id = ?';
        return new Promise<void>((resolve, reject) => {
            db.run(query, [id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    } catch (error) {
        console.error("Erro ao excluir item do pedido:", error);
        throw error;
    }
};
