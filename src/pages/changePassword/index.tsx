import { useEffect, useState } from 'react';
import '@/styles/login_style.css'
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

function ChangePassword() {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword == confirmNewPassword) {
            alert("Senha alterada com sucesso")
            console.log({ username, newPassword, confirmNewPassword });
        } else {
            alert("As senhas são diferentes!")
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
                        type='text'
                        placeholder='Digite seu usuario'
                        label='Usuario'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <Button color={1} text='Alterar senha' />
                </form>

            </div>
        </>
    )
}

export default ChangePassword