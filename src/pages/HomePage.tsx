import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { numbersData } from '../data/numbers';
import { useAppDispatch } from '../store/hooks';
import { setCurrentIndex } from '../store/flashCardSlice';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleStartFlashCards = () => {
    dispatch(setCurrentIndex(0));
    navigate('/flashcards');
  };

  const handleSelectNumber = (index: number) => {
    dispatch(setCurrentIndex(index));
    navigate('/flashcards');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
        py: { xs: 2, sm: 3, md: 4 },
        gap: { xs: 2, sm: 3, md: 4 },
        width: '100%',
        maxWidth: { xs: '100%', sm: '400px', md: '560px', lg: '640px' },
        mx: 'auto',
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
        <Typography sx={{ fontSize: { xs: '48px', sm: '64px', md: '80px' }, mb: 1, lineHeight: 1 }}>
          🔢
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '26px', sm: '32px', md: '38px' },
            fontWeight: 900,
            color: '#333',
          }}
        >
          เรียนรู้ตัวเลข
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '15px', sm: '18px', md: '22px' },
            fontWeight: 400,
            color: '#888',
          }}
        >
          สำหรับเด็ก 1-10
        </Typography>
      </Box>

      {/* Flash Card Menu Button */}
      <Button
        onClick={handleStartFlashCards}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          p: { xs: 2, sm: 2.5, md: 3 },
          backgroundColor: '#fff',
          border: '2px solid #eee',
          borderRadius: { xs: '16px', sm: '20px', md: '24px' },
          cursor: 'pointer',
          gap: { xs: 1.5, sm: 2 },
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textTransform: 'none',
          justifyContent: 'flex-start',
          '&:hover': {
            backgroundColor: '#fafafa',
          },
        }}
      >
        <Typography sx={{ fontSize: { xs: '32px', sm: '40px', md: '48px' }, lineHeight: 1 }}>
          🃏
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: '18px', sm: '22px', md: '26px' },
              fontWeight: 700,
              color: '#333',
            }}
          >
            Flash Cards
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              color: '#999',
            }}
          >
            เรียนรู้ตัวเลขทีละตัว
          </Typography>
        </Box>
        <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, color: '#ccc' }}>
          ▶
        </Typography>
      </Button>

      {/* Alphabet Menu Button */}
      <Button
        onClick={() => navigate('/alphabet')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          p: { xs: 2, sm: 2.5, md: 3 },
          backgroundColor: '#fff',
          border: '2px solid #eee',
          borderRadius: { xs: '16px', sm: '20px', md: '24px' },
          cursor: 'pointer',
          gap: { xs: 1.5, sm: 2 },
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textTransform: 'none',
          justifyContent: 'flex-start',
          '&:hover': {
            backgroundColor: '#fafafa',
          },
        }}
      >
        <Typography sx={{ fontSize: { xs: '32px', sm: '40px', md: '48px' }, lineHeight: 1 }}>
          🔤
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: '18px', sm: '22px', md: '26px' },
              fontWeight: 700,
              color: '#333',
            }}
          >
            ก-ฮ พยัญชนะ
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              color: '#999',
            }}
          >
            เรียนรู้พยัญชนะไทย กับเสียงสัตว์
          </Typography>
        </Box>
        <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, color: '#ccc' }}>
          ▶
        </Typography>
      </Button>

      {/* Color Game Menu Button */}
      <Button
        onClick={() => navigate('/color-game')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          p: { xs: 2, sm: 2.5, md: 3 },
          backgroundColor: '#fff',
          border: '2px solid #eee',
          borderRadius: { xs: '16px', sm: '20px', md: '24px' },
          cursor: 'pointer',
          gap: { xs: 1.5, sm: 2 },
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textTransform: 'none',
          justifyContent: 'flex-start',
          '&:hover': {
            backgroundColor: '#fafafa',
          },
        }}
      >
        <Typography sx={{ fontSize: { xs: '32px', sm: '40px', md: '48px' }, lineHeight: 1 }}>
          🎨
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: '18px', sm: '22px', md: '26px' },
              fontWeight: 700,
              color: '#333',
            }}
          >
            เกมทายสี
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              color: '#999',
            }}
          >
            ฝึกเรียนรู้สีภาษาไทย
          </Typography>
        </Box>
        <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, color: '#ccc' }}>
          ▶
        </Typography>
      </Button>

      {/* Number Grid */}
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '17px', sm: '20px', md: '24px' },
            fontWeight: 700,
            color: '#555',
            mb: { xs: 1, sm: 1.5 },
            textAlign: 'center',
          }}
        >
          เลือกตัวเลข
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 1.25, md: 1.75 }}>
          {numbersData.map((num, index) => (
            <Grid size={{ xs: 2.4 }} key={num.id}>
              <Button
                onClick={() => handleSelectNumber(index)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  aspectRatio: '1',
                  width: '100%',
                  minWidth: 0,
                  borderRadius: { xs: '12px', sm: '16px', md: '20px' },
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s ease',
                  gap: '2px',
                  p: 0.5,
                  backgroundColor: num.color,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: num.color,
                    opacity: 0.9,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '22px', sm: '28px', md: '36px' },
                    fontWeight: 900,
                    fontFamily: "'Fredoka', sans-serif",
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  {num.digit}
                </Typography>
                <Typography sx={{ fontSize: { xs: '14px', sm: '18px', md: '24px' }, lineHeight: 1 }}>
                  {num.emoji}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
