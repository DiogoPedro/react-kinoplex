import styled from 'styled-components';
import MovieCard from './MovieCard';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function MovieSection({genreId, movies, limit, page}) {

  const themeStore = useSelector(state => state.theme);
  const movieStore = useSelector(state => state.movie);

  const [processedMovies, setProcessedMovies] = useState(movies);

  useEffect(()=>{
    if(limit!==undefined && page!==undefined && movies){
      if(movies.length >= (limit*page))
        setProcessedMovies([...movies].slice(limit*(page-1), limit*page));
      else{
        setProcessedMovies([...movies]);
      }
    }
  }, [limit, page, movies]);

  function getGenreName() {
    let genreName = "";

    movieStore.genres.forEach(genre=>{
      if(genre.id == genreId) {
        genreName = genre.name;
      }
    });

    return  genreName;
  }

  return (
    <MovieSectionContainer>
      {genreId &&
        <Title $light={themeStore.selectedTheme==="light"}>{getGenreName()}</Title>
      }
      <MovieListContainer>
        {(processedMovies && processedMovies.length>0)?
          processedMovies.map((movie, index)=> 
            <MovieCard 
              key={(genreId?(genreId+"-"):"")+movie.id+"-"+index} 
              keyId={(genreId?(genreId+"-"):"")+movie.id+"-"+index} 
              movieData={movie}
            />
          )
          :
          (processedMovies && processedMovies.length===0 &&
            <>Nenhum filme encontrado</>
          )
        }
      </MovieListContainer>
    </MovieSectionContainer>
  );
}

const MovieSectionContainer = styled.section`
  min-width: 440px;
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Title = styled.p`
  color: ${props => props.$light ? "#000000" : "#FFFFFF"};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const MovieListContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;