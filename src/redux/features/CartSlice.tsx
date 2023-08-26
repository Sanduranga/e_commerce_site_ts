
import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        buyItems: [],
        numberOfItems: 0,
        totalPrice: 0
    },
    reducers: {
        buyItems: (state, action) => {
            state.buyItems = action.payload
        },

        itemCountPlus: (state) => {
            state.numberOfItems++
        },

        itemCountMinus: (state) => {
            state.numberOfItems--
        },
        cartPrice: (state, action) => {
            state.totalPrice = action.payload
        }
    }
})

export const { buyItems, itemCountPlus, itemCountMinus, cartPrice } = cartSlice.actions
export const cartReducer = cartSlice.reducer