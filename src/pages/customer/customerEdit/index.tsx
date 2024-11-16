import { useEffect, useState } from 'react';
import TopBar from "@/components/ui/top-bar";
import '@/styles/supplier_style.css';
import Input from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/ui/button';
import axios from 'axios';

interface ICustomerProps {
    id: number;
    nome: string;
    cpf_cnpj: string;
    contato: string;
    endereco: string;
}

function CustomerEdit() {
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

    const [formData, setFormData] = useState<Omit<ICustomerProps, 'id'>>({
        nome: '',
        contato: '',
        cpf_cnpj: '',
        endereco: ''
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomerById = async (id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/customers/${id}`);
            if (response.data) {
                setFormData({
                    nome: response.data.nome,
                    cpf_cnpj: response.data.cpf_cnpj,
                    contato: response.data.contato,
                    endereco: response.data.endereco,
                });
            } else {
                setError('Cliente não encontrado');
            }
        } catch (err) {
            console.error('Erro ao carregar cliente:', err);
            setError('Erro ao carregar cliente');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (objectId) {
            fetchCustomerById(objectId);
        } else {
            setError("ID do cliente não encontrado.");
        }
    }, [objectId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setError(null);
        try {
            const response = await axios.put(`http://localhost:3000/api/customers/${objectId}`, formData);
            if (response.status === 200) {
                navigate('/clientes');
            } else {
                setError('Erro ao atualizar cliente');
            }
        } catch (err) {
            console.error('Erro ao atualizar cliente:', err);
            setError('Erro ao atualizar cliente');
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
                        <h1>Editar cliente {objectId}</h1>
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder="Digite o nome"
                            type="text"
                            label="Nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder="Digite o telefone"
                            type="tel"
                            label="Telefone"
                            name="contato"
                            value={formData.contato}
                            onChange={handleChange}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder="Digite o CPF/CNPJ"
                            type="text"
                            label="CPF/CNPJ"
                            name="cpf_cnpj"
                            value={formData.cpf_cnpj}
                            onChange={handleChange}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder="Digite o endereço"
                            type="text"
                            label="Endereço"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                        />
                    </form>
                </div>

                <div id="info-box">
                    <Button color={3} type="back" text="Cancelar" onClick={() => navigate('/clientes')} />
                    <Button color={1} type="button" text="Salvar" onClick={handleSubmit} />
                </div>

                {loading && <p>Carregando...</p>}
                {error && <p>{error}</p>}
            </div>
        </>
    );
}

export default CustomerEdit;
