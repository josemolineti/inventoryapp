import EditIcon from '@/assets/edit-button-icon.svg';
import ViewIcon from '@/assets/view-button-icon.svg';
import DeleteIcon from '@/assets/delete-button-icon.svg';
import { View } from 'lucide-react';

interface ICardButtonFunctionProps {
    type: 1 | 2 | 3;

}


function CardButtonFunction({ type }: ICardButtonFunctionProps): JSX.Element {
    const selectType = () => {
        if (type == 1) {
            return EditIcon
        } else if (type == 2) {
            return ViewIcon
        } else {
            return DeleteIcon
        }
    }
    return (
        <>
            <div className='card-button-function'>
                <img src={selectType()} alt="" />
            </div>
        </>
    )
}

export default CardButtonFunction;