import db from '../database/db';

export const getProductById = (id: string) => {
    return new Promise<any>((resolve, reject) => {
      db.get("SELECT * FROM produto WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err); 
        }
        resolve(row); 
      });
    });
  };

export const updateProduct = async (id: string, nome: string, descricao: string, preco: number, quantidade: number, imagem: string, fornecedorId: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        const query = "UPDATE produto SET nome = ?, descricao = ?, preco = ?, quantidade = ?, imagem = ?, fornecedorId = ? WHERE id = ?";
        db.run(query, [nome, descricao, preco, quantidade, imagem, fornecedorId, id], function (err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    reject("Produto não encontrado para atualização.");
                } else {
                    resolve({ id, nome, descricao, preco, quantidade, imagem, fornecedorId });
                }
            }
        });
    });
};