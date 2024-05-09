import React, { useState } from 'react';
import { Slider, Switch, Button, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';


const StyledCreditDisplay = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));


const PrettoSlider = styled(Slider)(({ theme }) => ({
  color: '#9747FF',
  height: 8,
  '& .MuiSlider-thumb': {
    height: 22,
    width: 22,
    backgroundColor: '#fff',
    border: '5px solid currentColor',
    marginTop: -2,
    marginLeft: -12,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(151, 71, 255, 0.16)',
    },
    '&.Mui-active': {
      boxShadow: '0px 0px 0px 14px rgba(151, 71, 255, 0.24)',
    },
  },
}));

const AutoTopUp: React.FC = () => {
  const [autoTopUpEnabled, setAutoTopUpEnabled] = useState(true);
  const [sliderValue, setSliderValue] = useState(1200);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoTopUpEnabled(event.target.checked);
  };

  const handleConfirmAutoTopUp = () => {
    console.log('Selected credit amount:', sliderValue);
  };

return (
    <Box sx={{ maxWidth: 700, width: '100%', margin: 'auto', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', padding: 8, borderRadius: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Setup Auto Top-up</Typography>
        </Grid>
        <Grid item xs={4}>
          <Switch
            checked={autoTopUpEnabled}
            onChange={handleToggleChange}
            color={autoTopUpEnabled ? "primary": "default"}
          />
        </Grid>
      </Grid>
      {autoTopUpEnabled ? (
        <>
          <Typography gutterBottom sx={{ color: 'gray', fontSize: "14px" }}>
            Once the credit goes below a minimum threshold {sliderValue},
            we will auto-purchase{' '}
            {sliderValue < 10
              ? (sliderValue * 100).toFixed(2)
              : sliderValue < 20
                ? (sliderValue * 100 + 200).toFixed(2)
                : sliderValue < 25 && sliderValue > 20
                  ? (sliderValue * 100 + 500).toFixed(2)
                  : sliderValue < 30 && sliderValue >= 25
                    ? (sliderValue * 100 + 1400).toFixed(2)
                    : sliderValue === 30
                      ? (sliderValue * 100 + 2000).toFixed(2)
                      : ''}{' '}
            credits and add them to your account. Learn more
          </Typography>

          <PrettoSlider
            value={sliderValue}
            onChange={handleSliderChange}
            aria-labelledby="slider"
            step={1}
            marks={[
              { value: 5, label: <><Typography variant="subtitle2" sx={{textAlign:'center'}}>$5</Typography><Typography variant="caption" sx={{textAlign:'match-parent'}}>500 Credits</Typography></> },
              { value: 10, label: <><Typography variant="subtitle2"  sx={{textAlign:'center'}}>$10</Typography><Typography variant="caption" sx={{textAlign:'center'}}>1200 Credits</Typography></> },
              { value: 15, label: <><Typography variant="subtitle2"  sx={{textAlign:'center'}}>$15</Typography><Typography variant="caption" sx={{textAlign:'center'}}>1700 Credits</Typography></> },
              { value: 20, label: <><Typography variant="subtitle2"  sx={{textAlign:'center'}}>$20</Typography><Typography variant="caption" sx={{textAlign:'center'}}>2500 Credits</Typography></> },
              { value: 25, label: <><Typography variant="subtitle2"  sx={{textAlign:'center'}}>$25</Typography><Typography variant="caption" sx={{textAlign:'center'}}>3900 Credits</Typography></> },
              { value: 30, label: <><Typography variant="subtitle2"  sx={{textAlign:'center'}}>$30</Typography><Typography variant="caption" sx={{textAlign:'center'}}>5000 Credits</Typography></> },
            ]}
            min={5}
            max={30}
            valueLabelDisplay="auto"
          />
          <Button onClick={handleConfirmAutoTopUp} variant="contained" color="secondary" sx={{
            mt: 2, mx: 'auto', backgroundColor: '#9747FF', color: 'white', marginTop: 5

          }}>
            Confirm auto-purchase
          </Button>
        </>
      ) : (
        <Typography variant="body1" sx={{ mt: 2, color:'gray' }}>Once the credit goes below the threshold value, credits can be auto purchased. Setup auto top-up to  enjoy uninterrupted services.  You can disable this anytime to stop auto top-up.</Typography>
      )}
    </Box>
  );
};

export default AutoTopUp;

