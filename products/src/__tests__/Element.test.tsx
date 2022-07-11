import { Provider } from "react-redux";
import { store } from "../redux/store";
import Element from "../components/Element";
import { BrowserRouter } from "react-router-dom";
import Interface from "../components/Interface";
import { render, screen} from "@testing-library/react";


interface Props {
    _id: string,
    name: string,
    price: number,
    amount: number,
    prodDate: string,
    category: string,
    description: string,
}

const MockInterface = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Interface />
            </Provider>
        </BrowserRouter>
    )
}

const MockElement = (x: Props): JSX.Element => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Element
                    key={x._id}
                    _id={x._id}
                    name={x.name}
                    price={x.price}
                    amount={x.amount}
                    prodDate={x.prodDate}
                    category={x.category}
                    description={x.description}
                />
            </Provider>
        </BrowserRouter>
    )
}

const mockIems: Props[] = [
    {
        _id: '1',
        name: "Lorem",
        price: 8,
        amount: 4,
        prodDate: '08-08-2008',
        category: 'smartphones',
        description: ''
    },
    {
        _id: '2',
        name: "Ipsum",
        price: 18,
        amount: 54,
        prodDate: '08-08-2008',
        category: 'laptops',
        description: ''
    },
    {
        _id: '3',
        name: "mockInsert",
        price: 82,
        amount: 44,
        prodDate: '08-08-2008',
        category: 'displays',
        description: 'a nice display'
    }
]

describe('Test element component', () => {


    const mockRenderSetup = () => {
        render(<MockInterface />)
        mockIems.map((x: Props) => {
            render(<MockElement
                key={x._id}
                _id={x._id}
                name={x.name}
                price={x.price}
                amount={x.amount}
                prodDate={x.prodDate}
                category={x.category}
                description={x.description}
            />)
        })
    }


    test('shows name of elements when multiple objects are given', () => {
        mockRenderSetup()
        const itemName = screen.getByText(/Lorem/i);
        const itemName2 = screen.getByText(/Ipsum/i);
        const itemName3 = screen.getByText(/mockInsert/i);
        expect(itemName).toBeInTheDocument();
        expect(itemName2).toBeInTheDocument();
        expect(itemName3).toBeInTheDocument();

    })
})
