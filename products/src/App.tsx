import axios from "axios";
import { itemDetails } from "./redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, editItem, deleteItem } from "./redux/actions";
import { useSelector } from "react-redux";
import { ItemState } from "./redux/reducers";
import { loadItemsThunk } from "./redux/actions";


function App() {

  
  const dispatch = useDispatch()
  const items = useSelector<ItemState, ItemState['items']>((state)=>state.items)
  const onSave = () => {

  }
  const onLoad = () => {

  }

  return (
    <div className="App">
      <div className="l">
      {items.map((x:itemDetails)=>{
        return(
          <div className="l">{x.name}</div>
        )
      })}
      </div>
     lsd
     <button onClick={
      () => {
        dispatch(addItem(
          {
            _id:"string",
                name: 'łubudubu',
                price: 2,
                amount: 1,
                prodDate: 'string',
                category: 'string',
                description: 'string'}
        ))
      }
     }>Add</button>
     <button onClick={onSave}>Save</button>
     <button onClick={onLoad}>Load</button>
    </div>
  );
}

export default App;
