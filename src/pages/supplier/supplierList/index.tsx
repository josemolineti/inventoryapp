import Button from '@/components/ui/button';
import React from 'react';
import '@/styles/index.css'

function SupplierList() {
    return (
        <>
        <h1>FORNECEDORES</h1>
        <Button nivel={2} text='Voltar Home' link='/home'/>
        </>
    )
}

export default SupplierList;