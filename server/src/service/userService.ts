import db from '../database/db';

export const findUserByEmail = (email: string) => {
    return new Promise<any>((resolve, reject) => {
        console.log("email:", email);
        db.get("SELECT * FROM usuario WHERE email = ?", [email], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};


export const createUser = (nome: string, email: string, senha: string) => {
    return new Promise<any>((resolve, reject) => {
        const query = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
        db.run(query, [nome, email, senha], function (err) {
            if (err) {
                console.error('erro ao inserir usuario:', err);
                reject(err);
            } else {
                console.log('usuario inserido:', { id: this.lastID, nome, email });
                resolve({ id: this.lastID, nome, email });
            }
        });
    });
};




