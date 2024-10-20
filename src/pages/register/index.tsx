import { useEffect, useState } from 'react';
import '@/styles/login_style.css'
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Logo from '@/components/ui/logo';

function Register() {

    useEffect(() => {
        document.body.classList.add('register-page');

        return () => {
            document.body.classList.remove('register-page');
        };
    }, []);
    return (
        <>
            <div className='form-background-div'>
                <div id='profile-picture-example'>
                    <img src="src/assets/profile-icon.svg" alt="" />
                </div>
                <h1 id='login-title'>Registre-se</h1>
                <form  id='forms-block'>
                    <div>
                        
                        <Input type='text' placeholder='Digite seu Nome' label='Nome' required value={''} />
                        <Input type='email' placeholder='Digite seu Email' label='E-mail' required value={''} />
                        <Input type='tel' placeholder='Digite seu Celular' label='Celular' required value={''} />
                    </div>

                    <div>

                        <Input type='text' placeholder='Digite seu CEP' label='CEP' required value={''} />
                        <Input type='password' placeholder='Crie uma senha' label='Senha' required value={''} />
                        <Input type='password' placeholder='Repita sua senha' label='Repita sua senha' required value={''} />
                    </div>
                    
                </form>
                <Button color={1} text='Registrar' />

            </div>
        </>
    )
}

export default Register;