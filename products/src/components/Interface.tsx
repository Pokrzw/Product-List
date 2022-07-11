import { useSelector } from "react-redux";
import { ItemState } from "../redux/reducers";
import { itemDetails } from "../redux/actions";
import Element from "./Element";
import '../stylesheets/globalStyles.scss'
import '../stylesheets/Interface.scss'
import { useNavigate } from "react-router";

const Interface = () => {
    const navigate = useNavigate()
    const items = useSelector<ItemState, ItemState['items']>((state) => state.items)

    return (
        <div className="Interface">
            <button className="AddItemButton" onClick={() => {navigate('add')}}>add item</button>

            <div className="background">
                <div className="bgImage"></div>
                <div className="allItems">
                    {items.map((x: itemDetails) => {
                        return (
                            <div key={x._id} className="item">
                                <Element
                                    key={x._id}
                                    _id={x._id}
                                    name={x.name}
                                    price={x.price}
                                    amount={x.amount}
                                    prodDate={x.prodDate}
                                    category={x.category}
                                    description={x.description} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}

export default Interface;