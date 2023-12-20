import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useSelector } from 'react-redux';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carousel({movieList}) {
  const theme = useSelector(state => state.theme);
  const language = useSelector(state => state.language);

  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = movieList?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if(movieList)
  {
    return (
      <Box sx={{ maxWidth: 720, flexGrow: 1, width: "50vw", heigth: 'auto'}}>
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
          <Typography sx={{textAlign: 'center', fontWeight: 600, color: theme.selectedTheme === "light"? '#000000': '#FFFFFF'}}>{movieList[activeStep].title}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis='x'
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {movieList.map((movie, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 'auto',
                    display: 'block',
                    maxWidth: 720,
                    overflow: 'hidden',
                    width: '50vw',
                    aspectRatio: '16/9',
                    objectFit: 'contain'
                  }}
                  src={movie.backdrop_path}
                  alt={movie?.title?movie.title:""}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {language.labels.next}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              {language.labels.back}
            </Button>
          }
          sx={{background: 'transparent'}}
          variant='dots'
        />
      </Box>
    );
  }
  else
  {
    return (
      <></>
    );
  }
}

export default Carousel;