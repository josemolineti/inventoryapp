import { useEffect } from 'react'
import TopBar from "@/components/ui/top-bar";
import '@/styles/supplier_style.css';
import Input from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import Button from '@/components/ui/button';

function CustomerEdit() {
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
                        <h1>Editar cliente {objectId}</h1>
                        <Input color={1} labelColor={1} placeholder='Digite o nome' type='text' label='Nome' name='name' />
                        <Input color={1} labelColor={1} placeholder='Digite o telefone' type='tel' label='Telefone' name='tel' />
                        <Input color={1} labelColor={1} placeholder='Digite o endereco' type='text' label='Endereco' name='addres' />

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

export default CustomerEdit;