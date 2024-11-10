import Button from '@/components/ui/button';
import { useState } from 'react';
import '@/styles/supplier_style.css';
import TopBar from '@/components/ui/top-bar';
import Input from '@/components/ui/input';
import CardButtonFunction from '@/components/ui/card-button-func';

interface IProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}

function productList() {
    const [idCounter, setIdCounter] = useState(1);
    const [products, setProducts] = useState<IProductProps[]>([]);
    const [formData, setFormData] = useState<Omit<IProductProps, 'id'>>({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProduct = { id: idCounter.toString(), ...formData };
        setProducts([...products, newProduct]);
        setIdCounter(idCounter + 1);
        setFormData({
            name: '',
            description: '',
            price: 0,
            quantity: 0,
            image: '',
        });
    };

    const handleDelete = (id: string) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <>
            <header><TopBar /></header>

            <div id="main-box">
                <div id="supplier-cards">
                    <div id="box-h1">
                        <h1>Produtos</h1>
                    </div>
                    {products.map((product) => (
                        <div key={product.id} className="supplier-card">
                            <div id="info-supp-card">
                                <h3>{product.name}</h3>
                                <p>Descrição: {product.description}</p>
                                <p>Preço: R$ {product.price}</p>
                                <p>Quantidade: {product.quantity}</p>
                            </div>
                            <div id="div-button-functions">
                                <CardButtonFunction type={1} objectId={product.id} onDelete={handleDelete} reference='produtos' />
                                <CardButtonFunction type={2} objectId={product.id} onDelete={() => { }} reference='produtos' />
                                <CardButtonFunction type={3} objectId={product.id} onDelete={handleDelete} reference='produtos' />
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
                            placeholder="Nome do produto"
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
                            placeholder="Descrição do produto"
                            label="Descrição"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="number"
                            placeholder="Preço do produto"
                            label="Preço"
                            name="price"
                            min={0}
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            color={2}
                            labelColor={2}
                            type="text"
                            placeholder="Quantidade do produto"
                            label="Quantidade"
                            name="quantity"
                            min={0}
                            value={formData.quantity}
                            onChange={handleInputChange}
                            required
                        />
                        <Button color={1} text="Criar Produto" type="submit" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default productList;