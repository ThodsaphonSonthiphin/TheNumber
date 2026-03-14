import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FlashCard from '../components/FlashCard';

const FlashCardPage: React.FC = () => {
  const navigate = useNavigate();

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
          justifyContent: 'space-between',
          px: { xs: 1.5, sm: 2, md: 3 },
          py: 1.5,
          backgroundColor: '#fff',
          borderBottom: '1px solid #eee',
        }}
      >
        <Button
          onClick={() => navigate('/')}
          sx={{
            px: { xs: 1.5, sm: 1.5 },
            py: 1,
            fontSize: { xs: '14px', sm: '16px', md: '18px' },
            fontWeight: 600,
            color: '#555',
            backgroundColor: '#f5f5f5',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            textTransform: 'none',
            minWidth: 0,
            '&:hover': {
              backgroundColor: '#ececec',
            },
          }}
        >
          ◀️ กลับ
        </Button>
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
        <Box sx={{ width: { xs: 60, sm: 70 } }} />
      </Box>

      <FlashCard />
    </Box>
  );
};

export default FlashCardPage;
