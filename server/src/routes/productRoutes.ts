import express, { Request, Response } from 'express';
import { registerProduct, getAllProducts, deleteProduct } from '../controllers/productController';
import { getProductById, updateProduct } from '../service/productService';


const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        await registerProduct(req, res);
    } catch (error) {
        console.error("Erro ao registrar produto:", error);
        res.status(500).json({ message: 'Erro ao registrar produto', error });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const product = await getProductById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: 'Erro ao buscar produto' });
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

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade, imagem, fornecedorId } = req.body;

    if (!id || !nome || !descricao || !preco || !quantidade || !imagem || !fornecedorId) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
    }

    try {
        const result = await updateProduct(id, nome, descricao, preco, quantidade, imagem, fornecedorId);
        if (result) {
            res.status(200).json({ message: 'Produto atualizado com sucesso.' });
        } else {
            res.status(404).json({ error: 'Produto não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar produto.' });
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
