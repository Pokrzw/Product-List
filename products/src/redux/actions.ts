type Action = {
    type: string,
    payload: any
}

export type itemDetails = {
    id:string
    name: string,
    price: number,
    amount: number,
    prodDate: string,
    category: string,
    description: string
}


export const addItem = (payload: itemDetails): Action => ({
    type: 'ADD_NOTE',
    payload: { ...payload }
})
export const editItem = (payload: itemDetails): Action => ({
    type: 'EDIT_NOTE',
    payload
})
export const deleteItem = (payload: string): Action => ({
    type: 'DELETE_NOTE',
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

type deleteItemAction = { type: "DELETE_ITEM", payload:{id:string}}

export type allItemActions = addItemAction | editItemAction | deleteItemAction