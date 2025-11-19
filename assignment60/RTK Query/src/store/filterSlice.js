import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedCategory: 'all', // 'all' or specific category name
    searchQuery: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        clearFilters: (state) => {
            state.selectedCategory = 'all'
            state.searchQuery = ''
        }
    }
})

// Selectors
export const selectSelectedCategory = (state) => state.filter.selectedCategory
export const selectSearchQuery = (state) => state.filter.searchQuery

export const { setCategory, setSearchQuery, clearFilters } = filterSlice.actions

export default filterSlice.reducer
