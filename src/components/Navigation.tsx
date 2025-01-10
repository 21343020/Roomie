import { Box, Button, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToAbout = () => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHome = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <Box sx={{ py: 2, px: 4, bgcolor: 'white', boxShadow: 1 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          component="img"
          src="/images/logo.svg"
          alt="Roomie"
          sx={{ height: 40, cursor: 'pointer' }}
          onClick={handleHome}
        />
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleHome}
            sx={{
              color: 'text.primary',
              '&:hover': { color: '#4CAF50' },
            }}
          >
            Beranda
          </Button>
          <Button
            onClick={handleScrollToAbout}
            sx={{
              color: 'text.primary',
              '&:hover': { color: '#4CAF50' },
            }}
          >
            Tentang Kami
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
} 