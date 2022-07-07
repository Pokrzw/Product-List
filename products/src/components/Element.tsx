import { TiEdit } from 'react-icons/ti'
import { HiOutlineTrash } from 'react-icons/hi';

import '../stylesheets/Element.scss'
interface Props {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}
const Element = ({ userId, id, title, completed }: Props) => {
    return (
        <div className="Element">
            <div className="main">
            {title}
            </div>
            <div className="options">
                {userId}
                <div className="buttons">
                    <button><TiEdit /></button>
                    <button><HiOutlineTrash /></button>
                </div>
            </div>
        </div>
    );
}

export default Element;