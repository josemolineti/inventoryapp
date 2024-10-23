import Button from '@/components/ui/button';
import React from 'react';
import '@/styles/index.css'
import TopBar from '@/components/ui/top-bar';

function SupplierList() {
    return (
        <>
        <header>
            <TopBar/>
        </header>
        <h1>FORNECEDORES lista</h1>
        <Button color={2} text='Voltar Home' link='/home'/>
        </>
    )
}

export default SupplierList;