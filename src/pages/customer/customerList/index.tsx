import Button from '@/components/ui/button';
import { useState, useEffect } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';
import CardButtonFunction from '@/components/ui/card-button-func';
import axios from 'axios';

interface ICustomerProps {
    id: number;
    name: string;
    contato: string;
    cpf_cnpj: string;
    address: string;
}

function CustomerList() {
    const [customers, setCustomers] = useState<ICustomerProps[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<ICustomerProps[]>([]);
    const [formData, setFormData] = useState<Omit<ICustomerProps, 'id'>>({
        name: '',
        contato: '',
        cpf_cnpj: '',
        address: ''
    });
    const [searchName, setSearchName] = useState<string>('');
    const [searchCpfCnpj, setSearchCpfCnpj] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/customers');
            console.log("Dados recebidos:", response.data);
            if (Array.isArray(response.data)) {
                const mappedCustomers = response.data.map((customer: any) => ({
                    id: customer.id,
                    name: customer.nome,
                    contato: customer.contato,
                    cpf_cnpj: customer.cpf_cnpj,
                    address: customer.endereco,
                }));
                setCustomers(mappedCustomers);
                setFilteredCustomers(mappedCustomers);
            } else {
                setError('Formato inválido');
            }
        } catch (err) {
            setError('Erro ao carregar clientes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        const filtered = customers.filter(
            (customer) =>
                customer.name.toLowerCase().includes(searchName.toLowerCase()) &&
                customer.cpf_cnpj.includes(searchCpfCnpj)
        );
        setFilteredCustomers(filtered);
    }, [searchName, searchCpfCnpj, customers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const dataToSend = {
                nome: formData.name,
                contato: formData.contato,
                cpf_cnpj: formData.cpf_cnpj,
                endereco: formData.address,
            };

            const response = await axios.post('http://localhost:3000/api/customers/register', dataToSend);

            if (response.data && response.data.customer) {
                setCustomers((prevCustomers) => [...prevCustomers, response.data.customer]);
            } else {
                setError('Erro ao adicionar cliente');
            }

            setFormData({
                name: '',
                contato: '',
                cpf_cnpj: '',
                address: '',
            });
        } catch (error) {
            console.error('Erro ao adicionar cliente:', error);
            setError('Erro ao adicionar cliente');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/customers/delete/${id}`);
            setCustomers(prev => prev.filter(customer => customer.id !== id));
        } catch (error) {
            setError('Erro ao excluir cliente');
        }
    };

    return (
        <>
            <header><TopBar /></header>

            <div id="main-box">
                <div id="supplier-cards">
                    <div id="box-h1">
                        <h1>Clientes</h1>
                        <div className="filter-box">
                            <Input
                                color={1}
                                label="Pesquisar Nome"
                                labelColor={1}
                                type='text'
                                placeholder="Digite o nome"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <Input
                                color={1}
                                label="Pesquisar CPF/CNPJ"
                                placeholder="Digite o CPF/CNPJ"
                                labelColor={1}
                                type='text'
                                value={searchCpfCnpj}
                                onChange={(e) => setSearchCpfCnpj(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    {loading ? (
                        <p>Carregando clientes...</p>
                    ) : (
                        <>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <div key={customer.id} className="supplier-card">
                                        <div id="info-supp-card">
                                            <h3>{customer.name ? customer.name : 'Nome não disponível'}</h3>
                                            <p>Telefone: {customer.contato ? customer.contato : 'Não disponível'}</p>
                                            <p>CPF/CNPJ: {customer.cpf_cnpj ? customer.cpf_cnpj : 'Não disponível'}</p>
                                            <p>Endereço: {customer.address ? customer.address : 'Não disponível'}</p>
                                        </div>
                                        <div id="div-button-functions">
                                            <CardButtonFunction
                                                type={1}
                                                objectId={customer.id}
                                                onDelete={handleDelete}
                                                reference="clientes"
                                            />
                                    
                                            <CardButtonFunction
                                                type={3}
                                                objectId={customer.id}
                                                onDelete={handleDelete}
                                                reference="clientes"
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Não há clientes correspondentes.</p>
                            )}
                        </>
                    )}
                </div>

                <div id="info-box">
                    <form onSubmit={handleSubmit}>
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="Nome do cliente"
                            label="Nome"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="tel"
                            placeholder="Telefone do cliente"
                            label="Telefone"
                            name="contato"
                            value={formData.contato}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="CPF/CNPJ do cliente"
                            label="CPF/CNPJ"
                            name="cpf_cnpj"
                            value={formData.cpf_cnpj}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="Endereço do cliente"
                            label="Endereço"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                        <Button color={1} text="Criar Cliente" type="submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default CustomerList;
