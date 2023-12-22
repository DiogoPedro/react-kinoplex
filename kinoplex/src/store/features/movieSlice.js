import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: [],
        genres: [],
        moviesFiltered: null,
        movieHovered: null
    },
    reducers: {
        setMovies(state, action) {
            state.movies = action.payload;
        },
        setGenres(state, action) {
            state.genres = action.payload;
        },
        setMoviesFiltered(state, action) {
            state.moviesFiltered = action.payload;
        },
        setMovieHovered(state, action) {
            state.movieHovered = action.payload;
        }
    }
});

export const { setMovies, setGenres, setMoviesFiltered, setMovieHovered } = movieSlice.actions;
export default movieSlice.reducer;