import styled from 'styled-components';
import MovieCard from './MovieCard';
import { useSelector } from 'react-redux';

export default function MovieSection({genreId, movies}) {

  const theme = useSelector(state => state.theme);

  return (
    <MovieSectionContainer>
      <Title $light={theme.selectedTheme==="light"}>bblablabla</Title>
      <MovieListContainer>
        {movies && movies.map((movie, index)=>
          <MovieCard key={index} movieData={movie}/>
        )}
      </MovieListContainer>
    </MovieSectionContainer>
  );
}

const MovieSectionContainer = styled.section`
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
  font-size: '18px';
  font-weight: '600';
`;

const MovieListContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;