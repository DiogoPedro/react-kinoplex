import { createSlice } from '@reduxjs/toolkit';
import labels from '../../constants/labels.json';
import messages from '../../constants/messages.json';

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        selectedLanguage: localStorage.getItem("selectedLanguage")?
            localStorage.getItem("selectedLanguage") : "pt-BR",
        labels: localStorage.getItem("selectedLanguage") === "en-US"? 
            labels.en : labels.pt,
        messages: localStorage.getItem("selectedLanguage") === "en-US"? 
            messages.en : messages.pt,
    },
    reducers: {
        selectLanguage(state, action) {
            state.selectedLanguage = action.payload;
            localStorage.setItem("selectedLanguage", action.payload);

            if(action.payload === "pt-BR")
                state.labels = labels.pt;
            else if(action.payload === "en-US")
                state.labels = labels.en;

            if(action.payload === "pt-BR")
                state.messages = messages.pt;
            else if(action.payload === "en-US")
                state.messages = messages.en;
        }
    }
});

export const { selectLanguage } = languageSlice.actions;
export default languageSlice.reducer;