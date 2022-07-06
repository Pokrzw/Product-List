import axios from "axios"
import { Dispatch } from "redux"

type Action = {
    type: string,
    payload: any
}

export type itemDetails = {
    _id:string,
    name: string,
    price: number,
    amount: number,
    prodDate: string,
    category: string,
    description: string
}


export const addItem = (payload: itemDetails): Action => ({
    type: 'ADD_ITEM',
    payload
})
export const editItem = (payload: itemDetails): Action => ({
    type: 'EDIT_ITEM',
    payload
})
export const deleteItem = (payload: string): Action => ({
    type: 'DELETE_ITEM',
    payload
})

export const loadItems = (payload: itemDetails[]):Action => ({
    type: 'LOAD_ITEMS',
    payload
})

type addItemAction = {
    type: 'ADD_ITEM',
    payload: itemDetails
}

type editItemAction = {
    type: "EDIT_ITEM",
    payload: itemDetails
}

type deleteItemAction = { type: "DELETE_ITEM", payload:{_id:string}}

type loadItemAction = {
    type: 'LOAD_ITEMS',
    payload: itemDetails[]
}
export type allItemActions = addItemAction | editItemAction | deleteItemAction |loadItemAction

