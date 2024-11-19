import express, { Request, Response, NextFunction } from 'express';
import { registerOrderItem, getAllOrdersItens, deleteOrderItem } from '../controllers/orderItemController';
import { getOrderItemById, updateOrderItem } from '../service/orderItemService';
import { getOrderStatus, setStatusOk } from '../service/orderService';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const ordersItems = await getAllOrdersItens(id);
        res.json(ordersItems);
    } catch (error) {
        console.error('Erro ao buscar itens do pedido ', error);
        res.status(500).json({ error: 'Erro ao buscar itens do pedido' });
    }
});


router.post('/register', async (req: Request, res: Response) => {
    try {
        await registerOrderItem(req, res);
    } catch (error) {
        console.error("Erro ao registrar item do pedido:", error);
        res.status(500).json({ message: 'Erro ao registrar item  pedido', error });
    }
});

router.delete('/delete/:id/:objectId', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const objectId = req.params.objectId;
        await deleteOrderItem(id, objectId);
        res.status(200).json({ message: 'Item do Pedido excluído com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir Item do Pedido ", error);
        res.status(500).json({ error: 'Erro ao excluir Item do Pedido.' });
    }
});

router.get('/getOrderStatus/:objectId', async (req: Request, res: Response) => {
    try {
        const objectId = req.params.objectId;
        const status = await getOrderStatus(objectId);

        if (status && status.status) {
            res.status(200).json({ status: status.status });
        } else {
            res.status(404).json({ error: 'Status não encontrado' });
        }
    } catch (error) {
        console.error("Erro ao puxar status pedido", error);
        res.status(500).json({ error: 'Erro ao puxar status do pedido' });
    }
});

router.post('/setOrderOk/:objectId', async (req: Request, res: Response) => {
    try {
        const objectId = req.params.objectId;
        await setStatusOk(objectId);
        res.status(200).json({ message: 'Status do pedido atualizado ' });
    } catch (error) {
        console.error("Erro ao alterar status do pedido", error);
        res.status(500).json({ error: 'Erro ao alterar status do pedido' });
    }
});



export default router;

function reject(err: any) {
    throw new Error('Function not implemented.');
}
