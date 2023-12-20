import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import languageReducer from './features/languageSlice';

const store = configureStore({
    reducer: {
      theme: themeReducer,
      language: languageReducer
    }
});
  
export default store;