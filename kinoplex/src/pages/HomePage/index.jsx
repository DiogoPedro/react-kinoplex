import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import Carousel from './Carousel';
import MovieSection from './MovieSection';
import Header from '../../Components/Header';

export default function HomePage({loadingMovies, loadingMoviesProgress}) {

  const theme = useSelector(state => state.theme);
  const movie = useSelector(state => state.movie);

  const [top10Movies, setTop10Movies] = useState();
  const [moviesByGenre, setMoviesByGenre] = useState();

  useEffect(()=> {
      setTop10Movies(getTop10Movies(movie.movies));
      setMoviesByGenre(divideByGenre(movie.movies));
  }, []);

  function getTop10Movies(unsortedMovies) {
    let movies = [...unsortedMovies];
    
    movies.sort((a, b) => b.popularity - a.popularity);

    let sizeElement = movies.length >= 10 ? 10 : movies.length;
    movies = movies.slice(0, sizeElement);
    
    return movies;
  }

  function divideByGenre (unsortedMovies) {
    let movies = {};

    unsortedMovies.forEach( movie => {
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
    <HomePageContainer $light={theme.selectedTheme==="light"}>
      <Header/>
      {loadingMovies?
        <Box sx={{ display: 'flex', width: '35%', minHeight: '100vh', justifyContent: 'center', alignItems: 'center'}}>
          <Box sx={{width: '100%' }}>
            <LinearProgress variant="determinate" value={loadingMoviesProgress}/>
          </Box>
        </Box>
        :
        <div>
          { top10Movies && <Carousel movieList={top10Movies}/> }
          { moviesByGenre && Object.keys(moviesByGenre)?.map(key => <MovieSection key={key} genreId={key} movies={moviesByGenre[key]}/>) } 
        </div>
      }
    </HomePageContainer>
  );
}

const HomePageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.$light ? "#FFFFFF" : "#000000"};
  color: ${props => props.$light ? "#000000" : "#FFFFFF"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
