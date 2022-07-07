import '../stylesheets/Form.scss'
import { Formik, Form, Field } from "formik";
interface Props{
    setFormActive: React.Dispatch<React.SetStateAction<boolean>>
}

interface Form{}

const InputForm = ({setFormActive}:Props) => {
    return ( 
        <div className="Form">
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button onClick={()=>{
                setFormActive(false)
            }}>Close</button>
        </div>
     );
}
 
export default InputForm;