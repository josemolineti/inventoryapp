import { useEffect } from 'react';
import '@/styles/login_style.css'
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Logo from '@/components/ui/logo';


function Login() {
    useEffect(() => {
        document.body.classList.add('login-page');

        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);
    return (
        <>

            <div className='form-background-div'>
                <div id='profile-picture-example'>
                    <img src="src\assets\profile-icon.svg" alt="" />
                </div>
                <div id='box-content'>
                    <Logo onlyLogo={false} clickable={false} />
                    <form action="">
                        <h1 id="login-title">LOGIN</h1>
                        <Input type='text' placeholder='Digite seu Nome' label='Nome' required />
                        <Input type='password' placeholder='Digite sua senha' label='Senha' required />
                        <Button color={1} text='Entrar' link='/home' />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;