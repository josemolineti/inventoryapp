import EditIcon from '@/assets/edit-button-icon.svg';
import ViewIcon from '@/assets/view-button-icon.svg';
import DeleteIcon from '@/assets/delete-button-icon.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ICardButtonFunctionProps {
    type: 1 | 2 | 3;
    objectId: number;
    reference: "fornecedores" | "clientes" | "produtos" | "pedidos";
    onDelete: (id: number) => void;
}

function CardButtonFunction({ type, objectId, reference, onDelete }: ICardButtonFunctionProps): JSX.Element {
    const { user } = useAuth();
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
        if (user?.isAdmin == 1) {
            if (type === 1) {
                navigate(`/${reference}/editar?objectId=${objectId}`);
            } else if (type === 2) {
    
            } else if (type === 3) {
                onDelete(objectId);
            }
        } else {
            alert("Você não tem permissão para fazer isso!")
        }
    };

    return (
        <div className='card-button-function' onClick={handleClick}>
            <img src={selectType()} alt="" />
        </div>
    );
}

export default CardButtonFunction;
