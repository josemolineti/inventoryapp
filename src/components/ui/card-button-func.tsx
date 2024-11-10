import EditIcon from '@/assets/edit-button-icon.svg';
import ViewIcon from '@/assets/view-button-icon.svg';
import DeleteIcon from '@/assets/delete-button-icon.svg';
import { useNavigate } from 'react-router-dom';

interface ICardButtonFunctionProps {
    type: 1 | 2 | 3;
    objectId: string;
    reference: "fornecedores" | "clientes" | "produtos" | "pedidos";
    onDelete: (id: string) => void;
}

function CardButtonFunction({ type, objectId, reference, onDelete }: ICardButtonFunctionProps): JSX.Element {
    const navigate = useNavigate();
    const selectType = () => {
        if (type === 1) {
            return EditIcon;
        } else if (type === 2) {
            return ViewIcon;
        } else if (type === 3) {
            return DeleteIcon;
        }
    };

    const handleClick = () => {
        if (type === 1) {
            alert(`Editando o ${objectId}`);
            navigate(`/${reference}/editar?objectId=${objectId}`);
        } else if (type === 2) {
            alert(`Olhando o ${objectId}`);
        } else if (type === 3) {
            alert(`Deletando o ${objectId}`)
            onDelete(objectId);
        }
    };

    return (
        <div className='card-button-function' onClick={handleClick}>
            <img src={selectType()} alt="" />
        </div>
    );
}

export default CardButtonFunction;