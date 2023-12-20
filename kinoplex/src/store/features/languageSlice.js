import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        selectedLanguage: localStorage.getItem("selectedLanguage")?
            localStorage.getItem("selectedLanguage") : "pt",
    },
    reducers: {
        selectLanguage(state, action) {
            state.selectedLanguage = action.payload;
            localStorage.setItem("selectedLanguage", action.payload);
        }
    }
});

export const { selectLanguage } = languageSlice.actions;
export default languageSlice.reducer;