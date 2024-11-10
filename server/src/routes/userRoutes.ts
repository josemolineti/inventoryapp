import { Router } from 'express';
import { registerUser, loginUser, changePassword } from '../controllers/userController';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        await registerUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
});


router.post('/login', async (req, res) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
});

router.post('/change-password', async (req, res) => {
    try {
        await changePassword(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao alterar a senha', error });
    }
});

export default router;
