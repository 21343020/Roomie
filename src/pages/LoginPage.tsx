import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Divider,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Admin login - check for either username 'budi' or email 'budi@admin.com'
    if ((loginData.email === 'budi' || loginData.email === 'budi@admin.com') && loginData.password === '12345678') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Budi Administrator');
      navigate('/admin/dashboard');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userName', data.name);
        navigate(data.role === 'owner' ? '/owner/dashboard' : '/user/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: '#f5f5f5',
      }}
    >
      {/* Left side - Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          maxWidth: '600px',
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 8 }}>
          <Box
            component="img"
            src="/images/logo.svg"
            alt="Roomie"
            sx={{ height: 40 }}
          />
        </Box>

        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Login
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Kindly fill in your details below to create an account
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email or Username"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                bgcolor: '#2f2f2f',
                '&:hover': {
                  bgcolor: '#1f1f1f',
                },
                textTransform: 'none',
                py: 1.5,
                mb: 3,
              }}
            >
              Login
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  textDecoration: 'none',
                  color: '#4CAF50',
                  fontWeight: 'bold',
                }}
              >
                Register
              </Link>
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Or
            </Typography>
          </Divider>

          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 1,
              }}
            >
              <GoogleIcon />
            </IconButton>
            <IconButton
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 1,
              }}
            >
              <AppleIcon />
            </IconButton>
            <IconButton
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 1,
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 1,
              }}
            >
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* Right side - Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          backgroundImage: 'url(/images/apartment.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Box>
  );
};

export default LoginPage; 