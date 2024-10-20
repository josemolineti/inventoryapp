

interface IInputProps {
    type: string;
    placeholder: string;
    required?: boolean;
    label?: string;
    max?: number;
    min?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

/**
 * modelo de input 
 * 
 * @param {string} type - define o tipo, number, text, password, date etc
 * @param {string} placeholder - define o texto de exemplo q aparece no input
 * @param {boolean} required - boolean que define se o user é obrigado ou não a preencher o campo (true ou false)
 * @param {string} label - define o texto label em cima do input, o texto principal falando o que é o input
 * @param {number} max - (OPCIONAL) se for um input de number, define o valor MÁXIMO que pode ser preenchido
 * @param {number} min - (OPCIONAL) se for um input de number, define o valor MÍNIMO que pode ser preenchido
 * @param {string} value - valor atual do input
 * @param {function} onChange - atualiza o valor do input 
 * 
 * EX: <Input type='text' placeholder='Preencha o nome do usuario' required/> 
 * * @returns {JSX.Element}
 */

function Input({ type, placeholder, required, label, value, onChange }: IInputProps): JSX.Element {
    return (
        <div id="component-model-input">
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;