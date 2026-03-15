import React from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import AlphabetGrid from '../components/AlphabetGrid';

const AlphabetPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 430, mx: 'auto', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={1} sx={{ backgroundColor: '#fff' }}>
        <Toolbar sx={{ justifyContent: 'center', minHeight: 56 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontFamily: "'Kanit', sans-serif",
              color: '#333',
              fontSize: 20,
            }}
          >
            ก-ฮ พยัญชนะไทย
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 4 }}>
        <AlphabetGrid />
      </Box>
    </Box>
  );
};

export default AlphabetPage;
