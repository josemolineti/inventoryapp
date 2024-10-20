import { useEffect, useState } from 'react';
import '@/styles/login_style.css'
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Logo from '@/components/ui/logo';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ username, password });
        alert(`${username}`)
    };


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
                    <img src="src/assets/profile-icon.svg" alt="" />
                </div>
                <div id='box-content'>
                    <Logo onlyLogo={false} clickable={false} />
                    <form onSubmit={handleSubmit}>
                        <h1 id="login-title">LOGIN</h1>

                        <Input
                            type='text'
                            placeholder='Digite seu Nome'
                            label='Nome'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            type='password'
                            placeholder='Digite sua senha'
                            label='Senha'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div id='form-functions'>
                            <Link to={'/alterar-senha'} className='link'>Esqueceu sua senha?</Link>
                            <Link to={'/registrar'} className='link'>Registre-se</Link>
                        </div>
                        <Button color={1} text='Entrar' />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;