import { itemDetails } from "./redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./redux/actions";
import { useSelector } from "react-redux";
import { ItemState } from "./redux/reducers";
import axios from "axios";
import Interface from "./components/Interface";
import InputForm from "./components/InputForm";
import './stylesheets/App.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";
  
function App() {

  const auth = useAuth()
  
  const loadData = async() => {
    const data:itemDetails[] = await axios
      .get('http://localhost:5000/products', {headers: { "Authorization":"Bearer " + auth.user?.access_token }})
      .then(response => response.data.allProducts)
      .then((data)=>{
        
        if(data){
          setDbData(data)
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
    dbData.map((x:itemDetails)=>{
      dispatch(addItem(x))
    })
  }, [loadingFinished]);

  if(loadingFinished){
    return (
      <div className="App">
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/products" />}/>

          <Route path="/products/" element={<Interface/>}/>
          <Route path="products/:id/edit" element={<InputForm/>}/>
          <Route path="/products/add" element={<InputForm/>}/>
        </Routes>
        </BrowserRouter>

      </div>
    );
  } else {
    return(
      <div className="loadingScreen">
        <div className="load">Loading <div className="dot">.</div><div className="dot">.</div><div className="dot">.</div></div></div>
    )
  }
}

export default App;
