import Button from '@/components/ui/button';
import { useState } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';
import CardButtonFunction from '@/components/ui/card-button-func';

interface ICustomerProps {
    id: string;
    name: string;
    phone: string;
    cpf_cnpj: string;
    address: string;
}

function customerList() {
    const [idCounter, setIdCounter] = useState(1);
    const [customers, setCustomers] = useState<ICustomerProps[]>([]);
    const [formData, setFormData] = useState<Omit<ICustomerProps, 'id'>>({
        name: '',
        phone: '',
        cpf_cnpj: '',
        address: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSupplier = { id: idCounter.toString(), ...formData };
        setCustomers([...customers, newSupplier]);
        setIdCounter(idCounter + 1);
        setFormData({
            name: '',
            phone: '',
            cpf_cnpj: '',
            address: ''
        });
    };

    const handleDelete = (id: string) => {
        setCustomers(customers.filter(customer => customer.id !== id));
    };

    return (
        <>
            <header><TopBar /></header>

            <div id="main-box">
                <div id="supplier-cards">
                    <div id="box-h1">
                        <h1>Clientes</h1>
                    </div>
                    {customers.map((customer) => (
                        <div key={customer.id} className="supplier-card">
                            <div id="info-supp-card">
                                <h3>{customer.name}</h3>
                                <p>Telefone: {customer.phone}</p>
                                <p>CPF/CNPJ: {customer.cpf_cnpj}</p>
                                <p>Endereço: {customer.address}</p>
                            </div>
                            <div id="div-button-functions">
                                <CardButtonFunction type={1} objectId={customer.id} onDelete={handleDelete} reference='clientes' />
                                <CardButtonFunction type={2} objectId={customer.id} onDelete={() => { }} reference='clientes' />
                                <CardButtonFunction type={3} objectId={customer.id} onDelete={handleDelete} reference='clientes' />
                            </div>
                        </div>
                    ))}
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
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="CPF/CNPJ do cliente"
                            label="CPF"
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
    )
}

export default customerList;