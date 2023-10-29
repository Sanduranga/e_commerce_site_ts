import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./features/ux/UxSlice";
import { homeItemsReducer } from "./features/HomeItemSlice";
import { cartReducer } from "./features/CartSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    items: homeItemsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
