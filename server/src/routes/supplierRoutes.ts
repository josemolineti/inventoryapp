import express from 'express';
import { registerSupplier, getAllSuppliers, deleteSupplier } from '../controllers/supplierController';

const router = express.Router();

// Rota para registrar um fornecedor
router.post('/register', async (req, res) => {
    try {
        await registerSupplier(req, res);
    } catch (error) {
        console.error("Erro ao registrar fornecedor:", error);
        res.status(500).json({ message: 'Erro ao registrar fornecedor', error });
    }
});

// Rota para obter todos os fornecedores
router.get('/', async (req, res) => {
    console.log("Chamando getAllSuppliers");
    try {
        const suppliers = await getAllSuppliers();
        res.json(suppliers);
    } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
        res.status(500).json({ error: 'Erro ao buscar fornecedores' });
    }
});

// Rota para excluir um fornecedor
router.delete('/delete/:id', async (req, res) => {
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
