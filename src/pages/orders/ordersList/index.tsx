import Button from '@/components/ui/button';
import { useEffect, useState } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';
import CardButtonFunction from '@/components/ui/card-button-func';
import axios from 'axios';

interface IOrderProps {
    id: number;
    data: Date;
    clienteId: number;
    status: string;
    total: number;
}

interface IClientProps {
    id: number;
    nome: string;
}

function OrderList() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orders, setOrders] = useState<IOrderProps[]>([]);
    const [clients, setClients] = useState<IClientProps[]>([]);
    const [formData, setFormData] = useState<Omit<IOrderProps, 'id'>>({
        data: new Date(),
        clienteId: 0,
        status: 'Pendente',
        total: 0
    });
    const [filterDataStart, setFilterDataStart] = useState<string>('');
    const [filterDataEnd, setFilterDataEnd] = useState<string>('');
    const [filterCustomer, setFilterCustomer] = useState<string>('');
    const [filteredOrders, setFilteredOrders] = useState<IOrderProps[]>([]);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:3000/api/orders');
            if (Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                setError('Formato inválido de dados do servidor.');
            }
        } catch (err) {
            setError('Erro ao carregar os pedidos');
        } finally {
            setLoading(false);
        }
    }

    const fetchClientsSelect = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/customers');
            if (Array.isArray(response.data)) {
                setClients(response.data);
            } else {
                console.error('Formato inválido de dados do servidor.');
            }
        } catch (err) {
            console.error('Erro ao buscar clientes:', err);
        }
    };

    useEffect(() => {
        fetchClientsSelect();
        fetchOrders();
    }, []);

    useEffect(() => {
        const filtered = orders.filter((order) => {
            const client = clients.find((client) => client.id === order.clienteId);
            const clientName = client ? client.nome : '';

            return (
                (filterCustomer === '' || clientName.toLowerCase().includes(filterCustomer.toLowerCase())) &&
                (filterDataStart === '' || new Date(order.data) >= new Date(filterDataStart)) &&
                (filterDataEnd === '' || new Date(order.data) <= new Date(filterDataEnd))
            );
        });

        setFilteredOrders(filtered);
    }, [filterDataStart, filterDataEnd, filterCustomer, orders, clients]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'clienteId' ? Number(value) : new Date(value),
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/api/orders/register', formData);
            fetchOrders();
            setFormData({
                data: new Date(),
                clienteId: 0,
                status: 'Pendente',
                total: 0
            });

        } catch (err) {
            setError('Erro ao criar produto Verifique os dados');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/orders/delete/${id}`);
            fetchOrders();
        } catch (error) {
            console.error("Erro ao deletar pedido:", error);
        }
    };

    return (
        <>
            <header>
                <TopBar />
            </header>

            <div id="main-box">
                <div id="supplier-cards">
                    <div id="box-h1">
                        <h1>Pedidos</h1>
                    </div>
                    <div className="filter-box">
                        <Input
                            color={1}
                            labelColor={1}
                            type="date"
                            placeholder="Buscar data inicial"
                            label="Filtrar por data DE:"
                            name="filterDataStart"
                            value={filterDataStart}
                            onChange={(e) => setFilterDataStart(e.target.value)}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            type="date"
                            placeholder="Buscar data final"
                            label="Filtrar por data ATÉ:"
                            name="filterDataEnd"
                            value={filterDataEnd}
                            onChange={(e) => setFilterDataEnd(e.target.value)}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            type="text"
                            placeholder="Buscar por cliente"
                            label="Filtrar por Cliente"
                            name="filterCustomer"
                            value={filterCustomer}
                            onChange={(e) => setFilterCustomer(e.target.value)}
                        />
                    </div>

                    {loading && <p>Carregando...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => {
                            if (!order) {
                                return null;
                            }

                            const client = clients.find((client) => client.id === order.clienteId);

                            return (
                                <div key={order.id} className="supplier-card">
                                    <div id="info-supp-card">
                                        <h3>Cliente: {client ? client.nome : 'Desconhecido'}</h3>
                                        <p>
                                            Data:{' '}
                                            {new Date(order.data).toLocaleDateString('pt-BR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                        <p>Status: {order.status}</p>
                                        <p>Total: R$ {order.total}</p>
                                    </div>
                                    <div id="div-button-functions">
                                        <CardButtonFunction
                                            type={1}
                                            objectId={order.id}
                                            onDelete={handleDelete}
                                            reference="pedidos"
                                        />
                                        <CardButtonFunction
                                            type={2}
                                            objectId={order.id}
                                            onDelete={handleDelete}
                                            view={true}
                                            reference="pedidos"
                                        />
                                        <CardButtonFunction
                                            type={3}
                                            objectId={order.id}
                                            onDelete={handleDelete}
                                            reference="pedidos"
                                        />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Nenhum pedido encontrado</p>
                    )}
                </div>

                <div id="info-box">
                    <form onSubmit={handleSubmit}>

                        <Input
                            color={2}
                            labelColor={2}
                            type="date"
                            placeholder="Selecione a data"
                            label="Data"
                            name="data"
                            value={formData.data.toISOString().split('T')[0]}
                            onChange={handleInputChange}
                            required
                        />

                        <div id="supplier-select">
                            <label htmlFor="supplier">Cliente</label>
                            <select
                                className="product-page__input"
                                name="clienteId"
                                value={formData.clienteId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value={0}>Selecione o cliente</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button color={1} text="Criar Pedido" type="submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default OrderList;
