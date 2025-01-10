import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BedIcon from '@mui/icons-material/Bed';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WeekendIcon from '@mui/icons-material/Weekend';
import ChairIcon from '@mui/icons-material/Chair';
import ShowerIcon from '@mui/icons-material/Shower';
import GroupIcon from '@mui/icons-material/Group';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Mock data untuk detail kos
const kosDetail = {
  id: 1,
  name: 'KOS PUTRA RAMADI',
  location: 'Jl Prof. Dr. Hamka Air Tawar Padang, West Sumatra, West Sumatra, Air Tawar Barat Kec. Padang Utara',
  rating: 4.7,
  rooms: 1,
  price: 1000000,
  mainImage: '/images/kos-detail-1.png',
  images: [
    '/images/kos-detail-1.png',
    '/images/kos-detail-2.png',
    '/images/kos-detail-3.png',
  ],
  specifications: [
    {
      icon: <BedIcon />,
      text: 'Ukuran kamar 3x4 meter'
    },
    {
      icon: <ElectricBoltIcon />,
      text: 'Termasuk listrik'
    }
  ],
  facilities: [
    {
      icon: <AcUnitIcon />,
      text: 'Air Conditioner (AC)'
    },
    {
      icon: <WeekendIcon />,
      text: 'Kasur'
    },
    {
      icon: <ChairIcon />,
      text: 'Lemari'
    },
    {
      icon: <ShowerIcon />,
      text: 'Kamar Mandi Dalam'
    },
    {
      icon: <ChairIcon />,
      text: 'Kloset Duduk'
    },
    {
      icon: <ShowerIcon />,
      text: 'Shower'
    }
  ],
  rules: [
    {
      icon: <GroupIcon />,
      text: 'Tipe ini bisa diisi maks. 2 orang/kamar'
    },
    {
      icon: <NoMeetingRoomIcon />,
      text: 'Tidak untuk pasutri'
    },
    {
      icon: <AccountBalanceWalletIcon />,
      text: 'Deposit Rp100.000 dikembalikan di akhir periode sewa jika tidak ditemukan kerusakan pada kamar.'
    }
  ]
};

const KosDetail = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? kosDetail.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === kosDetail.images.length - 1 ? 0 : prev + 1
    );
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <IconButton 
        onClick={handleBack}
        sx={{ mb: 2 }}
        aria-label="back"
      >
        <ArrowBackIcon /> <Typography sx={{ ml: 1 }}>Back</Typography>
      </IconButton>

      <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, p: 3 }}>
        {/* Image Gallery */}
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Box
            component="img"
            src={kosDetail.mainImage}
            alt={kosDetail.name}
            sx={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {kosDetail.images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image}
                alt={`thumbnail ${index + 1}`}
                sx={{
                  width: 80,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: currentImageIndex === index ? '2px solid #4CAF50' : 'none',
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </Stack>
          <IconButton
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              '&:hover': { bgcolor: 'white' },
            }}
            onClick={handlePrevImage}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              '&:hover': { bgcolor: 'white' },
            }}
            onClick={handleNextImage}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>

        {/* Kos Information */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              {kosDetail.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <LocationOnIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {kosDetail.location}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <StarIcon sx={{ color: '#FFB400' }} fontSize="small" />
                <Typography variant="body2">{kosDetail.rating}/5</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Tersedia {kosDetail.rooms} kamar
              </Typography>
            </Stack>
            <Typography variant="h6" color="primary" gutterBottom>
              {formatPrice(kosDetail.price)}
              <Typography component="span" variant="body2" color="text.secondary">
                /Bulan
              </Typography>
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/rent-application')}
                sx={{
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#45a049' },
                }}
              >
                AJUKAN SEWA
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#45a049' },
                }}
              >
                TANYA PENYEWA
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/* Spesifikasi */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Spesifikasi Tipe Kamar
          </Typography>
          <Stack spacing={2}>
            {kosDetail.specifications.map((spec, index) => (
              <Stack key={index} direction="row" alignItems="center" spacing={2}>
                <Box sx={{ color: 'text.secondary' }}>{spec.icon}</Box>
                <Typography>{spec.text}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Fasilitas */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Fasilitas
          </Typography>
          <Grid container spacing={2}>
            {kosDetail.facilities.map((facility, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ color: 'text.secondary' }}>{facility.icon}</Box>
                  <Typography>{facility.text}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Peraturan Khusus */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Peraturan Khusus
          </Typography>
          <Stack spacing={2}>
            {kosDetail.rules.map((rule, index) => (
              <Stack key={index} direction="row" alignItems="center" spacing={2}>
                <Box sx={{ color: 'text.secondary' }}>{rule.icon}</Box>
                <Typography>{rule.text}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default KosDetail; 