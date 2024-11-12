import { useEffect, useState } from 'react';
import '@/styles/login_style.css';
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

function Register() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const userData = { nome: username, email: email, senha: password, isAdmin: isAdmin };

            try {
                console.log('dados:', userData);

                const response = await fetch('http://localhost:3000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('erro na resposta ', errorData);
                    alert(errorData.message || 'Erro desconhecido');
                } else {
                    const result = await response.json();
                    console.log('response', result);
                    alert(result.message);
                }
            } catch (error) {
                console.error('erro pra registrar', error);
                alert('Erro ao registrar usuário.');
            }
        } else {
            alert("As senhas são diferentes!");
        }
    };

    useEffect(() => {
        document.body.classList.add('register-page');
        return () => {
            document.body.classList.remove('register-page');
        };
    }, []);

    return (
        <div className="form-background-div">
            <div id="profile-picture-example">
                <img src="src/assets/profile-icon.svg" alt="Profile Icon" />
            </div>
            <div id="form-container">
                <h1 id="login-title">Registre-se</h1>
                <form id="forms-block" onSubmit={handleSubmit}>
                    <div id="forms">
                        <div>
                            <Input color={1} labelColor={1} type="text" placeholder="Digite seu Nome" label="Nome" required value={username} onChange={(e) => setName(e.target.value)} />
                            <Input color={1} labelColor={1} type="email" placeholder="Digite seu Email" label="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>

                        <div>
                            <Input color={1} labelColor={1} type="password" placeholder="Crie uma senha" label="Senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Input color={1} labelColor={1} type="password" placeholder="Repita sua senha" label="Repita sua senha" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                    </div>
                    <div id='check-admin'>
                        <input
                            type="checkbox"
                            checked={isAdmin === 1}
                            onChange={(e) => setIsAdmin(e.target.checked ? 1 : 0)}
                        />
                        <p>Definir user como admin?</p>
                    </div>
                    <Button color={1} text="Registrar" type='submit' />
                </form>
            </div>
        </div>
    );
}

export default Register;
