import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import MovieSection from './MovieSection';

export default function MoviesListsByGenre() {

  const movieStore = useSelector(state => state.movie);

  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(()=> {
    if(movieStore.movies){
      setMoviesByGenre(divideByGenre(movieStore.movies));
    } 
  }, [movieStore.movies]);

  function divideByGenre (unsortedMovies) {
    let movies = {};

    unsortedMovies.forEach(movie=>{
      movie.genre_ids.forEach(genreId=>{
        if(movies[genreId]){
          if(movies[genreId].length < 10)
            movies[genreId].push(movie);
        } 
        else
        {
          movies[genreId] = [movie];
        }
      });
    });

    return movies;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', maxWidth: "70%" }}>
      {Object.keys(moviesByGenre).map(key => <MovieSection key={key} genreId={key} movies={moviesByGenre[key]} />)}
    </Box>
  );
}