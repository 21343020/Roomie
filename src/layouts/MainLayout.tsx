import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}
          >
            Mamikos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography
              component={Link}
              to="/search"
              sx={{ textDecoration: 'none', color: 'white' }}
            >
              Cari Kos
            </Typography>
          </Box>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            variant="outlined"
            sx={{ ml: 2 }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, bgcolor: 'grey.200' }}>
        <Container>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Mamikos Clone. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout; 