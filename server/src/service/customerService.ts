import db from '../database/db';
import { Request, Response } from 'express';


export const findCustomerByCpfCnpj = async (cpf_cnpj: string) => {
  return new Promise<any>((resolve, reject) => {
    db.get("SELECT * FROM cliente WHERE cpf_cnpj = ?", [cpf_cnpj], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const getCustomerById = (id: string) => {
  return new Promise<any>((resolve, reject) => {
    db.get("SELECT * FROM cliente WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err); 
      }
      resolve(row); 
    });
  });
};


export const updateCustomer = async (id: string, nome: string, cpf_cnpj: string, contato: string, endereco: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const query = "UPDATE cliente SET nome = ?, cpf_cnpj = ?, contato = ?, endereco = ? WHERE id = ?";
    db.run(query, [nome, cpf_cnpj, contato, endereco, id], function (err) {
      if (err) {
        reject(err);
      } else {
        if (this.changes === 0) {
          reject("Cliente não encontrado para atualização.");
        } else {
          resolve({ id, nome, cpf_cnpj, contato, endereco });
        }
      }
    });
  });
};




export const deleteCustomerInDb = (id: string) => {
  return new Promise<any>((resolve, reject) => {
    const query = "DELETE FROM cliente WHERE id = ?";
    db.run(query, [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Cliente excluído com sucesso" });
      }
    });
  });
};

export const getCustomerFromDb = () => {
  return new Promise<any[]>((resolve, reject) => {
    db.all("SELECT * FROM cliente", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};