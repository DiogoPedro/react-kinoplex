import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import MovieSection from './MovieSection';

const PAGE_LIMIT = 20;

export default function FilteredMovies() {

  const themeStore = useSelector(state => state.theme);
  const movieStore = useSelector(state => state.movie);
  const [page, setPage] = useState(1);

  function handlePageChange(event, value) {
    setPage(value);
  };

  const StyledPagination = styled(Pagination)(() => ({
    '& .MuiPaginationItem-root': {
      color: themeStore.selectedTheme === "light" ? "initial" : "#FFFFFF"
    }
  }));

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      maxWidth: '70%', 
      flex: 1 
    }}>
      <MovieSection movies={movieStore.moviesFiltered} limit={PAGE_LIMIT} page={page} />
      {movieStore.moviesFiltered.length > 0 &&
        <StyledPagination
          page={page}
          onChange={handlePageChange}
          count={Math.round(movieStore.moviesFiltered.length / PAGE_LIMIT)}
          variant="outlined"
          color="primary"
          size="small"
          sx={{ alignSelf: 'center' }}
        />
      }
    </Box>
  );
}