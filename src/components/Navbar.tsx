import { Box, Button, Container, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      switch (userRole) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'owner':
          navigate('/owner/dashboard');
          break;
        case 'user':
          navigate('/user/dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        py: 2,
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo */}
          <Box
            component="img"
            src="/images/logo.svg"
            alt="Roomie"
            sx={{ 
              height: 40, 
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
            onClick={handleLogoClick}
          />

          {/* Menu Items */}
          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            sx={{ color: '#2f2f2f' }}
          >
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 500,
              }}
            >
              Beranda
            </Link>
            <Link
              to="/tentang-kami"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 500,
              }}
            >
              Tentang Kami
            </Link>
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 500,
              }}
            >
              Masuk Sebagai Pemilik Kos
            </Link>
          </Stack>

          {/* Auth Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                color: '#4CAF50',
                borderColor: '#4CAF50',
                '&:hover': {
                  borderColor: '#45a049',
                  backgroundColor: 'rgba(76, 175, 80, 0.04)',
                },
                textTransform: 'none',
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                bgcolor: '#4CAF50',
                '&:hover': {
                  bgcolor: '#45a049',
                },
                textTransform: 'none',
              }}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar; 