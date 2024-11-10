import Button from '@/components/ui/button';
import { useState } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';
import CardButtonFunction from '@/components/ui/card-button-func';

interface IOrderProps {
    id: string;
    product: string;
    supplier: string;
    quantity: number;
}

function orderList() {
    const [idCounter, setIdCounter] = useState(1);
    const [orders, setOrders] = useState<IOrderProps[]>([]);
    const [formData, setFormData] = useState<Omit<IOrderProps, 'id'>>({
        product: '',
        supplier: '',
        quantity: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProduct = { id: idCounter.toString(), ...formData };
        setOrders([...orders, newProduct]);
        setIdCounter(idCounter + 1);
        setFormData({
            product: '',
            supplier: '',
            quantity: 0,
        });
    };

    const handleDelete = (id: string) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    return (
        <>
            <header><TopBar /></header>

            <div id="main-box">
                <div id="supplier-cards">
                    <div id="box-h1">
                        <h1>Pedidos</h1>
                    </div>
                    {orders.map((order) => (
                        <div key={order.id} className="supplier-card">
                            <div id="info-supp-card">
                                <h3>{order.supplier}</h3>
                                <p>Descrição: {order.product}</p>
                                <p>Preço: R$ {order.quantity}</p>
                            </div>
                            <div id="div-button-functions">
                                <CardButtonFunction type={1} objectId={order.id} onDelete={handleDelete} reference='pedidos' />
                                <CardButtonFunction type={2} objectId={order.id} onDelete={() => { }} reference='pedidos' />
                                <CardButtonFunction type={3} objectId={order.id} onDelete={handleDelete} reference='pedidos' />
                            </div>
                        </div>
                    ))}
                </div>

                <div id="info-box">
                    <form onSubmit={handleSubmit}>
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="Selecione o fornecedor"
                            label="Fornecedor"
                            name="name"
                            value={formData.supplier}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="tel"
                            placeholder="Selecione o produto"
                            label="Produto"
                            name="description"
                            value={formData.product}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="number"
                            placeholder="Digite a quantidade"
                            label="Quantidade"
                            name="price"
                            min={0}
                            value={formData.quantity}
                            onChange={handleInputChange}
                            required
                        />
                        <Button color={1} text="Criar Pedido" type="submit" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default orderList;