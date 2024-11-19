import express, { Request, Response, NextFunction } from 'express';
import { registerOrder, getAllOrders, deleteOrder } from '../controllers/orderController';
import { getOrderById, updateOrder } from '../service/orderService';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        await registerOrder(req, res);
    } catch (error) {
        console.error("Erro ao registrar pedido:", error);
        res.status(500).json({ message: 'Erro ao registrar pedido', error });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const product = await getOrderById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar pedido ', error);
        res.status(500).json({ error: 'Erro ao buscar pedido' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error('Erro ao buscar pedidos ', error);
        res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { data, clienteId, status, total } = req.body;

    console.log("Dados recebidos no backend: ", { data, clienteId, status, total });

    if (!data || !clienteId || !status || total <= 0) {
        console.log("Erro no backend: Todos os campos são obrigatórios e total deve ser maior que zero.");
        res.status(400).json({ message: 'Todos os campos são obrigatórios e total deve ser maior que zero.' });
        return;
    }

    try {
        const changes = await updateOrder(id, data, clienteId, status, total);
        if (changes) {
            res.status(200).json({ message: 'Pedido atualizado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Pedido não encontrado.' });
        }
    } catch (error: unknown) {
        const err = error as Error;
        console.error("Erro ao atualizar pedido no backend:", err.message);
        res.status(500).json({ message: 'Erro ao atualizar pedido', error: err.message });
    }
});




router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteOrder(id);
        res.status(200).json({ message: 'Pedido excluído com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir pedido ", error);
        res.status(500).json({ error: 'Erro ao excluir pedido.' });
    }
});

export default router;
