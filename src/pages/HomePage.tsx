import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Navigation from '../components/Navigation';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon sx={{ color: '#4CAF50' }} />
                <Typography variant="subtitle1" color="text.secondary">
                  Pencarian Kos Wilayah Padang
                </Typography>
              </Stack>
            </Box>

            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Temukan Kos Impianmu Dengan Mudah Dan Cepat Bersama{' '}
              <Box component="span" sx={{ color: '#4CAF50' }}>
                Roomie
              </Box>
            </Typography>
            
            <Typography color="text.secondary" paragraph>
              Platform Yang Mempermudah Pencarian Kos-Kosan Sesuai Kebutuhanmu, Dari Lokasi, Fasilitas, Hingga Budget, Lengkap Di Sini Untuk Menjadikan Proses Mencari Kos Lebih Praktis Dan Menyenangkan.
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: '#4CAF50',
                '&:hover': {
                  bgcolor: '#45a049',
                },
                textTransform: 'none',
                px: 4,
                py: 1.5,
              }}
            >
              Mulai Cari Kos
            </Button>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/apartment.png"
              alt="Kos Room"
              sx={{
                width: '100%',
                height: '500px',
                borderRadius: 4,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* About Section */}
      <Box 
        id="about-section"
        sx={{ 
          bgcolor: '#4CAF50', 
          mt: 12, 
          py: 8, 
          position: 'relative',
          scrollMarginTop: '80px', // Add padding for fixed header
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" color="white" align="center" gutterBottom>
            Tentang Kami
          </Typography>
          <Typography
            color="white"
            align="center"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            Roomie Hadir Khusus Untuk Memenuhi Kebutuhan Pencarian Kos Di Wilayah Kota Padang. Kami Fokus Menyediakan Berbagai Pilihan Kos Di Lokasi Strategis Dalam Kota Ini, Memastikan Pengguna Dapat Menemukan Tempat Tinggal Yang Nyaman, Sesuai Preferensi Dan Dalam Anggaran Yang Terjangkau. Dengan Layanan Yang Mudah Digunakan Dan Akses Cepat, Roomie Bertujuan Untuk Mempermudah Proses Pencarian Kos Bagi Siapa Saja Yang Berada Di Kota Padang.
          </Typography>
        </Container>
        {/* Arrow Pattern */}
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            color: '#45a049',
            opacity: 0.2,
            fontSize: 100,
          }}
        >
          ➤➤➤➤
        </Box>
      </Box>

      {/* Solutions Section */}
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Solusi Terbaik Untuk Pencarian Kos
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              01. Cepat & Efisien
            </Typography>
            <Typography color="text.secondary">
              Dengan Roomie, Temukan Kos Sesuai Lokasi, Fasilitas, Dan Budgetmu Hanya Dengan Sekali Klik.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              02. Pilihan Beragam
            </Typography>
            <Typography color="text.secondary">
              Roomie Menyediakan Berbagai Pilihan Kos Yang Berada Di Area Strategis, Dilengkapi Dengan Fasilitas Unggulan Untuk Memudahkan Kenyamananmu Sehari-hari.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              03. Terpercaya
            </Typography>
            <Typography color="text.secondary">
              Platform Ini Menghubungkanmu Terhubung Langsung Dengan Pemilik Kos Tanpa Melalui Perantara, Sehingga Lebih Transparan, Aman, Dan Dapat Dipercaya.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/kos-detail-1.png"
              alt="Kos Room 1"
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/kos-detail-2.png"
              alt="Kos Room 2"
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon />
                <Typography>+62 8523 0987</Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={3} justifyContent="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <FacebookIcon />
                  <Typography>@roomie</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <InstagramIcon />
                  <Typography>@roomie</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TwitterIcon />
                  <Typography>@roomie</Typography>
                </Stack>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Button
                  onClick={() => navigate('/login')}
                  variant="contained"
                  sx={{
                    bgcolor: '#4CAF50',
                    '&:hover': {
                      bgcolor: '#45a049',
                    },
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                  }}
                >
                  Mulai Cari Kos
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box 
            sx={{ 
              mt: 4, 
              pt: 4, 
              borderTop: '1px solid',
              borderColor: 'divider',
              textAlign: 'center'
            }}
          >
            <Typography color="text.secondary">
              © 2024 Roomie. Semua Hak Dilindungi Undang-Undang.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 