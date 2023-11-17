import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "./rootReducer";

const store = configureStore({
    reducer: rootReducer
})

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector  
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export default store