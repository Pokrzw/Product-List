import { useSelector } from "react-redux";
import { ItemState } from "../redux/reducers";
import { itemDetails } from "../redux/actions";
import Element from "./Element";
import InputForm from "./InputForm";
import { useState } from "react";
import '../stylesheets/globalStyles.scss'
import '../stylesheets/Interface.scss'

const Interface = () => {
    const [formActive, setFormActive] = useState(false);
    const items = useSelector<ItemState, ItemState['items']>((state) => state.items)
    return (
        <div className="Interface">
            {
                formActive ?
                    <InputForm setFormActive={setFormActive} /> :
                    <button className="AddItemButton" onClick={() => { setFormActive(true) }}>add item</button>
            }

            <div className="background">
                <div className="bgImage"></div>
                <div className="allItems">
                    {items.map((x: itemDetails) => {
                        return (
                            <div className="item">
                                <Element key={x.id} userId={x.userId} id={x.id} title={x.title} completed={x.completed} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}

export default Interface;