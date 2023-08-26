import { createSlice } from '@reduxjs/toolkit'


const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        dark: false,
    },
    reducers: {
        toggleMode: (state) => {
            state.dark = !state.dark
        }
    }
})

export const themeReducer = themeSlice.reducer
export const { toggleMode } = themeSlice.actions