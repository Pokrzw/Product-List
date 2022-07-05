import axios from "axios";
import { itemDetails } from "./redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, editItem, deleteItem } from "./redux/actions";
import { useSelector } from "react-redux";
import { ItemState } from "./redux/reducers";

function App() {
  const dispatch = useDispatch()
  const [dbItems, setDbItems] = useState<itemDetails[]>([]);
  const Items = useSelector<ItemState, ItemState['items']>((state)=>state.items)
  useEffect(() => {
    (
      async () => {
        await
          axios
            .get('http://localhost:5000/products')
            .then((item) => {
              if(item!==undefined){
                item.data.allProducts.map((item:itemDetails) => {
                  dispatch(addItem(item))
                })
                
                setDbItems(item.data.allProducts)
              }
            })
      }
    )();
    
  }, []);

  return (
    <div className="App">
      <>
      {Items.map((x)=>{
        return(
          <>{x.description}</>
        )
      })}
      </>
      {
        dbItems.map((item)=>{
          return(
            <div key={item.id}>{item.name}
            
            <button onClick={
              () => {
                dispatch(editItem({...item, id: item.id, name:"jajko"}))
              }
            }>Zmien</button>
            </div>
            
          )
        })
      }
      
    </div>
  );
}

export default App;
