

interface IInputProps {
    type: string;
    placeholder: string;
    required?: boolean;
    max?: number;
    min?: number;

}

/**
 * modelo de input 
 * 
 * @param {string} type - define o tipo, number, text, password, date etc
 * @param {string} placeholder - define o texto de exemplo q aparece no input
 * @param {boolean} required - boolean que define se o user é obrigado ou não a preencher o campo (true ou false)
 * @param {number} max - (OPCIONAL) se for um input de number, define o valor MÁXIMO que pode ser preenchido
 * @param {number} min - (OPCIONAL) se for um input de number, define o valor MÍNIMO que pode ser preenchido
 * 
 * EX: <Input type='text' placeholder='Preencha o nome do usuario' required/>
 * * @returns {JSX.Element}
 */

function Input({ type, placeholder, required }: IInputProps): JSX.Element {
    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            required={required}
        />
    );
}

export default Input;