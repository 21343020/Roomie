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
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`register-tabpanel-${index}`}
      aria-labelledby={`register-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user' // default role
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setFormData(prev => ({
      ...prev,
      role: newValue === 0 ? 'user' : 'owner'
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasi
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Terjadi kesalahan saat registrasi');
      }

      // Registrasi berhasil
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menghubungi server');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="register tabs"
            centered
          >
            <Tab label="Daftar Sebagai Penyewa" />
            <Tab label="Daftar Sebagai Pemilik Kos" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={tabValue}>
          <form onSubmit={handleRegister}>
            <Stack spacing={3}>
              <Typography variant="h5" align="center" gutterBottom>
                {tabValue === 0 ? 'Daftar Sebagai Penyewa' : 'Daftar Sebagai Pemilik Kos'}
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Nama Lengkap"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <TextField
                fullWidth
                label="Nomor Telepon"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Konfirmasi Password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: '#4CAF50',
                  '&:hover': {
                    bgcolor: '#45a049',
                  },
                }}
              >
                Daftar
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Sudah punya akun?{' '}
                  <Link to="/login" style={{ color: '#4CAF50', textDecoration: 'none' }}>
                    Masuk
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </form>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default RegisterPage; 