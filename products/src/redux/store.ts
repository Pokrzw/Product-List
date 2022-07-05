import { itemReducer } from "./reducers";
import { createStore } from "redux";

export const store = createStore(itemReducer)