import Button from '@/components/ui/button';
import { useState, useEffect } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';
import CardButtonFunction from '@/components/ui/card-button-func';
import axios from 'axios';

interface ISupplierProps {
    id: number;
    nome: string;
    cnpj: string;
    contato: string;
    endereco: string;
}

function SupplierList() {
    const [suppliers, setSuppliers] = useState<ISupplierProps[]>([]);
    const [formData, setFormData] = useState<Omit<ISupplierProps, 'id'>>({
        nome: '',
        contato: '',
        cnpj: '',
        endereco: ''
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSuppliers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/suppliers');
            if (Array.isArray(response.data)) {
                setSuppliers(response.data);
            } else {
                setError('formato invalido');
            }
        } catch (err) {
            setError('Erro ao carregar fornecedores');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    useEffect(() => {
        console.log(suppliers);
    }, [suppliers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/suppliers/register', formData);

            if (response.data && response.data.supplier) {
                setSuppliers([...suppliers, response.data.supplier]);
            } else {
                setError('Erro ao adicionar fornecedor');
            }

            setFormData({
                nome: '',
                contato: '',
                cnpj: '',
                endereco: '',
            });
        } catch (error) {
            setError('Erro ao adicionar fornecedor');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            // Corrigindo a URL para incluir a porta correta no axios.delete
            await axios.delete(`http://localhost:3000/api/suppliers/delete/${id}`);
            setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
        } catch (error) {
            setError("Erro ao excluir fornecedor");
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
                        <h1>Fornecedores</h1>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    {loading ? (
                        <p>Carregando fornecedores...</p>
                    ) : (
                        <>
                            {
                                suppliers.length > 0 ? (
                                    suppliers.map((supplier) => (
                                        <div key={supplier.id} className="supplier-card">
                                            <div id="info-supp-card">
                                                <h3>{supplier.nome}</h3>
                                                <p>Telefone: {supplier.contato}</p>
                                                <p>CNPJ: {supplier.cnpj}</p>
                                                <p>Endereço: {supplier.endereco}</p>
                                            </div>
                                            <div id="div-button-functions">
                                                <CardButtonFunction
                                                    type={1}
                                                    objectId={supplier.id}
                                                    onDelete={handleDelete}
                                                    reference="fornecedores"
                                                />
                                                <CardButtonFunction
                                                    type={2}
                                                    objectId={supplier.id}
                                                    onDelete={() => { }}
                                                    reference="fornecedores"
                                                />
                                                <CardButtonFunction
                                                    type={3}
                                                    objectId={supplier.id}
                                                    onDelete={handleDelete}
                                                    reference="fornecedores"
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Não há fornecedores cadastrados.</p>
                                )
                            }

                        </>
                    )}
                </div>

                <div id="info-box">
                    <form onSubmit={handleSubmit}>
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="Nome do fornecedor"
                            label="Nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="tel"
                            placeholder="Telefone do fornecedor"
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
                            placeholder="CNPJ do fornecedor"
                            label="CNPJ"
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="Endereço do fornecedor"
                            label="Endereço"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleInputChange}
                            required
                        />
                        <Button color={1} text="Criar Fornecedor" type="submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default SupplierList;
