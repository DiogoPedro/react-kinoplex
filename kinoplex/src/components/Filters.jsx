import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styledComponent from 'styled-components';
import { setMoviesFiltered } from '../store/features/movieSlice';

export default function Filters() {

  const dispatch = useDispatch();
  const movieStore = useSelector(state => state.movie);
  const languageStore = useSelector(state => state.language);

  const [genreId, setGenreId] = useState("");
  const [sort, setSort] = useState("");  //title | release_date | popularity);
  const [ascDesc, setAscDesc] = useState("");

  const handleChangeGenre = (event) => {
    setGenreId(event.target.value);
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
    setAscDesc("desc");
  };

  const handleChangeAscDesc = (event) => {
    setAscDesc(event.target.value);
  };

  function resetFilter () {
    setGenreId("");
  }

  function resetSort () {
    setSort("");
    setAscDesc("");
  }

  useEffect(()=>{
    let moviesFiltered = [...movieStore.movies];
    let changed = false;

    if(genreId && genreId.length>0){
      moviesFiltered = moviesFiltered.filter(movie => movie.genre_ids.includes(Number(genreId)));
      changed = true;
    }
    if(sort==="title" && ascDesc && ascDesc.length>0){
      if(ascDesc==="desc"){
        moviesFiltered = moviesFiltered.sort((a,b) => b.title.toUpperCase().charCodeAt(0) - a.title.toUpperCase().charCodeAt(0));
        changed = true;
      }
      else if(ascDesc==="asc"){
        moviesFiltered = moviesFiltered.sort((a,b) => a.title.toUpperCase().charCodeAt(0) - b.title.toUpperCase().charCodeAt(0));
        changed = true;
      }
    }
    else if(sort==="release_date" && ascDesc && ascDesc.length>0){
      if(ascDesc==="desc"){
        moviesFiltered = moviesFiltered.sort((a,b) => new Date(b.release_date) - new Date(a.release_date));
        changed = true;
      }
      else if(ascDesc==="asc"){
        moviesFiltered = moviesFiltered.sort((a,b) => new Date(a.release_date) - new Date(b.release_date));
        changed = true;
      }
    }
    else if(sort==="popularity" && ascDesc && ascDesc.length>0){
      if(ascDesc==="desc"){
        moviesFiltered = moviesFiltered.sort((a,b) => b.popularity - a.popularity);
        changed = true;
      }
      else if(ascDesc==="asc"){
        moviesFiltered = moviesFiltered.sort((a,b) => a.popularity - b.popularity);
        changed = true;
      }
    }

    if(changed===true)
      dispatch(setMoviesFiltered(moviesFiltered));
    else if(genreId.length===0 && sort.length===0)
      dispatch(setMoviesFiltered(null));
      
  }, [movieStore.movies, genreId, sort, ascDesc]);

  const StyledSelect = styled(Select)(() => ({
    '& .MuiSelect-select': {
      padding: "8px 6px",
    }
  }));

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minWidth: '300px', 
      flexShrink: '1',
      flexGrow: '0',
      justifyContent: 'flex-start', 
      alignItems: 'flex-start', 
      padding: '16px',
      background: '#FFFFFF',
      border: '1px solid rgba(211,211,211, 0.64)',
      borderRadius: '6px'
    }}>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', width: "100%" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: "100%" }}>
          <FieldTitle>{languageStore.labels.filterBy}</FieldTitle>
          <ResetField onClick={resetFilter}>{languageStore.labels.resetFilter}</ResetField>
        </Box>

        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">{languageStore.labels.genre}</InputLabel>
            <StyledSelect
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={genreId}
              label={languageStore.labels.genre}
              onChange={handleChangeGenre}
            >
              {
                movieStore.genres.map((genre, index)=>{
                    return <MenuItem key={genre.id+" "+index} value={String(genre.id)}>{genre.name}</MenuItem>
                })
              }  
            </StyledSelect>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', width: "100%"}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: "100%" }}>
          <FieldTitle>{languageStore.labels.sortBy}</FieldTitle>
          <ResetField onClick={resetSort}>{languageStore.labels.resetSort}</ResetField>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">{languageStore.labels.sorting}</InputLabel>
            <StyledSelect
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sort}
              label={languageStore.labels.sortBy}
              onChange={handleChangeSort}
            >
              <MenuItem value="release_date">{languageStore.labels.year}</MenuItem>
              <MenuItem value="title">{languageStore.labels.title}</MenuItem>
              <MenuItem value="popularity">{languageStore.labels.popularity}</MenuItem>
            </StyledSelect>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">{"Asc/Desc"}</InputLabel>
            <StyledSelect
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={ascDesc}
              label={"Asc/Desc"}
              onChange={handleChangeAscDesc}
            >
              <MenuItem value="desc">
                {"Desc"}
              </MenuItem>
              <MenuItem value="asc">
                {"Asc"}
              </MenuItem>
            </StyledSelect>
          </FormControl>
        </Box>
      </Box>

    </Box>
  );
}

const FieldTitle = styledComponent.span`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

const ResetField = styledComponent.span`
  font-size: 12px;
  font-weight: 300;
  color: #1976d2;
  cursor: pointer;
`;