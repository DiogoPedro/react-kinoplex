import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        selectedTheme: localStorage.getItem("selectedTheme")?
            localStorage.getItem("selectedTheme") : "light"
    },
    reducers: {
        selectTheme(state, action) {
            state.selectedTheme = action.payload;
            localStorage.setItem("selectedTheme", action.payload);
        }
    }
});

export const { selectTheme } = themeSlice.actions;
export default themeSlice.reducer;