import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CardMedia from './CardMedia';
import { setMovieHovered } from '../store/features/movieSlice';

export default function MovieCard({movieData, keyId}) {

  const dispatch = useDispatch();
  const themeStore = useSelector(state => state.theme);
  const movieStore = useSelector(state => state.movie);
  
  const [movie, setMovie] = useState(movieData);

  const [hovered, setHovered] = useState(false);

  useEffect(()=>{
    if(keyId && movieStore.movieHovered && keyId==movieStore.movieHovered)
      setHovered(true);
    else
      setHovered(false);
  }, [movieStore.movieHovered, keyId]);

  return (
    <Card 
      onMouseOut={()=>dispatch(setMovieHovered(null))} 
      onMouseOver={()=>dispatch(setMovieHovered(keyId))} 
      $hovered={hovered} 
      $light={themeStore.selectedTheme==="light"}
    >
      <CardMedia
        src={hovered?movie.backdrop_path:movie.poster_path}
        alt={movie.title}
        hovered={hovered}
      />

      <CardContent $hovered={hovered}>

        <CardTitle>
          {movie.title}
        </CardTitle>

        <CardYear>
          {(new Date(movie.release_date)).getFullYear()}
        </CardYear>

        <CardOverview>
          {movie.overview}
        </CardOverview>

      </CardContent>

    </Card>
  );
}


const Card = styled.article`
  flex: 1;
  min-width: ${props => props.$hovered ? "160px" : "100px"};
  max-width: ${props => props.$hovered ? "200px" : "120px"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transform: ${props => props.$hovered ? "scale(1.5)" : "scale(1)"};
  z-index: ${props => props.$hovered ? "999" : "99"};
  border-radius: 4px;
  box-shadow: ${props => props.$hovered ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"};
  background: #FFFFFF;
  overflow: visible;
  cursor: pointer;
  transition: z-index 0ms, transform 200ms;
`;

const CardContent = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: ${props => props.$hovered ? "block" : "none"};
  padding: 8px;
  gap: 4px;
`;

const CardTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #000000;
`;

const CardYear = styled.p`
  font-size: 9px;
  font-weight: 400;
  color: #000000;
`;

const CardOverview= styled.p`
  font-size: 9px;
  font-weight: 400;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;


