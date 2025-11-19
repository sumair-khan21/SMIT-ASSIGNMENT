// import { configureStore } from '@reduxjs/toolkit'
// // import todoSlice from '../Features/todoSlice'
// import todoSlice from '../features/TodoSlice'
// import { productApi } from '../services/products'

import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../services/products";
import cartReducer from "./cartSlice";
import filterReducer from "./filterSlice";
import { cartLocalStorageMiddleware } from "./cartMiddleware";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        filter: filterReducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(cartLocalStorageMiddleware)
})