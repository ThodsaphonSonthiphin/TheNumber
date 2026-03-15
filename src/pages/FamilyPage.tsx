import React from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import FamilyList from '../components/FamilyList';

const FamilyPage: React.FC = () => {
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
            ครอบครัว
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 4 }}>
        <FamilyList />
      </Box>
    </Box>
  );
};

export default FamilyPage;
