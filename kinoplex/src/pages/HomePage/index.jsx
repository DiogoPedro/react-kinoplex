import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosHttpClient from '../../libs/axios/AxiosHttpClient';
import { useState, useEffect } from 'react';
import PageMovie from '../../Entity/PageMovie';
import Carousel from './Carousel';
import MovieSection from './MovieSection';
import styled from 'styled-components';
import Header from '../../Components/Header';

export default function HomePage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const language = useSelector(state => state.language);

  const [data, setData] = useState(new PageMovie());

  const [top10Movies, setTop10Movies] = useState();
  const [moviesByGenre, setMoviesByGenre] = useState();

  useEffect(() => {
    axiosHttpClient.get("/3/discover/movie").then(data=>setData(new PageMovie(data)));
  }, []);

  useEffect(()=> {
    if(data && data.results) {
      setTop10Movies(getTop10Movies(data.results));
      setMoviesByGenre(divideByGenre(data.results));
    }
  }, [data]);

  function getTop10Movies(unsortedMovies) {
    let movies = [];

    movies = unsortedMovies.sort((a, b) => b.popularity - a.popularity);

    let sizeElement = movies.length >= 10 ? 10 : movies.length;
    movies = movies.slice(0, sizeElement);
    
    console.log(movies);
    return movies;
  }

  function divideByGenre (unsortedMovies) {
    let movies = {};

    unsortedMovies.forEach( movie => {
      movie.genre_ids.forEach(genreId=>{
        if(movies[genreId]){
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
      { top10Movies && <Carousel movieList={top10Movies}/> }
      { moviesByGenre && Object.keys(moviesByGenre)?.map(key => <MovieSection key={key} genreId={key} movies={moviesByGenre[key]}/>) } 
    </HomePageContainer>
  );
}

const HomePageContainer = styled.div`
  width: 100%;
  background: ${props => props.$light ? "#FFFFFF" : "#000000"};
  color: ${props => props.$light ? "#000000" : "#FFFFFF"};
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
