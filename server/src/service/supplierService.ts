import db from '../database/db';
import { Supplier } from '../models/Supplier';

export const createFornecedor = (supplier: Supplier) => {
  const { name, cnpj, phone, address } = supplier;
  const query = `INSERT INTO fornecedores (name, cnpj, phone, address) VALUES (?, ?, ?, ?)`;

  db.run(query, [name, cnpj, phone, address], (err) => {
    if (err) {
      console.error("Erro ao adicionar fornecedor:", err);
    } else {
      console.log("Fornecedor adicionado com sucesso!");
    }
  });
};

export const updateSupplier = (supplier: Supplier) => {
  const { id, name, cnpj, phone, address } = supplier;
  const query = `UPDATE fornecedores SET name = ?, cnpj = ?, phone = ?, address = ? WHERE id = ?`;

  db.run(query, [name, cnpj, phone, address, id], (err) => {
    if (err) {
      console.error("Erro ao atualizar fornecedor", err);
    } else {
      console.log("Fornecedor atualizado com sucesso");
    }
  });
};

export const getAllSuppliers = (callback: (supplier: Supplier[]) => void) => {
  const query = `SELECT * FROM fornecedores`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar fornecedores", err);
    } else {
      //callback(rows);
    }
  });
};
