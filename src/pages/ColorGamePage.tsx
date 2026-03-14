import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography, AppBar, Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ColorGameBoard from '../components/ColorGameBoard';

const ColorGamePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 430, mx: 'auto', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={1} sx={{ backgroundColor: '#fff' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 56 }}>
          <IconButton onClick={() => navigate('/')} sx={{ color: '#555' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontFamily: "'Kanit', sans-serif",
              color: '#333',
              fontSize: 20,
            }}
          >
            Color Quiz
          </Typography>
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 4 }}>
        <ColorGameBoard />
      </Box>
    </Box>
  );
};

export default ColorGamePage;
