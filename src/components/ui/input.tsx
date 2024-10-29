

interface IInputProps {
    color: number;
    labelColor: number;
    type: string;
    placeholder?: string;
    required?: boolean;
    label?: string;
    name?: string;
    max?: number;
    min?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

/**
 * modelo de input 
 * 
 * @param {number} color - define a cor e o estilo primario ou secundario etc
 * @param {number} labelColor - define a cor do texto labem em cima 
 * @param {string} type - define o tipo, number, text, password, date etc
 * @param {string} placeholder - define o texto de exemplo q aparece no input
 * @param {boolean} required - boolean que define se o user é obrigado ou não a preencher o campo (true ou false)
 * @param {string} label - define o texto label em cima do input, o texto principal falando o que é o input
 * @param {string} name - (OPCIONAL) define o name do input relativo ao form
 * @param {number} max - (OPCIONAL) se for um input de number, define o valor MÁXIMO que pode ser preenchido
 * @param {number} min - (OPCIONAL) se for um input de number, define o valor MÍNIMO que pode ser preenchido
 * @param {string} value - valor atual do input
 * @param {function} onChange - atualiza o valor do input 
 * 
 * EX: <Input type='text' placeholder='Preencha o nome do usuario' required/> 
 * * @returns {JSX.Element}
 */

function Input({ color, labelColor, type, placeholder, required, label, name, value, onChange }: IInputProps): JSX.Element {
    const getInputClass = () => {
        switch (color) {
            case 1:
                return "input-primary";
            case 2:
                return "input-secondary";

            default:
                return "input-primary";
        }
    };
    const getLabelClass = () => {
        switch (labelColor) {
            case 1:
                return "label-primary";
            case 2:
                return "label-secondary";

            default:
                return "label-primary";
        }
    };

    return (
        <div id="component-model-input">
            <label className={getLabelClass()}>{label}</label>
            <input className={getInputClass()}
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                name={name}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;