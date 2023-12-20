import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Movie from '../../Entity/Movie';

export default function MovieCard({movieData}) {

  const theme = useSelector(state => state.theme);
  
  const [movie, setMovie] = useState(new Movie(movieData));

  const [hovered, setHovered] = useState(false);

  return (
    <Card onMouseOut={()=>setHovered(false)} onMouseOver={()=>setHovered(true)} $hovered={hovered} $light={theme.selectedTheme==="light"}>
      <CardMedia
        src={hovered?movie.backdrop_path:movie.poster_path}
        alt={movie.title}
      />
      <CardContent $hovered={hovered}>
        <CardTitle $light={theme.selectedTheme==="light"}>
          {movie.title}
        </CardTitle>
        <CardOverview $light={theme.selectedTheme==="light"}>
          {movie.overview}
        </CardOverview>
      </CardContent>
    </Card>
  );
}


const Card = styled.article`
  width: ${props => props.$hovered ? "160px" : "100px"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transform: ${props => props.$hovered ? "scale(1.5)" : "scale(1)"};
  z-index: ${props => props.$hovered ? "999" : "99"};
  border-radius: 6px;
  box-shadow: ${props => props.$hovered ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"};
  background: #FFFFFF;
`;

const CardMedia = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

const CardContent = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: ${props => props.$hovered ? "block" : "none"};
  padding: 8px;
`;

const CardTitle = styled.h1`
  font-size: 14px;
  font-weight: 600;
  color: #000000;
`;

const CardOverview= styled.p`
  font-size: 10px;
  font-weight: 400;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;


