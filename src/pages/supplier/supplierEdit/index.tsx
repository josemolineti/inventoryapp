import { useState, useEffect } from 'react';
import TopBar from "@/components/ui/top-bar";
import '@/styles/supplier_style.css';
import Input from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import Button from '@/components/ui/button';

function SupplierEdit() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const objectId = queryParams.get('objectId');

    const [supplier, setSupplier] = useState<any>(null);

    useEffect(() => {
        document.body.classList.add('supplier-edit');

        if (objectId) {
            fetchSupplierData(objectId);
        } else {
            console.error("ID de fornecedor inválido.");
        }

        return () => {
            document.body.classList.remove('supplier-edit');
        };
    }, [objectId]);

    const fetchSupplierData = async (id: string) => {
        try {
            const response = await fetch(`/api/supplier/${id}`);

            // Verificar o status da resposta
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }

            const textResponse = await response.text(); // Obtenha o texto da resposta
            console.log('Resposta da API:', textResponse); // Verifique o que o servidor está respondendo

            // Se for um JSON válido, então faça o parse
            try {
                const data = JSON.parse(textResponse);
                setSupplier(data);
            } catch (e) {
                console.error('Erro ao analisar JSON:', e);
            }
        } catch (error) {
            console.error('Erro ao buscar fornecedor:', error);
        }
    };




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!supplier) return;

        try {
            const response = await fetch(`/api/supplier/${supplier.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplier),
            });
            const data = await response.json();
            console.log("Fornecedor atualizado:", data);
        } catch (error) {
            console.error('Erro ao atualizar fornecedor:', error);
        }
    };

    if (!supplier) return <div>Carregando...</div>;

    return (
        <>
            <header>
                <TopBar />
            </header>
            <div id="main-box">
                <div id="form-box">
                    <form onSubmit={handleSubmit}>
                        <h1>Editar fornecedor {objectId}</h1>
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder="Digite o nome"
                            type="text"
                            label="Nome"
                            name="name"
                            value={supplier.nome}
                            onChange={(e) => setSupplier({ ...supplier, nome: e.target.value })}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder="Digite o telefone"
                            type="tel"
                            label="Telefone"
                            name="tel"
                            value={supplier.contato}
                            onChange={(e) => setSupplier({ ...supplier, contato: e.target.value })}
                        />
                        <Input
                            color={1}
                            labelColor={1}
                            placeholder="Digite o endereço"
                            type="text"
                            label="Endereço"
                            name="address"
                            value={supplier.endereco}
                            onChange={(e) => setSupplier({ ...supplier, endereco: e.target.value })}
                        />
                        <Button color={3} type="back" text="Cancelar" />
                        <Button color={1} type="submit" text="Salvar" />
                    </form>
                </div>
                <div id="info-box"></div>
            </div>
        </>
    );
}

export default SupplierEdit;
