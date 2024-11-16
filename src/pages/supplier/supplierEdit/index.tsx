import { useEffect,  useState } from 'react';
import TopBar from "@/components/ui/top-bar";
import '@/styles/supplier_style.css';
import Input from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/ui/button';
import axios from 'axios';

interface ISupplierProps {
    id: number;
    nome: string;
    cnpj: string;
    contato: string;
    endereco: string;
}

function SupplierEdit() {
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

    const [formData, setFormData] = useState<Omit<ISupplierProps, 'id'>>({
        nome: '',
        contato: '',
        cnpj: '',
        endereco: ''
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSupplierId = async (id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/suppliers/${id}`);
            if (response.data) {
                setFormData({
                    nome: response.data.nome,
                    cnpj: response.data.cnpj,
                    contato: response.data.contato,
                    endereco: response.data.endereco
                });
            } else {
                setError('Fornecedor não encontrado');
            }
        } catch (err) {
            console.error('Erro ao carregar fornecedor:', err);
            setError('Erro ao carregar fornecedor');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (objectId) {
            fetchSupplierId(objectId);
        } else {
            setError("ID do fornecedor não encontrado.");
        }
    }, [objectId]);

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
            const response = await axios.put(`http://localhost:3000/api/suppliers/${objectId}`, formData);
            if (response.status === 200) {
                navigate('/fornecedores');
            } else {
                setError('Erro ao atualizar fornecedor');
            }
        } catch (err) {
            console.error("Erro ao atualizar fornecedor:", err);
            setError('Erro ao atualizar fornecedor');
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
                        <h1>Editar fornecedor {objectId}</h1>
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
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder='Digite o telefone'
                            type='tel'
                            label='Telefone'
                            name='contato'
                            value={formData.contato}
                            onChange={handleChange}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder='Digite o endereco'
                            type='text'
                            label='Endereco'
                            name='endereco'
                            value={formData.endereco}
                            onChange={handleChange}
                        />
                    </form>
                </div>

                <div id="info-box">
                    <Button color={3} type='back' text='Cancelar' onClick={() => navigate('/fornecedores')} />
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
    );
}

export default SupplierEdit;
