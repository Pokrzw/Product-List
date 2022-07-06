import { itemReducer } from "./reducers";
import { createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"


export const store = createStore(itemReducer, composeWithDevTools(applyMiddleware(thunk)))