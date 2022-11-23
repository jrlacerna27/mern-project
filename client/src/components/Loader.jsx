import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: '9',
      }}
    >
      <CircularProgress
        color="secondary"
        sx={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '999',
        }}
      />
    </Box>
  );
};

export default Loader;
