import express, { Request, Response } from 'express';
import { registerProduct, getAllProducts, deleteProduct } from '../controllers/productController';
import { getSupplierById, updateSupplier } from '../service/supplierService';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        await registerProduct(req, res);
    } catch (error) {
        console.error("Erro ao registrar produto:", error);
        res.status(500).json({ message: 'Erro ao registrar produto', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteProduct(id);
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        res.status(500).json({ message: 'Erro ao excluir produto', error });
    }
});

export default router;