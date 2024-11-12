import db from '../database/db';

export const findSupplierByCnpj = async (cnpj: string) => {
  return new Promise<any>((resolve, reject) => {
    db.get("SELECT * FROM fornecedor WHERE cnpj = ?", [cnpj], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};


const createSupplier = (req, res) => {
  const { name, contact } = req.body;

  db.run(`INSERT INTO suppliers (name, contact) VALUES (?, ?)`, [name, contact], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ id: this.lastID, name, contact });
  });
};


export const updateSupplierInDb = (id: string, nome: string, cnpj: string, contato: string, endereco: string) => {
  return new Promise<any>((resolve, reject) => {
    const query = "UPDATE fornecedor SET nome = ?, cnpj = ?, contato = ?, endereco = ? WHERE id = ?";
    db.run(query, [nome, cnpj, contato, endereco, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id, nome, cnpj, contato, endereco });
      }
    });
  });
};

export const deleteSupplierInDb = (id: string) => {
  return new Promise<any>((resolve, reject) => {
    const query = "DELETE FROM fornecedor WHERE id = ?";
    db.run(query, [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Fornecedor excluído com sucesso" });
      }
    });
  });
};

export const getSuppliersFromDb = () => {
  return new Promise<any[]>((resolve, reject) => {
    db.all("SELECT * FROM fornecedor", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};