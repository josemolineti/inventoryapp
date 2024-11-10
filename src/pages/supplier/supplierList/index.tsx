import Button from '@/components/ui/button';
import { useState } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';
import CardButtonFunction from '@/components/ui/card-button-func';

interface ISupplierProps {
    id: string;
    name: string;
    cnpj: string;
    phone: string;
    address: string;
}

function SupplierList() {
    const [idCounter, setIdCounter] = useState(1);
    const [suppliers, setSuppliers] = useState<ISupplierProps[]>([]);
    const [formData, setFormData] = useState<Omit<ISupplierProps, 'id'>>({
        name: '',
        phone: '',
        cnpj: '',
        address: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSupplier = { id: idCounter.toString(), ...formData };
        setSuppliers([...suppliers, newSupplier]);
        setIdCounter(idCounter + 1);
        setFormData({
            name: '',
            phone: '',
            cnpj: '',
            address: ''
        });
    };


    const handleDelete = (id: string) => {
        setSuppliers(suppliers.filter(supplier => supplier.id !== id));
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
                    {suppliers.map((supplier) => (
                        <div key={supplier.id} className="supplier-card">
                            <div id="info-supp-card">
                                <h3>{supplier.name}</h3>
                                <p>Telefone: {supplier.phone}</p>
                                <p>CNPJ: {supplier.cnpj}</p>
                                <p>Endereço: {supplier.address}</p>
                            </div>
                            <div id="div-button-functions">
                                <CardButtonFunction type={1} objectId={supplier.id} onDelete={handleDelete} reference='fornecedores' />
                                <CardButtonFunction type={2} objectId={supplier.id} onDelete={() => { }} reference='fornecedores' />
                                <CardButtonFunction type={3} objectId={supplier.id} onDelete={handleDelete} reference='fornecedores' />
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
                            placeholder="Nome do fornecedor"
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
                            placeholder="Telefone do fornecedor"
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
                            name="address"
                            value={formData.address}
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
