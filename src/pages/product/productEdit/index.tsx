import { useEffect, useState } from 'react'
import TopBar from "@/components/ui/top-bar";
import '@/styles/supplier_style.css';
import Input from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button';
import axios from 'axios';

interface IProductProps {
    id: string;
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

function ProductEdit() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const objectIdFromUrl = searchParams.get('objectId');
    const [suppliers, setSuppliers] = useState<ISupplierProps[]>([]);

    const navigate = useNavigate();
    const objectId = objectIdFromUrl || sessionStorage.getItem('objectId') || '';

    useEffect(() => {
        document.body.classList.add('supplier-edit');

        return () => {
            document.body.classList.remove('supplier-edit');
        };
    }, []);

    useEffect(() => {
        if (objectIdFromUrl) {
            sessionStorage.setItem('objectId', objectIdFromUrl);
        }
    }, [objectIdFromUrl]);

    

    const [formData, setFormData] = useState<Omit<IProductProps, 'id'>>({
        nome: '',
        descricao: '',
        preco: 0,
        quantidade: 0,
        imagem: '',
        fornecedorId: 0
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSupplierId = async (id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/products/${id}`);
            if (response.data) {
                setFormData({
                    nome: response.data.nome,
                    descricao: response.data.descricao,
                    preco: response.data.preco,
                    quantidade: response.data.quantidade,
                    imagem: response.data.imagem,
                    fornecedorId: response.data.fornecedorId
                });
            } else {
                setError('Produto não encontrado');
            }
        } catch (err) {
            console.error('Erro ao carregar produto:', err);
            setError('Erro ao carregar produto');
        } finally {
            setLoading(false);
        }

    };

    const getIdSuppliers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/suppliers');
            if (Array.isArray(response.data)) {
                setSuppliers(response.data);
            } else {
                setError('Formato inválido de dados do servidor.');
            }
        } catch (err) {
            setError('Erro ao carregar fornecedores.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (objectId) {
            fetchSupplierId(objectId);
            getIdSuppliers();
        } else {
            setError("ID do produto não encontrado.");
        }
    }, [objectId]);

    useEffect(() => {
        console.log('Suppliers:', suppliers);
    }, [suppliers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'preco' || name === 'quantidade' ? Number(value) : value,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setError(null);
        try {
            const response = await axios.put(`http://localhost:3000/api/products/${objectId}`, formData);
            if (response.status === 200) {
                navigate('/produtos');
            } else {
                setError('Erro ao atualizar produto');
            }
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
            setError('Erro ao atualizar produto');
        }
    };

    useEffect(() => {
        document.body.classList.add('product-page');
        return () => {
            document.body.classList.remove('product-page');
        };
    }, []);

    useEffect(() => {
        document.body.classList.add('product-edit');
        return () => {
            document.body.classList.remove('product-edit');
        };
    }, []);

    return (
        <>
            <header>
                <TopBar />
            </header>
            <div id="main-box">
                <div id="form-box">

                    <form action="">
                        <h1>Editar produto {objectId}</h1>
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder='Digite o nome'
                            type='text'
                            label='Nome'
                            name='nome'
                            value={formData.nome}
                            onChange={handleChange}

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
                            color={1}
                            labelColor={1}
                            placeholder='Digite a descrição'
                            type='text'
                            label='Descrição'
                            name='descricao'
                            value={formData.descricao}
                            onChange={handleChange}

                        />

                        <Input
                            color={1}
                            labelColor={1}
                            placeholder='Digite o preço'
                            type='number'
                            label='Preço'
                            name='preco'
                            min={0}
                            value={formData.preco}
                            onChange={handleChange}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder='Digite a quantidade'
                            type='number'
                            label='Quantidade'
                            name='quantidade'
                            min={0}
                            value={formData.quantidade}
                            onChange={handleChange}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder='Digite a URL da imagem'
                            type='text'
                            label='Imagem'
                            name='imagem'
                            value={formData.imagem}
                            onChange={handleChange}
                        />

                    </form>
                </div>


                <div id="info-box">
                    <Button color={3} type='back' text='Cancelar' onClick={() => navigate('/produtos')} />
                    <Button
                        color={1}
                        type='button'
                        text='Salvar'
                        onClick={handleSubmit}
                    />
                </div>


                {loading && <p>Carregando...</p>}
                {error && <p>{error}</p>}
            </div>
        </>
    )
}

export default ProductEdit; 