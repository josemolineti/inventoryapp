import { useEffect } from 'react'
import TopBar from "@/components/ui/top-bar";
import '@/styles/supplier_style.css';
import Input from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import Button from '@/components/ui/button';

function ProductEdit() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const objectId = queryParams.get('objectId');

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

                    <form action="">
                        <h1>Editar produto {objectId}</h1>
                        <Input color={1} labelColor={1} placeholder='Digite o nome' type='text' label='Nome' name='name' />
                        <Input color={1} labelColor={1} placeholder='Digite a descrição' type='tel' label='Descrição' name='description' />
                        <Input color={1} labelColor={1} placeholder='Digite o preço' type='number' label='Preço' name='price' min={0} />
                        <Input color={1} labelColor={1} placeholder='Digite a quantidade' type='number' label='Quantidade' name='quantity' min={0} />

                    </form>
                </div>
                <div id="info-box">
                
                        <Button color={3} type='back' text='Cancelar' />
                        <Button color={1} type='submit' text='Salvar' />
                
                </div>
            </div>
        </>
    )
}

export default ProductEdit;