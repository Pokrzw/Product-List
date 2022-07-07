import { itemDetails } from "./redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, editItem, deleteItem } from "./redux/actions";
import { useSelector } from "react-redux";
import { ItemState } from "./redux/reducers";
import axios from "axios";
import Interface from "./components/Interface";
import './stylesheets/App.scss'



function App() {

  const loadData = async() => {
    const data:itemDetails[] = await axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.data)
      .then((data)=>{

        if(data){
          setDbData(data)
          data.map((item:itemDetails) => {
            dispatch(addItem(item))
          })
        }
        setLoadingFinished(true)
        return data
      })
    

      
  }
  
  const [dbData, setDbData] = useState<itemDetails[]>([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const dispatch = useDispatch()

  const items = useSelector<ItemState, ItemState['items']>((state)=>state.items)
  
  useEffect(() => {
    loadData()    
  }, [loadingFinished]);

  if(loadingFinished){
    return (
      <div className="App">
        <Interface/>
      </div>
    );
  } else {
    return(
      <>Loading...</>
    )
  }
}

export default App;
