import React from "react";
import Button from "./button";
import { JSXSource } from "react/jsx-dev-runtime";
import Logo from "./logo";

function  TopBar():JSX.Element{
    return(
<nav className='top-bar'>
            <Logo clickable={true} onlyLogo={true}/>
            <div className='top-bar-secondy-part'>
                <ul className='top-bar-ul'>
                    <Button text='Home' color={4} link="/home"/>
                    <Button text='Fornecedores' color={4} link="/fornecedores" />
                    <Button text='Produtos' color={4} link="/produtos"/>
                    <Button text='Clientes' color={4} link="/clientes"/>
                    <Button text='nada ainda' color={4} />
                    <Button text='Sair' color={4} link="/login"/>
                </ul>
            </div>
        </nav>

    );
};

export default TopBar;