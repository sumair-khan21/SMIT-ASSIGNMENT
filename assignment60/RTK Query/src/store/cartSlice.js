import { createSlice } from '@reduxjs/toolkit'
import { loadCartFromLocalStorage } from './cartMiddleware'

const initialState = {
    items: loadCartFromLocalStorage(), // Load from localStorage on init
    isCartOpen: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const existingItem = state.items.find(item => item.product.id === product.id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ product, quantity: 1 })
            }
        },

        removeFromCart: (state, action) => {
            const productId = action.payload
            state.items = state.items.filter(item => item.product.id !== productId)
        },

        increaseQuantity: (state, action) => {
            const productId = action.payload
            const item = state.items.find(item => item.product.id === productId)
            if (item) {
                item.quantity += 1
            }
        },

        decreaseQuantity: (state, action) => {
            const productId = action.payload
            const item = state.items.find(item => item.product.id === productId)
            if (item && item.quantity > 1) {
                item.quantity -= 1
            }
        },

        clearCart: (state) => {
            state.items = []
        },

        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen
        },

        openCart: (state) => {
            state.isCartOpen = true
        },

        closeCart: (state) => {
            state.isCartOpen = false
        }
    }
})

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartItemCount = (state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
export const selectIsCartOpen = (state) => state.cart.isCartOpen

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart
} = cartSlice.actions

export default cartSlice.reducer
