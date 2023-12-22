import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Skeleton from '@mui/material/Skeleton';
import MobileStepper from '@mui/material/MobileStepper';
import { styled } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carousel() {
  const themeStore = useSelector(state => state.theme);
  const languageStore = useSelector(state => state.language);
  const movieStore = useSelector(state => state.movie);

  const [top10Movies, setTop10Movies] = useState();

  useEffect(()=> {
    if(movieStore.movies){
      setTop10Movies(getTop10Movies(movieStore.movies));
    } 
  }, [movieStore.movies]);

  function getTop10Movies(unsortedMovies) {
    let movies = [...unsortedMovies];
    
    movies.sort((a, b) => b.popularity - a.popularity);

    let sizeElement = movies.length >= 10 ? 10 : movies.length;
    movies = movies.slice(0, sizeElement);
    
    return movies;
  }

  const [activeStep, setActiveStep] = useState(0);

  const maxSteps = top10Movies?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const [loadingFirstImg, setLoadingFirstImg] =  useState(true);

  useEffect(()=>{
      setLoadingFirstImg(true);
      loadImage();
  }, [top10Movies]);

  function loadImage(){
    const img = new Image();
    
    img.onload = () => setLoadingFirstImg(false);

    img.src = (top10Movies?top10Movies[0].backdrop_path:false) || "";
  }

  const StyledMobileStepper = styled(MobileStepper)(() => ({
    '& .MuiMobileStepper-dot': {
      backgroundColor: themeStore.selectedTheme === "light"? "#a9a9a9": "#535353"
    },
    '& .MuiMobileStepper-dotActive': {
      backgroundColor: themeStore.selectedTheme === "light"?" #1976d2": "#ff8305"
    }
  }));

  const StyledButton = styled(Button)(() => ({
    '&:disabled': {
      color: themeStore.selectedTheme === "light"? "#a9a9a9": "#d3d3d3"
    }
  }));

  return (
    <Box sx={{ maxWidth: 720, flexGrow: 1, width: "100%" }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          bgcolor: 'transparent',
          justifyContent: 'center'
        }}
      >
        {top10Movies && top10Movies.length>0 &&
            <Typography sx={{
            textAlign: 'center', 
            fontWeight: 600, 
            color: themeStore.selectedTheme === "light"? '#000000': '#FFFFFF'
            }}>
              {top10Movies[activeStep].title}
          </Typography>
        }
      </Paper>
      <AutoPlaySwipeableViews
        axis='x'
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {(loadingFirstImg || !top10Movies || top10Movies.length===0)?
          <Skeleton animation="wave" variant="rectangular" width="100%" height={405} />
          :
          top10Movies.map((movie, index) => (
            <div key={movie.id+" "+index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 'auto',
                    display: 'block',
                    maxWidth: 720,
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    objectFit: 'contain'
                  }}
                  src={movie.backdrop_path}
                  alt={movie?.title?movie.title:""}
                />
              ) : null}
            </div>
          ))
        }
      </AutoPlaySwipeableViews>
      <StyledMobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <StyledButton
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{color: themeStore.selectedTheme === "light"? "#1976d2":"#ff8305"}}
          >
            {languageStore.labels.next}
            <KeyboardArrowRight />
          </StyledButton>
        }
        backButton={
          <StyledButton
            size="small" 
            onClick={handleBack} 
            disabled={activeStep === 0} 
            sx={{color: themeStore.selectedTheme === "light"? "#1976d2":"#ff8305"}}
          >
            <KeyboardArrowLeft />
            {languageStore.labels.back}
          </StyledButton>
        }
        sx={{background: 'transparent'}}
        variant='dots'
      />
    </Box>
  );
}

export default Carousel;