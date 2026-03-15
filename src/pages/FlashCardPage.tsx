import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FlashCard from '../components/FlashCard';

const FlashCardPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: { xs: '100%', sm: '400px', md: '560px', lg: '640px' },
        mx: 'auto',
        minHeight: '100vh',
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 1.5, sm: 2, md: 3 },
          py: 1.5,
          backgroundColor: '#fff',
          borderBottom: '1px solid #eee',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '17px', sm: '20px', md: '24px' },
            fontWeight: 700,
            color: '#333',
          }}
        >
          Flash Cards
        </Typography>
      </Box>

      <FlashCard />
    </Box>
  );
};

export default FlashCardPage;
