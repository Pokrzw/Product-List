import axios from "axios";
import { itemDetails } from "./redux/actions";
import { useEffect, useState } from "react";

function App() {
  const [dbItems, setDbItems] = useState<itemDetails[]>([]);
  useEffect(() => {
    (
      async () => {
        await
          axios
            .get('http://localhost:5000/products')
            .then((item) => {
              setDbItems(item.data.allProducts)
            })

      }
    )();
  }, []);
  return (
    <div className="App">
      {
        dbItems.map((x:itemDetails)=>{
          return(
            <div className="l" key={x.id}>{x.name}</div>
          )
        })
      }      
    </div>
  );
}

export default App;
