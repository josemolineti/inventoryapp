import db from '../database/db';
import { Request, Response } from 'express';


export const findSupplierByCnpj = async (cnpj: string) => {
  return new Promise<any>((resolve, reject) => {
    db.get("SELECT * FROM fornecedor WHERE cnpj = ?", [cnpj], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const getSupplierById = (id: string) => {
  return new Promise<any>((resolve, reject) => {
    db.get("SELECT * FROM fornecedor WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err); 
      }
      resolve(row); 
    });
  });
};

export const updateSupplier = async (id: string, nome: string, cnpj: string, contato: string, endereco: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const query = "UPDATE fornecedor SET nome = ?, cnpj = ?, contato = ?, endereco = ? WHERE id = ?";
    db.run(query, [nome, cnpj, contato, endereco, id], function (err) {
      if (err) {
        reject(err);
      } else {
        if (this.changes === 0) {
          reject("Fornecedor não encontrado para atualização.");
        } else {
          resolve({ id, nome, cnpj, contato, endereco });
        }
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