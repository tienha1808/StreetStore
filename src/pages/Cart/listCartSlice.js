import { createSlice } from "@reduxjs/toolkit";

export const listCartSlice = createSlice({
    name: 'listCart',
    initialState: [],
    reducers: {
        getCart (state, action) {
            const { cart } = action.payload
            if (cart === undefined) return
            return state = cart
        },
        cartAdd (state, action) {
            const product = {
                ...action.payload
            }
            state.push(product)
        },
        delItem (state, action) {
            const { delIndexItem} = action.payload
            state.splice(delIndexItem, 1)
        },
        clearCart (state) {
            return state = []
        }
    }
})

export const { getCart, cartAdd, delItem, clearCart } = listCartSlice.actions

export default listCartSlice.reducer