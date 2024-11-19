import Button from '@/components/ui/button';
import { useEffect, useState } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';
import CardButtonFunction from '@/components/ui/card-button-func';
import axios from 'axios';

interface IProductProps {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    imagem: string;
    fornecedorId: number;
}

interface ISupplierProps {
    id: number;
    nome: string;
    cnpj: string;
    contato: string;
    endereco: string;
}

function ProductList() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<IProductProps[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplierProps[]>([]);
    const [formData, setFormData] = useState<Omit<IProductProps, 'id'>>({
        nome: '',
        descricao: '',
        preco: 0,
        quantidade: 0,
        imagem: '',
        fornecedorId: 0,
    });
    
    const [filterNome, setFilterNome] = useState('');
    const [filterSupplier, setFilterSupplier] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                setError('Formato inválido de dados do servidor.');
            }
        } catch (err) {
            setError('Erro ao carregar produtos.');
        } finally {
            setLoading(false);
        }
    };

    const getIdSuppliers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/api/suppliers');
            if (Array.isArray(response.data)) {
                setSuppliers(response.data);
            } else {
                setError('Formato inválido de dados do servidor.');
            }
        } catch (err) {
            console.error("Erro de requisição:", err);
            setError('Erro ao carregar fornecedores.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getIdSuppliers();
        fetchProducts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'preco' || name === 'quantidade' ? Number(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/api/products/register', formData);
            fetchProducts();
            setFormData({
                nome: '',
                descricao: '',
                preco: 0,
                quantidade: 0,
                imagem: '',
                fornecedorId: 0,
            });
        } catch (err) {
            setError('Erro ao criar produto. Verifique os dados.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/delete/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    const handleFilterNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterNome(e.target.value);
    };

    const handleFilterSupplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterSupplier(e.target.value);
    };

    useEffect(() => {
        document.body.classList.add('product-page');
        return () => {
            document.body.classList.remove('product-page');
        };
    }, []);

    const filteredProducts = products.filter(product => {
        const supplier = suppliers.find(sup => sup.id === product.fornecedorId);
        const matchesNome = product.nome.toLowerCase().includes(filterNome.toLowerCase());
        const matchesSupplier = supplier ? supplier.nome.toLowerCase().includes(filterSupplier.toLowerCase()) : false;
        return matchesNome && matchesSupplier;
    });

    return (
        <>
            <header><TopBar /></header>

            <div id="main-box">
                <div id="supplier-cards">
                    <div id="box-h1">
                        <h1>Produtos</h1>
                        <div className="filter-box">
                            <Input
                                color={1}
                                labelColor={1}
                                type="text"
                                placeholder="Buscar por nome"
                                label="Filtrar por Nome"
                                name="filterNome"
                                value={filterNome}
                                onChange={handleFilterNomeChange}
                            />
                            <Input
                                color={1}
                                labelColor={1}
                                type="text"
                                placeholder="Buscar por fornecedor"
                                label="Filtrar por Fornecedor"
                                name="filterSupplier"
                                value={filterSupplier}
                                onChange={handleFilterSupplierChange}
                            />
                        </div>
                    </div>

                    {loading && <p>Carregando...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => {
                            if (!product || !product.nome) {
                                return null;
                            }

                            const supplier = suppliers.find(sup => sup.id === product.fornecedorId);

                            return (
                                <div key={product.id} className="supplier-card">
                                    <div id="info-supp-card">
                                        <h3>{product.nome}</h3>
                                        <p>Fornecedor: {supplier ? supplier.nome : 'Desconhecido'}</p>
                                        <p>Descrição: {product.descricao}</p>
                                        <p>Preço: R$ {product.preco}</p>
                                        <p>Quantidade: {product.quantidade}</p>
                                    </div>
                                    <div id="div-button-functions">
                                        <CardButtonFunction
                                            type={1}
                                            objectId={Number(product.id)}
                                            onDelete={handleDelete}
                                            reference="produtos"
                                        />
                                        <CardButtonFunction
                                            type={2}
                                            objectId={Number(product.id)}
                                            onDelete={handleDelete}
                                            reference="produtos"
                                        />
                                        <CardButtonFunction
                                            type={3}
                                            objectId={Number(product.id)}
                                            onDelete={handleDelete}
                                            reference="produtos"
                                        />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Nenhum produto cadastrado.</p>
                    )}
                </div>

                <div id="info-box">
                    <form onSubmit={handleSubmit}>
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="Nome do produto"
                            label="Nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                        />
                        <div id="supplier-select">
                            <label htmlFor="supplier">Fornecedor</label>
                            <select
                                className="product-page__input"
                                name="fornecedorId"
                                value={formData.fornecedorId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value={0}>Selecione o fornecedor</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="Descrição do produto"
                            label="Descrição"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="number"
                            placeholder="Preço do produto"
                            label="Preço"
                            name="preco"
                            min={0}
                            value={formData.preco}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="number"
                            placeholder="Quantidade do produto"
                            label="Quantidade"
                            name="quantidade"
                            min={0}
                            value={formData.quantidade}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="URL da imagem do produto"
                            label="Imagem"
                            name="imagem"
                            value={formData.imagem}
                            onChange={handleInputChange}
                        />
                        <Button color={1} text="Criar Produto" type="submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductList;
