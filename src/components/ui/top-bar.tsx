import { useEffect, useState } from "react";
import Logo from "@/components/ui/logo";
import "@/styles/componentsStyles.css";
import Close from "@/assets/close.svg";
import Menu from "@/assets/menu.svg";
import { useAuth } from '@/context/AuthContext';

function TopBar(): JSX.Element {
    const { user, logout } = useAuth();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 720);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <nav className='top-bar'>
            <div className="logo-bar">
                <Logo clickable={true} onlyLogo={isMobile} />
            </div>
            <div className='desktop'>
                <ul>
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/fornecedores">Fornecedores</a>
                    </li>
                    <li>
                        <a href="/produtos">Produtos</a>
                    </li>
                    <li>
                        <a href="/clientes">Clientes</a>
                    </li>
                    <li>
                        <a href="/pedidos">Pedidos</a>
                    </li>
                    <li>
                        <a href="/relatorios">Relatórios</a>
                    </li>
                    
                    <li>
                        {user && <li><p>Bem-vindo, {user.nome}</p></li>}
                        <a href="/login" onClick={logout}>Sair</a>
                    </li>
                </ul>
            </div>
            <div className="mobile-bg">
                {showMobileMenu ?
                    <div className="mobile">
                        <ul>
                            <li>
                                <a href="/home">Home</a>
                            </li>
                            <li>
                                <a href="/fornecedores">Fornecedores</a>
                            </li>
                            <li>
                                <a href="/produtos">Produtos</a>
                            </li>
                            <li>
                                <a href="/clientes">Clientes</a>
                            </li>
                            <li>
                                <a href="/pedidos">Pedidos</a>
                            </li>
                            <li>
                                <a href="/relatiorios">Relatórios</a>
                            </li>
                            <li>
                                <a href="/login">Sair</a>
                            </li>
                        </ul>
                        <div className="close-menu">
                            <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper close">
                                <img src={Close} alt="ícone fechar menu" />
                            </span>
                        </div>
                    </div>
                    :
                    <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper menu" >
                        <img src={Menu} alt="ícone menu" />
                    </span>
                }
            </div>
        </nav>

    );
};

export default TopBar;