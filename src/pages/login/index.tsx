import { useEffect, useState } from 'react';
import '@/styles/login_style.css';
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Logo from '@/components/ui/logo';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'algum erro ai');
            } else {
                localStorage.setItem('token', data.token);
                alert('Bem-vindo! | Bem-Vinda! | Bem-Vinde! | Bem-Vindu! | Bem-Vindi!');
                navigate('/home'); 
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro no login');
        }
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
                            color={1}
                            labelColor={1}
                            type='email'
                            placeholder='Digite seu Email'
                            label='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            color={1}
                            labelColor={1}
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
                        <Button color={1} text='Entrar' type='submit'/>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
