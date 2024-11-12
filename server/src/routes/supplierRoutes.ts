import express from 'express';
import { registerSupplier, getAllSuppliers, deleteSupplier } from '../controllers/supplierController';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const response = await registerSupplier(req, res);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar fornecedor', error });
    }
});

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



router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteSupplier(id);
        res.status(200).json({ message: 'Fornecedor excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir fornecedor', error });
    }
});

export default router;
