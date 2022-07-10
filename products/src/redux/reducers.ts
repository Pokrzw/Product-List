import { itemDetails, allItemActions } from "./actions";
import { store } from "./store";
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export interface ItemState {
    items: itemDetails[]
}
const initialState = {
    items: []
}

export const itemReducer = (state: ItemState = initialState, action: allItemActions): ItemState => {
    switch (action.type) {
        case "ADD_ITEM":
            const newItem:itemDetails = {
                _id: action.payload._id,
                name: action.payload.name,
                price: action.payload.price,
                amount: action.payload.amount,
                prodDate: action.payload.prodDate,
                category: action.payload.category,
                description: action.payload.description,
            }
            return { ...state, items: [...state.items, newItem] }
        case "EDIT_ITEM":
            return {
                ...state, items: [
                    ...state.items.map((item: itemDetails) => {
                        if (item._id === action.payload._id) 
                        {
                            return {
                                ...item,
                                name: action.payload.name,
                                price: action.payload.price,
                                amount: action.payload.amount,
                                prodDate: action.payload.prodDate,
                                category: action.payload.category,
                                descrpition: action.payload.description
                            }
                        } else {
                            return item
                        }
                    })
                ]
            }
        case 'DELETE_ITEM':
            return { ...state, items: state.items.filter((item: itemDetails) =>  item._id !== action.payload  ) }
        default:
            return state
    }
}
