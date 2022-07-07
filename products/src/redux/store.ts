import { itemReducer } from "./reducers";
import { createStore, compose, applyMiddleware} from "redux";



export const store = createStore(itemReducer)