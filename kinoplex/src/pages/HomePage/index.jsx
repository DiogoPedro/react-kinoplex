import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Carousel from '../../components/Carousel';
import Header from '../../components/Header';
import Filters from '../../components/Filters';
import MoviesListsByGenre from '../../components/MoviesListByGenre';
import FilteredMovies from '../../components/FilteredMovies';

export default function HomePage({loadingMovies}) {

  const themeStore = useSelector(state => state.theme);
  const movieStore = useSelector(state => state.movie);

  const [showFilteredMovies, setShowFilteredMovies] = useState(false);

  useEffect(()=>{
    if(movieStore.moviesFiltered) setShowFilteredMovies(true);
    else setShowFilteredMovies(false);
  }, [movieStore.moviesFiltered]);

  return (
    <HomePageContainer $light={themeStore.selectedTheme==="light"}>

      <Header/>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        marginBottom: '64px', 
        marginTop: '16px', 
        padding: '8px',
        flexWrap: 'wrap',
        gap: '16px',
        flex: 1
      }}>

        <Filters/>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flex: '1', 
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          alignSelf: 'stretch'
        }}>
          {loadingMovies?
            <CircularProgress />
            :
            ((showFilteredMovies && movieStore.moviesFiltered)?
              <FilteredMovies />
              :
              <>
                <Carousel />
                <MoviesListsByGenre />
              </>
            )
          }
        </Box>

      </Box>
      
    </HomePageContainer>
  );
}

const HomePageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.$light ? "#FFFFFF" : "#303030"};
  color: ${props => props.$light ? "#000000" : "#FFFFFF"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
