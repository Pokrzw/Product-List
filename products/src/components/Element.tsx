import { TiEdit } from 'react-icons/ti'
import { HiOutlineTrash } from 'react-icons/hi';
import { itemDetails } from '../redux/actions';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../redux/actions';
import '../stylesheets/Element.scss'
import { useNavigate } from 'react-router';


interface Props{
    _id:string,
    name:string,
    price:number,
    amount:number,
    prodDate:string,
    category:string,
    description:string,
}

const Element = ({_id,
    name,
    price,
    amount,
    prodDate,
    category,
    description }:Props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deleteFromDB = async() => {
        await axios.delete(`http://localhost:5000/products/${_id}`)
    }
    const valueObject:itemDetails = {_id, name, price, amount, prodDate, category, description}
    const date = new Date(prodDate)

    return (
        <div className="Element">
            <div className="main">
            {name}
            </div>
            
            <div className="options">
               <div className="data">
               <div className="p"> Price:{price}</div>
               <div className="p">Amount: {amount}</div>
               <div className="p">Production Date: {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</div>
               <div className="p">category: {category}</div>
               <div className="p">description: {description}</div>
                <div className="buttons">
                    <button  onClick={()=>{
                        navigate(`${_id}/edit`)
                    }}><TiEdit /></button>
                    <button onClick={
                        () => {
                            dispatch(deleteItem(_id))
                            deleteFromDB()                            
                        }
                    }><HiOutlineTrash /></button>
               </div>
                </div>
            
            </div>
            
            
        </div>
    );
}

export default Element;