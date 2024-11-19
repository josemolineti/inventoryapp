import db from '../database/db';

export const getOrderItemById = (id: string) => {
    return new Promise<any>((resolve, reject) => {
        db.get("SELECT * FROM pedido WHERE id = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
};

export const updateOrderItem = async (
    id: string,
    data: string,
    clienteId: number,
    status: string,
    total: number
): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        const query = "UPDATE pedido SET data = ?, clienteId = ?, status = ?, total = ? WHERE id = ?";
        db.run(query, [data, clienteId, status, total, id], function (err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    reject("Pedido não encontrado para atualização.");
                } else {
                    resolve({ id, data, clienteId, status, total });
                }
            }
        });
    });
};


export const getPrecoProduto = (produtoId: number) => {
    return new Promise<any>((resolve, reject) => {
        db.get("SELECT preco FROM produto WHERE id = ?", [produtoId], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

export const isQuantidadeMenor = (produtoId: number) => {
    return new Promise<any>((resolve, reject) => {
        db.get("SELECT quantidade FROM produto WHERE id = ?", [produtoId], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

