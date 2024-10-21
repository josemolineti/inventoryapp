import { useEffect, useState } from "react";
import Logo from "./logo";
import "@/styles/componentsStyles.css";
import Close from "@/assets/close.svg";
import Menu from "@/assets/menu.svg";

function TopBar(): JSX.Element {
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
            <div className="logobar">
                <Logo clickable={true} onlyLogo={!isMobile} />
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
                        <a href="/#">Nada</a>
                    </li>
                    <li>
                        <a href="/login">Sair</a>
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
                                <a href="/#">Nada</a>
                            </li>
                            <li>
                                <a href="/login">Sair</a>
                            </li>
                        </ul>
                        <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                            <img src={Close} alt="ícone fechar menu" width={24} height={24} />
                        </span>
                    </div>
                    :
                        <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper" >
                            <img src={Menu} alt="ícone menu" width={24} height={24} />
                        </span>
                }
            </div>
        </nav>

    );
};

export default TopBar;