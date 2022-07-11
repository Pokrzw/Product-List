import InputForm from "../components/InputForm";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {fireEvent, waitFor,  render, screen} from "@testing-library/react";


const MockForm = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <InputForm />
            </Provider>
        </BrowserRouter>
    )
}

test('it does not allow to submit a form with empty name', async() => {
    render(<MockForm/>)
    const button = screen.getByRole('button',{
        name: /Submit/i
    })
    fireEvent.click(button)
    await waitFor(()=>screen.getByTestId('name'))
    
    expect(screen.getByTestId('name')).toHaveTextContent(/Name cannot be empty/i)
   
    
})