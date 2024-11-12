import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../database/db'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { createUser, findUserByEmail } from '../service/userService';

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { nome, email, senha, isAdmin } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email já registrado" });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const user = await createUser(nome, email, hashedPassword, isAdmin);

        console.log('usuario registrado:', user);

        return res.status(201).json({ message: "Usuário registrado com sucesso", user });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao registrar usuário", error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido', token, nome: user.nome, isAdmin: user.isAdmin });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


export const changePassword = async (req: Request, res: Response) => {
    const { email, newPassword } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        db.run('UPDATE usuario SET senha = ? WHERE email = ?', [hashPassword, email], (err) => {
            if (err) {
                console.log('Erro ao atualizar a senha:', err);
                return res.status(500).json({ message: 'Erro ao alterar a senha', error: err.message });
            }

            console.log('Senha alterada com sucesso');
            return res.status(200).json({ message: 'Senha alterada com sucesso' });
        });
    } catch (error: any) {
        console.error('Erro ao processar a requisição:', error.message);
        return res.status(500).json({ message: 'Erro ao processar a requisição', error: error.message });
    }
};
