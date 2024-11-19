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
    const [status, setStatus] = useState<string | null>(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const objectIdFromUrl = searchParams.get('objectId');
    const navigate = useNavigate();
    const objectId = objectIdFromUrl || sessionStorage.getItem('objectId') || '';
    const [formData, setFormData] = useState<Omit<IOrderItemProps, 'id'>>({
        pedidoId: objectId ? Number(objectId) : 0,
        produtoId: 0,
        quantidade: 0,
        precoUnitario: 0
    });

    const fetchOrderItens = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3000/api/orderItem/${objectId}`);
            if (Array.isArray(response.data)) {
                setOrderItens(response.data);
            } else {
                setError('Formato inválido de dados do servidor.');
            }
        } catch (err) {
            setError('Erro ao carregar os itens do pedido');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsSelect = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.error('Formato inválido de dados do servidor.');
            }
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
        }
    };

    const fetchOrderStatus = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/orderItem/getOrderStatus/${objectId}`);

            const status = response.data?.status || 'Status não encontrado';
            setStatus(status);
        } catch (error) {
            setError('Erro ao buscar status do pedido');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProductsSelect();
        fetchOrderItens();
        fetchOrderStatus();

    }, []);

    useEffect(() => {
        if (products.length > 0 && formData.produtoId === 0) {
            setFormData((prevData) => ({
                ...prevData,
                produtoId: products[0].id,
            }));
        }
    }, [products]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' || name === 'produtoId' || name === 'quantidade'
                ? Number(value)
                : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (status == "Pendente") {
            e.preventDefault();
            setLoading(true);
            setError(null);

            try {
                await axios.post('http://localhost:3000/api/orderItem/register', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                fetchOrderItens();
                setFormData({
                    pedidoId: objectId ? Number(objectId) : 0,
                    produtoId: 0,
                    quantidade: 0,
                    precoUnitario: 0
                });

            } catch (err) {
                setError('Erro ao criar item do produto. Verifique os dados.');
            } finally {
                setLoading(false);
            }
        } else {
            alert("O pedido já foi finalizado!!!!!!!")
            fetchOrderItens();
            setFormData({
                pedidoId: objectId ? Number(objectId) : 0,
                produtoId: 0,
                quantidade: 0,
                precoUnitario: 0
            });
        }
    };

    const handleDelete = async (id: number) => {
        if (status == "Pendente") {
            try {
                await axios.delete(`http://localhost:3000/api/orderItem/delete/${id}/${objectId}`);
                fetchOrderItens();
            } catch (error) {
                console.error('Erro ao deletar item pedido:', error);
            }
        } else {
            alert("O pedido ja foi finalizado!!!!!!!")
        }
    };

    const handleFinalizarPedido = async () => {
        if (status === "Pendente") {
          const confirm = window.confirm("Tem certeza que deseja finalizar seu pedido?");
          if (confirm) {
            try {
              await axios.post(`http://localhost:3000/api/orderItem/setOrderOk/${objectId}`);
              alert("Pedido concluído com sucesso");
              console.log("Navegando para /pedidos");
              navigate("/pedidos", { replace: true });
            } catch (error) {
              console.error("Erro ao finalizar pedido", error);
              alert("Erro ao concluir o pedido. Tente novamente.");
            }
          }
        } else {
          alert("O pedido já foi fechado!!!!");
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
                        <h1>Adicionar Item para o pedido {objectId} - Status: {status}</h1>


                    </div>

                    {loading && <p>Carregando...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {orderItens.length > 0 ? (
                        orderItens.map((orderItem) => {
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
                        <p>Nenhum item cadastrado para o pedido {objectId}</p>
                    )}
                </div>

                <div id="info-box">
                    <form onSubmit={handleSubmit}>
                        <div id="supplier-select">
                            <label htmlFor="produtoId">Produtos</label>
                            <select
                                className="product-page__input"
                                name="produtoId"
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
                                min={0}
                                value={formData.quantidade}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button color={3} text="Volter" type="back" />
                        <Button color={1} text="Criar Item Pedido" type="submit" />
                        <Button color={1} text="Finalizar Pedido" type="button" onClick={handleFinalizarPedido} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default OrderView;
