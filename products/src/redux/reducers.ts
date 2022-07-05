import { itemDetails, allItemActions } from "./actions";

interface ItemState {
    items: itemDetails[]
}
const initialState = {
    items: []
}

export const itemReducer = (state: ItemState = initialState, action: allItemActions):ItemState => {
    switch (action.type) {
        case "ADD_ITEM":
            const newItem = {
                id: action.payload.id,
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
                    if(item.id === action.payload.id){
                        return {...item, id: action.payload.id,
                            name: action.payload.name,
                            price: action.payload.price,
                            amount: action.payload.amount,
                            prodDate: action.payload.prodDate,
                            category: action.payload.category,
                            description: action.payload.description}
                    } else {
                        return {...item}
                    }
                })
            ]}
        case 'DELETE_ITEM':
            return {...state, items: state.items.filter((item:itemDetails) =>  item.id !== action.payload.id)}
        default:
            return state
    }
}