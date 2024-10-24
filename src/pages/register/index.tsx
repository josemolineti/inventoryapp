import { useEffect, useState } from 'react';
import '@/styles/login_style.css'
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

function Register() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [cep, setCep] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password == confirmPassword) {
            alert("Registrado com sucesso")
            console.log({ username, email, tel, cep, password, confirmPassword });
        } else {
            alert("As senhas são diferentes!")
        }

    };

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
                <div id='teste'>
                    <h1 id='login-title'>Registre-se</h1>
                    <form id='forms-block' onSubmit={handleSubmit}>
                        <div id='forms'>
                            <div>

                                <Input color={1} labelColor={1} type='text' placeholder='Digite seu Nome' label='Nome' required value={username} onChange={(e) => setName(e.target.value)} />
                                <Input color={1} labelColor={1} type='email' placeholder='Digite seu Email' label='E-mail' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input color={1} labelColor={1} type='tel' placeholder='Digite seu Celular' label='Celular' required value={tel} onChange={(e) => setTel(e.target.value)} />
                            </div>

                            <div>

                                <Input color={1} labelColor={1} type='text' placeholder='Digite seu CEP' label='CEP' required value={cep} onChange={(e) => setCep(e.target.value)} />
                                <Input color={1} labelColor={1} type='password' placeholder='Crie uma senha' label='Senha' required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Input color={1} labelColor={1} type='password' placeholder='Repita sua senha' label='Repita sua senha' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </div>
                        <Button color={1} text='Registrar' />
                    </form>
                </div>

            </div>
        </>
    )
}

export default Register;