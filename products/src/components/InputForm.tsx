import '../stylesheets/InputForm.scss'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { itemDetails } from '../redux/actions';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, editItem} from '../redux/actions'
import axios from "axios";
import * as yup from 'yup';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ItemState } from '../redux/reducers';
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";

type productId = {
    id: string | undefined
}

const InputForm = () => {

    const auth = useAuth()
    const { id } = useParams<productId>();
    const items = useSelector<ItemState, ItemState['items']>((state) => state.items)
    const navigate = useNavigate()
    const [formMode, setformMode] = useState<string>('');
    const dispatch = useDispatch()
    const newId = ""
    const blankObject: itemDetails = {
        _id: newId,
        name: '',
        price: 0,
        amount: 0,
        prodDate: '',
        category: 'smartphones',
        description: '',
    }
    const [initialValues, setinitialValues] = useState<itemDetails>(blankObject);
    let schema = yup.object().shape({
        name: yup.string().required('Name cannot be empty').matches(/([^\s])/),
        price: yup.number().required('Price must be a number').positive('Price must be a positive number'),
        amount: yup.number().required('Amount must be a number').positive('Amount must be a positive number').integer('Amonut must be an integer'),
        productionDate: yup.date().default(function () {
            return new Date();
        })
    });

    const addToDB = async (values: itemDetails) => {
        return await axios.post('http://localhost:5000/products/add', values, {headers: { "Authorization":"Bearer " + auth.user?.access_token }})
    }

    const editDB = async (values: itemDetails) => {
        return await axios.put(`http://localhost:5000/products/${values._id}/edit`, values, {headers: { "Authorization":"Bearer " + auth.user?.access_token }})
    }

    const getInitialValues = (): itemDetails => {
        const value = items.find((item: itemDetails) => {
            return item._id === id

        })
        return value ? value : blankObject
    }
    useEffect(() => {
        if (id !== undefined) {
            setformMode('edit')
            setinitialValues(getInitialValues())
        } else {
            setformMode('add')
        }

    }, [formMode]);


    return (
        <div className="InputForm">
            <button onClick={() => { navigate('/products') }}><AiFillCloseCircle /></button>
            <div className="container">

                <div className="header">

                    {
                        formMode === 'add' ?
                            <h1>Add new item</h1>
                            :
                            <h1>Edit item</h1>
                    }
                    <div className="divider"></div>
                </div>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={schema}
                    onSubmit={(values: itemDetails) => {
                        if (formMode === 'add') {
                            addToDB(values)
                            .then((res) => {
                                dispatch(addItem({...values, _id:res.data}))
                            })
                        }
                        if (formMode === 'edit') {
                            editDB(values)
                            .then((res) => {
                                dispatch(editItem(values))
                                console.log(res)
                            })
                            
                            
                            
                        }
                        navigate('/products')
                    }}
                >
                    <Form>
                        <div className="form">

                            <div className="inputField">
                                <label htmlFor="name">Product name</label>
                                <Field id='name' placeholder={initialValues.name} name='name'></Field>
                                <ErrorMessage data-testid='name' component='div' className='errorMsg' name='name'></ErrorMessage>
                            </div>

                            <div className="inputField">
                                <label htmlFor="price">Product price</label>
                                <Field id='price' placeholder={initialValues.price} name='price' type='number'></Field>
                                <ErrorMessage  component='div' className='errorMsg' name='price'></ErrorMessage>
                            </div>

                            <div className="inputField">
                                <label htmlFor="amount">Product amount</label>
                                <Field id='amout' placeholder={initialValues.amount} name='amount' type='number'></Field>
                                <ErrorMessage component='div' className='errorMsg' name='amount'></ErrorMessage>
                            </div>
                            <div className="inputField">
                                <label htmlFor="date">Product date</label>
                                <Field id='prodDate' placeholder={initialValues.prodDate} name='prodDate' type='date'></Field>
                            
                            </div>
                            <div className="inputField">
                                <label htmlFor="category">Product category</label>
                                <Field id='category' name='category' as='select'>
                                    <option value="smartphones">smartphones</option>
                                    <option value="laptops">laptops</option>
                                    <option value="displays">displays</option>
                                </Field>
                            </div>
                            <div className="inputField">
                                <label htmlFor="description">Product description (optional)</label>
                                <Field id='description' placeholder={initialValues.description} name='description'></Field>
                            </div>








                        </div>
                        <div className="buttons">
                            <button type='submit'>Submit</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default InputForm;
