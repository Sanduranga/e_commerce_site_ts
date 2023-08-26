import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./features/theme/Theme.";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux/es/exports";
import { homeItemsReducer } from "./features/HomeItemSlice";
import { cartReducer } from "./features/CartSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        items: homeItemsReducer,
        buyGoods: cartReducer
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export default store