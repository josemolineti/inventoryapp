import { useEffect, useState } from 'react';
import TopBar from "@/components/ui/top-bar";
import '@/styles/supplier_style.css';
import Input from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/ui/button';
import axios from 'axios';

interface IOrderProps {
    id: number;
    data: string;
    clienteId: number;
    status: string;
    total: number;
}

interface IClientProps {
    id: number;
    nome: string;
}

function OrdersEdit() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const objectIdFromUrl = searchParams.get('objectId');

    const navigate = useNavigate();
    const objectId = objectIdFromUrl || sessionStorage.getItem('objectId') || '';

    useEffect(() => {
        if (objectIdFromUrl) {
            sessionStorage.setItem('objectId', objectIdFromUrl);
        }
    }, [objectIdFromUrl]);

    const [formData, setFormData] = useState<Omit<IOrderProps, 'id'>>({
        data: new Date().toISOString().split('T')[0],
        clienteId: 0,
        status: 'Pendente',
        total: 0,
    });

    const [customers, setCustomers] = useState<IClientProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrderById = async (id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/orders/${id}`);
            if (response.data) {
                setFormData({
                    data: new Date(response.data.data).toISOString().split('T')[0],
                    clienteId: response.data.clienteId,
                    status: response.data.status,
                    total: response.data.total,
                });
            } else {
                setError('Pedido não encontrado');
            }
        } catch (err) {
            console.error('Erro ao carregar pedido', err);
            setError('Erro ao carregar pedido');
        } finally {
            setLoading(false);
        }
    };

    const getCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/customers');
            if (Array.isArray(response.data)) {
                setCustomers(response.data);
            } else {
                setError('Formato inválido de dados do servidor.');
            }
        } catch (err) {
            setError('Erro ao carregar clientes.');
        }
    };

    useEffect(() => {
        if (objectId) {
            fetchOrderById(objectId);
            getCustomers();
        } else {
            setError("ID do pedido não encontrado.");
        }
    }, [objectId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'clienteId' ? parseInt(value, 10) : name === 'total' ? parseFloat(value) : value,
        }));
    };
    

    const handleSubmit = async () => {
        setError(null);
    
        console.log("Dados sendo enviados: ", formData);
        console.log("TOTALLL");
        console.log(formData.total)
    
        if (!formData.data || !formData.clienteId || !formData.status) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:3000/api/orders/${objectId}`, formData);
    
            if (response.status === 200) {
                navigate('/pedidos');
            } else {
                setError('Erro ao atualizar Pedido');
            }
        } catch (err: any) {
            console.error('Erro ao atualizar Pedido:', err.response ? err.response.data : err.message);
            setError('Erro ao atualizar Pedido: ' + (err.response ? err.response.data.message : err.message));
        }
    };
    
    

    useEffect(() => {
        document.body.classList.add('supplier-edit');
        return () => {
            document.body.classList.remove('supplier-edit');
        };
    }, []);

    return (
        <>
            <header>
                <TopBar />
            </header>
            <div id="main-box">
                <div id="form-box">
                    <form>
                        <h1>Editar pedido {objectId}</h1>
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder="Digite a Data"
                            type="date"
                            label="Data"
                            name="data"
                            value={formData.data}
                            onChange={handleChange}
                        />

                        <div id="supplier-select">
                            <label htmlFor="customer">Cliente</label>
                            <select
                                className="product-page__input"
                                name="clienteId"
                                value={formData.clienteId}
                                onChange={handleChange}
                                required
                            >
                                <option value={0}>Selecione o cliente</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>

                <div id="info-box">
                    <Button color={3} type="back" text="Cancelar" onClick={() => navigate('/pedidos')} />
                    <Button color={1} type="submit" text="Salvar" onClick={handleSubmit} />
                </div>

                {loading && <p>Carregando...</p>}
                {error && <div className="error-message">{error}</div>}

            </div>
        </>
    );
}

export default OrdersEdit;
