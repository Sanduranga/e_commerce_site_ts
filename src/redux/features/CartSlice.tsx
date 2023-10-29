import { createSlice } from "@reduxjs/toolkit";

interface iniState {
  cartItems: [];
  numberOfItems: number;
  totalPrice: number;
  cartMenu: boolean;
}

const initialState: iniState = {
  cartItems: [],
  numberOfItems: 0,
  totalPrice: 0.0,
  cartMenu: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    boughtItems: (state, action) => {
      state.cartItems = action.payload;
    },

    itemCountPlus: (state) => {
      state.numberOfItems++;
    },

    unshiftItemFromCart: (state) => {
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
  unshiftItemFromCart,
  cartPrice,
  showCartMenu,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
