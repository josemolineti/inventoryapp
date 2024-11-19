import db from '../database/db';

export const getOrderById = (id: string) => {
    return new Promise<any>((resolve, reject) => {
        db.get("SELECT * FROM pedido WHERE id = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
};

export const updateOrder = async (
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


export const subtrairValor = (id: string, objectId: string) => {
    return new Promise<void>((resolve, reject) => {
        db.get("SELECT precoUnitario FROM itemPedido WHERE id = ?", [id], (err, row: { precoUnitario: number }) => {
            if (err) {
                reject(err);
            } else if (!row || typeof row.precoUnitario === 'undefined') {
                reject("Item do pedido não encontrado ou preço unitário inválido.");
            } else {
                const precoUnitario = row.precoUnitario;

                db.get("SELECT total FROM pedido WHERE id = ?", [objectId], (err, rowPedido: { total: number }) => {
                    if (err) {
                        reject(err);
                    } else if (!rowPedido || typeof rowPedido.total === 'undefined') {
                        reject("Pedido não encontrado ou total inválido.");
                    } else {
                        let totalPedido = rowPedido.total;
                        totalPedido -= precoUnitario;

                        db.run("UPDATE pedido SET total = ? WHERE id = ?", [totalPedido, objectId], function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                if (this.changes === 0) {
                                    reject("Pedido não encontrado para atualização.");
                                } else {
                                    resolve();
                                }
                            }
                        });
                    }
                });
            }
        });
    });
};


export const getOrderStatus = (objectId: string) => {
    return new Promise<any>((resolve, reject) => {
        db.get("SELECT status FROM pedido WHERE id = ?", [objectId], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });

}

export const setStatusOk = (objectId: string) => {
    return new Promise<any>((resolve, reject) => {
        const query = "UPDATE pedido SET status = ? WHERE id = ?";
        db.run(query, ["Concluido", objectId], function (err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    reject("Pedido não encontrado para atualização");
                } 
            }
        });
    });
}