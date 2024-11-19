import Button from '@/components/ui/button';
import { useEffect, useState } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';
import CardButtonFunction from '@/components/ui/card-button-func';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

interface IOrderItemProps {
    id: number;
    pedidoId: number;
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
}

interface IProductProps {
    id: number;
    nome: string;
}

function OrderView() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orderItens, setOrderItens] = useState<IOrderItemProps[]>([]);
    const [products, setProducts] = useState<IProductProps[]>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const objectIdFromUrl = searchParams.get('objectId');
    const navigate = useNavigate();
    const objectId = objectIdFromUrl || sessionStorage.getItem('objectId') || '';
    const [formData, setFormData] = useState<Omit<IOrderItemProps, 'id'>>({
        pedidoId: 0,
        produtoId: 0,
        quantidade: 0,
        precoUnitario: 0
    });

    const fetchOrderItens = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:3000/api/orders');
            if (Array.isArray(response.data)) {
                setOrderItens(response.data);
            } else {
                setError('Formato inválido de dados do servidor.');
            }
        } catch (err) {
            setError('Erro ao carregar os pedidos');
        } finally {
            setLoading(false);
        }
    }

    // const fetchClientsSelect = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/api/customers');
    //         if (Array.isArray(response.data)) {
    //             setClients(response.data);
    //         } else {
    //             console.error('Formato inválido de dados do servidor.');
    //         }
    //     } catch (err) {
    //         console.error('Erro ao buscar clientes:', err);
    //     }
    // };

    useEffect(() => {
        //fetchClientsSelect();
        fetchOrderItens();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'produtoId' ? Number(value) : new Date(value),
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        // setLoading(true);
        // setError(null);
        // console.log("Dados enviados:", typeof formData.data);

        // try {
        //     const response = await axios.post('http://localhost:3000/api/orders/register', formData);
        //     fetchOrders();
        //     setFormData({
        //         data: new Date(),
        //         clienteId: 0,
        //         status: 'Pendente',
        //         total: 0
        //     });

        // } catch (err) {
        //     setError('Erro ao criar produto Verifique os dados');
        // } finally {
        //     setLoading(false);
        // }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/orders/delete/${id}`);
            fetchOrderItens();
        } catch (error) {
            console.error("Erro ao deletar item pedido:", error);
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
                        <h1>Adicionar Item para o pedido {objectId}</h1>
                    </div>

                    {loading && <p>Carregando...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {loading && <p>Carregando itens...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {orderItens.length > 0 ? (
                        orderItens.map((orderItem) => {
                            if (!orderItem) {
                                return null;
                            }

                            const product = products.find((product) => product.id === orderItem.produtoId);

                            return (
                                <div key={orderItem.id} className="supplier-card">
                                    <div id="info-supp-card">
                                        <h3>Produto: {product ? product.nome : 'Desconhecido'}</h3>
                                        <p>Quantidade: {orderItem.quantidade}</p>
                                        <p>Preço Unitário: R$ {orderItem.precoUnitario}</p>
                                    </div>
                                    <div id="div-button-functions">
                                        <CardButtonFunction
                                            type={1}
                                            objectId={orderItem.id}
                                            onDelete={handleDelete}
                                            reference="pedidos"
                                        />
                                        <CardButtonFunction
                                            type={2}
                                            objectId={orderItem.id}
                                            onDelete={handleDelete}
                                            view={true}
                                            reference="pedidos"
                                        />
                                        <CardButtonFunction
                                            type={3}
                                            objectId={orderItem.id}
                                            onDelete={handleDelete}
                                            reference="pedidos"
                                        />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Nenhum item cadastrado para o pedido {objectId}.</p>
                    )}

                </div>

                <div id="info-box">
                    <form onSubmit={handleSubmit}>

                        <div id="supplier-select">
                            <label htmlFor="supplier">Produtos</label>
                            <select
                                className="product-page__input"
                                name="clienteId"
                                value={formData.produtoId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value={0}>Selecione o produto</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.nome}
                                    </option>
                                ))}
                            </select>

                            <Input
                                color={2}
                                labelColor={2}
                                type="number"
                                placeholder="Selecione a quantidade"
                                label="Quantidade"
                                name="quantidade"
                                value={formData.quantidade}
                                onChange={handleInputChange}
                                required
                            />

                        </div>


                        <Button color={1} text="Criar Item Pedido" type="submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default OrderView;