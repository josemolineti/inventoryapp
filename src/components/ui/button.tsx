import { useNavigate } from 'react-router-dom';

interface IButtonProps {
  text?: string;
  color: number;
  link?: string;
  onClick?: () => void;
}

/**
 * TUTORIAL PRO VINÃO
 * 
 * componente botao, que pode ser primario, secundario ou terciario e pode ter um link pra redirecionar
 *
 * <Button text="exemplo text" nivel={1} link={"/home"} onClick={minhaFuncaoTalTal}/>
 * @param {string} text - (OPCIONAL) texto do botao
 * @param {number} color - (OBRIGATORIO) define se o botão é primario(1), secundario(2), ou terciario(3) - deve usar apenas numeros
 * @param {string} [link] - (OPCIONAL) rota pra mandar pra outra pagina EX: /fornecedores
 * @param {onClick} onClick - (OPCIONAL) parametro pra executar alguma funcao, crie uma func. de seta e passe-a aqui :)
 * @returns {JSX.Element} 
 */
function Button({ text, color, link, onClick }: IButtonProps): JSX.Element {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (link) {
      navigate(link);
    }
  }
  const getButtonClass = () => {
    switch (color) {
      case 1:
        return "btn-primary";
      case 2:
        return "btn-secondary";
      case 3:
        return "btn-tertiary";
      default:
        return "btn-primary";
    }
  };

  return (
    <button id='botao-personalizado' onClick={handleClick} className={getButtonClass()}>
      {text}
    </button>
  );
}

export default Button;