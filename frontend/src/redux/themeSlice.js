import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        //action
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        },

        setUser: (state, action) => {
        state.user = action.payload;
        },
    }
})

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;