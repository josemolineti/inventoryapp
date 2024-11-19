import express, { Request, Response } from 'express';
import { registerCustomer, getAllCustomers, deleteCustomer } from '../controllers/customerController';
import { getCustomerById, updateCustomer } from '../service/customerService';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        await registerCustomer(req, res);
    } catch (error) {
        console.error("Erro ao registrar cliente:", error);
        res.status(500).json({ message: 'Erro ao registrar cliente', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    console.log("Chamando getAllCustomers");
    try {
        const customers = await getAllCustomers();
        res.json(customers);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const customers = await getCustomerById(id);
        if (customers) {
            res.json(customers);
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, contato, cpf_cnpj, endereco } = req.body;

    if (!id || !nome || !contato || !cpf_cnpj || !endereco) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
    }

    try {
        const result = await updateCustomer(id, nome, contato, cpf_cnpj, endereco);
        if (result) {
            res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
        } else {
            res.status(404).json({ error: 'Cliente não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar cliente.' });
    }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteCustomer(id);
        res.status(200).json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        res.status(500).json({ message: 'Erro ao excluir cliente', error });
    }
});

export default router;
