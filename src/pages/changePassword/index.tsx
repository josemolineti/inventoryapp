import { useEffect, useState } from 'react';
import '@/styles/login_style.css'
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            alert('As senhas são diferentes!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    newPassword: newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`${errorData.message}`);
                return;
            }

            const data = await response.json();
            alert('Senha alterada com sucesso!');
            console.log('Senha alterada com sucesso:', data);
            navigate('/login');
        } catch (error: any) {
            console.error('Erro ao alterar a senha:', error);
            alert('Erro ao alterar a senha: ' + error.message);
        }
    };



    useEffect(() => {
        document.body.classList.add('change-pwd-page');

        return () => {
            document.body.classList.remove('change-pwd-page');
        };
    }, []);

    return (
        <>
            <div className='form-background-div'>
                <h1 id='login-title'>Alterar Senha</h1>

                <form action="" id='div-form' onSubmit={handleSubmit}>
                    <Input
                        color={1}
                        labelColor={1}
                        type='email'
                        placeholder='Digite seu email'
                        label='Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        color={1}
                        labelColor={1}
                        type='password'
                        placeholder='Digite sua nova Senha'
                        label='Nova senha'
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                        color={1}
                        labelColor={1}
                        type='password'
                        placeholder='Confirmar nova senha'
                        label='Confirmar nova senha'
                        required
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <Button color={1} text='Alterar senha' type='submit' />
                </form>

            </div>
        </>
    )
}

export default ChangePassword