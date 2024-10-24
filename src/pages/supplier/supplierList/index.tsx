import Button from '@/components/ui/button';
import { useState } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';

interface Supplier {
    name: string;
    phone: string;
    address: string;
}

function SupplierList() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [formData, setFormData] = useState<Supplier>({
        name: '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSuppliers([...suppliers, formData]);
        setFormData({
            name: '',
            phone: '',
            address: ''
        });
    };

    return (
        <>
            <header>
                <TopBar />
            </header>
            <div id='main-box'>
                <div id='supplier-cards'>
                    {suppliers.map((supplier, index) => (
                        <div key={index} className="supplier-card">
                            <div id='info-supp-card'>
                                <h3>{supplier.name}</h3>
                                <p>Telefone: {supplier.phone}</p>
                                <p>Endereço: {supplier.address}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div id='info-box'>
                    <form onSubmit={handleSubmit}>
                        <Input
                            color={2}
                            labelColor={2}
                            type='text'
                            placeholder='Nome do fornecedor'
                            label='Nome'
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type='tel'
                            placeholder='Telefone do fornecedor'
                            label='Telefone'
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type='text'
                            placeholder='Endereço do fornecedor'
                            label='Endereço'
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                        <Button color={2} text='Limpar' type="reset" />
                        <Button color={1} text='Criar Fornecedor' type="submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default SupplierList;
