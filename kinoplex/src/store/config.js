import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import languageReducer from './features/languageSlice';
import movieReducer from './features/movieSlice';

const store = configureStore({
    reducer: {
      theme: themeReducer,
      language: languageReducer,
      movie: movieReducer
    }
});
  
export default store;