import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  AppBar,
  Toolbar,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

// Mock data untuk daftar kos
const kosList = [
  {
    id: 1,
    name: 'KOS PUTRI PERMATA',
    location: 'Jl. Sisingamangaraja, Kecamatan Padang Barat, Kota Padang',
    rating: 4.5,
    rooms: 2,
    price: 1500000,
    image: '/images/kos1.png'
  },
  {
    id: 2,
    name: 'KOS PUTRI AYNAYA',
    location: 'Jl. Siteba Simpang Haru, Kecamatan Padang Timur, Kota Padang',
    rating: 4.6,
    rooms: 1,
    price: 800000,
    image: '/images/kos2.png'
  },
  {
    id: 3,
    name: 'KOS PUTRI MIRANDA',
    location: 'Jl. Pemuda No.23, Olo, Kecamatan Padang Barat',
    rating: 4.7,
    rooms: 3,
    price: 1000000,
    image: '/images/kos3.png'
  }
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi pencarian
    console.log('Searching for:', searchQuery);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: 'white', 
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src="/images/logo.svg"
            alt="Roomie"
            sx={{ height: 40, flexGrow: 0 }}
            onClick={() => navigate('/user/dashboard')}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Hello, {localStorage.getItem('userName') || 'User'}</Typography>
            <Avatar sx={{ bgcolor: '#4CAF50' }}>
              <PersonIcon />
            </Avatar>
            <IconButton onClick={handleLogout} color="inherit">
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ pt: 10, pb: 4 }}>
        {/* Hero Section with Search */}
        <Box
          sx={{
            position: 'relative',
            height: 300,
            borderRadius: 4,
            overflow: 'hidden',
            mb: 4,
          }}
        >
          <Box
            component="img"
            src="/images/hero-bg.png"
            alt="Hero"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 3,
            }}
          >
            <Typography variant="h4" color="white" gutterBottom align="center">
              Temukan Kos Impianmu
            </Typography>
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                width: '100%',
                maxWidth: 600,
                bgcolor: 'white',
                borderRadius: 2,
                p: 0.5,
              }}
            >
              <TextField
                fullWidth
                placeholder="Masukan nama lokasi/area/alamat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& fieldset': { border: 'none' } }}
              />
            </Box>
          </Box>
        </Box>

        {/* Daftar Kos */}
        <Typography variant="h5" gutterBottom>
          Rekomendasi Kos Untuk Anda
        </Typography>
        <Grid container spacing={3}>
          {kosList.map((kos) => (
            <Grid item xs={12} sm={6} md={4} key={kos.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={kos.image}
                  alt={kos.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {kos.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <LocationOnIcon color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {kos.location}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <StarIcon sx={{ color: '#FFB400' }} fontSize="small" />
                      <Typography variant="body2">{kos.rating}/5</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Tersedia {kos.rooms} kamar
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" color="primary">
                      {formatPrice(kos.price)}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        /Bulan
                      </Typography>
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/kos/${kos.id}`)}
                      sx={{
                        bgcolor: '#4CAF50',
                        '&:hover': {
                          bgcolor: '#45a049',
                        },
                      }}
                    >
                      Lihat Detail
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State untuk Kos yang Belum Terdaftar */}
        <Box
          sx={{
            mt: 4,
            p: 4,
            bgcolor: 'white',
            borderRadius: 2,
            textAlign: 'center',
            border: '1px dashed',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Kos Lainnya Akan Segera Hadir
          </Typography>
          <Typography color="text.secondary">
            Pemilik kos sedang dalam proses mendaftarkan properti mereka.
            Silakan cek kembali nanti.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default UserDashboard; 