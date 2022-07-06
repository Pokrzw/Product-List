import { itemDetails, allItemActions } from "./actions";
import axios from "axios";
import { store } from "./store";
import { loadItems } from "./actions";
import { Dispatch } from "redux";
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export interface ItemState {
    items: itemDetails[]
}
const initialState = {
    items: []
}

export const itemReducer = (state: ItemState = initialState, action: allItemActions):ItemState => {
    switch (action.type) {
        case "ADD_ITEM":
            const newItem = {
                _id: action.payload._id,
                name: action.payload.name,
                price: action.payload.price,
                amount: action.payload.amount,
                prodDate: action.payload.prodDate,
                category: action.payload.category,
                description: action.payload.description
            }
            return { ...state, items: [...state.items, newItem] }
        case "EDIT_ITEM":
            return {...state, items: [
                ...state.items.map((item:itemDetails) => {
                    if(item._id === action.payload._id){
                        return {...item, 
                            name: action.payload.name,
                            price: action.payload.price,
                            amount: action.payload.amount,
                            prodDate: action.payload.prodDate,
                            category: action.payload.category,
                            description: action.payload.description}
                    } else {
                        return item
                    }
                })
            ]}
        case 'DELETE_ITEM':
            return {...state, items: state.items.filter((item:itemDetails) =>  item._id !== action.payload._id)}
        case 'LOAD_ITEMS':
            return {...state, items:[{_id:"string",
                name: 'string',
                price: 2,
                amount: 1,
                prodDate: 'string',
                category: 'string',
                description: 'string'}]}
        default:
            return state
    }
}

export const SaveNotes = () =>async (dispatch:AppDispatch, getState: () => RootState) => {
    const items = getState().items
    alert("Success")
}


export const LoadNotes = () => async (dispatch:Dispatch, getState: () => RootState) => {
    const items:itemDetails[] = await axios.get('http://localhost:5000/products').then((item) => item.data.allItems)
    dispatch(loadItems(items))
}