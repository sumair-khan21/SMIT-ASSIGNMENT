// Middleware to sync cart with localStorage
export const cartLocalStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action)

    // Save cart state to localStorage whenever cart actions are dispatched
    if (action.type?.startsWith('cart/')) {
        const cartState = store.getState().cart
        try {
            localStorage.setItem('shophub_cart', JSON.stringify(cartState.items))
        } catch (error) {
            console.error('Error saving cart to localStorage:', error)
        }
    }

    return result
}

// Load cart from localStorage
export const loadCartFromLocalStorage = () => {
    try {
        const savedCart = localStorage.getItem('shophub_cart')
        if (savedCart) {
            return JSON.parse(savedCart)
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error)
    }
    return []
}
