import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Typography from '@mui/material/Typography';
import { useNavBar } from './useNavBar';

const NavBar: React.FC = () => {
  const { activeIndex, handleNavigate, navItems } = useNavBar();

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        pb: 'env(safe-area-inset-bottom)',
      }}
    >
      <BottomNavigation
        value={activeIndex}
        onChange={(_, newValue) => handleNavigate(newValue)}
        showLabels
        sx={{
          maxWidth: { xs: '100%', sm: '430px', md: '600px', lg: '700px' },
          mx: 'auto',
          height: { xs: 64, sm: 72 },
          '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            px: 0.5,
            '& .MuiBottomNavigationAction-label': {
              fontSize: { xs: '11px', sm: '13px' },
              fontWeight: 600,
              mt: 0.25,
            },
            '&.Mui-selected': {
              color: '#FF6B6B',
              '& .MuiBottomNavigationAction-label': {
                fontSize: { xs: '11px', sm: '13px' },
              },
            },
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            icon={
              <Typography sx={{ fontSize: { xs: '24px', sm: '28px' }, lineHeight: 1 }}>
                {item.icon}
              </Typography>
            }
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default NavBar;
