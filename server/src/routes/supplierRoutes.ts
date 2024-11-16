import express, { Request, Response } from 'express';
import { registerSupplier, getAllSuppliers, deleteSupplier } from '../controllers/supplierController';
import { getSupplierById, updateSupplier } from '../service/supplierService';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        await registerSupplier(req, res);
    } catch (error) {
        console.error("Erro ao registrar fornecedor:", error);
        res.status(500).json({ message: 'Erro ao registrar fornecedor', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    console.log("Chamando getAllSuppliers");
    try {
        const suppliers = await getAllSuppliers();
        res.json(suppliers);
    } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
        res.status(500).json({ error: 'Erro ao buscar fornecedores' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const supplier = await getSupplierById(id);
        if (supplier) {
            res.json(supplier);
        } else {
            res.status(404).json({ error: 'Fornecedor não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar fornecedor:', error);
        res.status(500).json({ error: 'Erro ao buscar fornecedor' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, contato, cnpj, endereco } = req.body;

    if (!id || !nome || !contato || !cnpj || !endereco) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
    }

    try {
        const result = await updateSupplier(id, nome, contato, cnpj, endereco);
        if (result) {
            res.status(200).json({ message: 'Fornecedor atualizado com sucesso.' });
        } else {
            res.status(404).json({ error: 'Fornecedor não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        res.status(500).json({ error: 'Erro ao atualizar fornecedor.' });
    }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteSupplier(id);
        res.status(200).json({ message: 'Fornecedor excluído com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
        res.status(500).json({ message: 'Erro ao excluir fornecedor', error });
    }
});

export default router;
