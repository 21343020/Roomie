import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  ImageList,
  ImageListItem,
  Divider,
  Paper,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  Person,
  Hotel,
  Wifi,
  LocalParking,
  AcUnit,
} from '@mui/icons-material';
import MainLayout from '../layouts/MainLayout';

// Mock property data
const mockProperty = {
  id: 1,
  title: 'Kos Exclusive Menteng',
  location: 'Jl. Menteng Raya No. 10, Jakarta Pusat',
  price: 2500000,
  type: 'Putri',
  description:
    'Kos exclusive dengan fasilitas lengkap di area premium Menteng. Lokasi strategis dekat dengan pusat kota dan akses transportasi umum.',
  facilities: [
    'AC',
    'Kamar Mandi Dalam',
    'WiFi',
    'Parkir Motor',
    'Dapur Bersama',
    'Security 24 Jam',
  ],
  images: [
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x600',
  ],
  rules: [
    'Tamu dilarang menginap',
    'Jam malam 23:00',
    'Tidak boleh membawa hewan peliharaan',
    'Tidak boleh merokok di dalam kamar',
  ],
};

const BookingPage = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    checkInDate: '',
    duration: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', bookingData);
    setShowSuccess(true);
    // Reset form
    setBookingData({
      name: '',
      phone: '',
      checkInDate: '',
      duration: '',
    });
  };

  return (
    <MainLayout>
      <Container>
        <Grid container spacing={3}>
          {/* Property Details */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {mockProperty.title}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <LocationOn /> {mockProperty.location}
              </Typography>
            </Box>

            {/* Image Gallery */}
            <ImageList
              sx={{ width: '100%', height: 450, mb: 3 }}
              cols={2}
              rowHeight={220}
            >
              {mockProperty.images.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image}
                    alt={`Property image ${index + 1}`}
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>

            {/* Description */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Deskripsi
              </Typography>
              <Typography paragraph>{mockProperty.description}</Typography>

              <Divider sx={{ my: 2 }} />

              {/* Facilities */}
              <Typography variant="h6" gutterBottom>
                Fasilitas
              </Typography>
              <Grid container spacing={2}>
                {mockProperty.facilities.map((facility, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {facility.includes('AC') && <AcUnit />}
                      {facility.includes('WiFi') && <Wifi />}
                      {facility.includes('Parkir') && <LocalParking />}
                      <Typography>{facility}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Rules */}
              <Typography variant="h6" gutterBottom>
                Peraturan Kos
              </Typography>
              <ul>
                {mockProperty.rules.map((rule, index) => (
                  <li key={index}>
                    <Typography>{rule}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>

          {/* Booking Form */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Booking Kamar
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  Rp {mockProperty.price.toLocaleString('id-ID')}/bulan
                </Typography>

                {showSuccess && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Booking berhasil! Tim kami akan menghubungi Anda segera.
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Nama Lengkap"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Nomor Telepon"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Tanggal Check-in"
                    name="checkInDate"
                    type="date"
                    value={bookingData.checkInDate}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Durasi Sewa (bulan)"
                    name="duration"
                    type="number"
                    value={bookingData.duration}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 3 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Booking Sekarang
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default BookingPage; 