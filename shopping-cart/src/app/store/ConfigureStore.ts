import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { cartSlice } from "../../features/cart/cartSlice";
import { catalogSlice } from "../../features/home/catalogSlice";
import { accountSlice } from "../../features/account/accountSlice";

export const store = configureStore({
reducer: {
        cart: cartSlice.reducer,
        home: catalogSlice.reducer,
        account: accountSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;