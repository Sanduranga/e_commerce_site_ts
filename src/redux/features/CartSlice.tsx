import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    boughtItems: [],
    numberOfItems: 0,
    totalPrice: 0,
    cartMenu: false,
  },
  reducers: {
    boughtItems: (state, action) => {
      state.boughtItems = action.payload;
    },

    itemCountPlus: (state) => {
      state.numberOfItems++;
    },

    itemCountMinus: (state) => {
      state.numberOfItems--;
    },
    cartPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    showCartMenu: (state) => {
      state.cartMenu = !state.cartMenu;
    },
  },
});

export const {
  boughtItems,
  itemCountPlus,
  itemCountMinus,
  cartPrice,
  showCartMenu,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
