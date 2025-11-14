import { configureStore } from '@reduxjs/toolkit'
import todoSlice from '../Features/todoSlice'

export const store = configureStore({ reducer: {
    todo: todoSlice
} })