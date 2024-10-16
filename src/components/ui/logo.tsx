import { useNavigate } from 'react-router-dom';

interface ILogoProps {
    onlyLogo: boolean;
    clickable: boolean;

}

/**
 * 
 * @param {boolean} onlyLogo - (OBRIGATORIO) onlyLogo={true/false}, define se aparece so a imagem ou se aparece o nome embaixo junto
 * @param {boolean} clickable - (OBRIGATORIO) clickable={true/false}, define se pode clicar ou nao na logo pra voltar pra home
 * @returns {JSX.Element}
 */
function Logo({ onlyLogo, clickable }: ILogoProps): JSX.Element {
    const navigate = useNavigate();
    const logoContent = (
        <>
            {onlyLogo ? (
                <>
                    <img id='logo' src="src\assets\app-icon.svg" alt="Logo Aplicativo Pandora" />
                </>

            ) : (
                <>
                    <img id='logo' src="src\assets\app-icon.svg" alt="Logo Aplicativo Pandora" />
                    <span>PANDORA</span>
                </>
            )}
        </>
    );

    const onClick = () => {
        if (clickable) {
            navigate('/home');
        }
    }

    return (
        <div id='box-logo' onClick={onClick}>
            {logoContent}
        </div>
    )

}

export default Logo;