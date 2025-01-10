import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface FormData {
  namaLengkap: string;
  email: string;
  nomorTelepon: string;
  jenisKelamin: string;
  namaKos: string;
  alamatKos: string;
  durasi: string;
  tanggalMulai: string;
}

const RentApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: '',
    email: '',
    nomorTelepon: '',
    jenisKelamin: '',
    namaKos: '',
    alamatKos: '',
    durasi: '',
    tanggalMulai: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi pengiriman data ke backend
    console.log('Form submitted:', formData);
    // Redirect ke halaman sukses atau dashboard
    navigate('/user/dashboard');
  };

  const handleBack = () => {
    navigate(-1);
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
          <IconButton onClick={handleBack} edge="start" sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box
            component="img"
            src="/images/logo.svg"
            alt="Roomie"
            sx={{ height: 40, flexGrow: 0 }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ pt: 12, pb: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" color="primary" gutterBottom>
            Form Pengajuan Sewa Kos
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Lengkapi informasi berikut untuk memproses permohonan sewa kos Anda
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Nama Lengkap */}
              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  label="Nama Lengkap"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleInputChange}
                  required
                />
                {formData.namaLengkap && (
                  <CheckCircleIcon
                    sx={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'success.main',
                    }}
                  />
                )}
              </Box>

              {/* Email dan Nomor Telepon */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handleInputChange}
                  required
                />
              </Stack>

              {/* Jenis Kelamin */}
              <TextField
                fullWidth
                label="Jenis Kelamin"
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleInputChange}
                required
              />

              {/* Nama Kos dan Alamat */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Nama Kos"
                  name="namaKos"
                  value={formData.namaKos}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Alamat Kos"
                  name="alamatKos"
                  value={formData.alamatKos}
                  onChange={handleInputChange}
                  required
                />
              </Stack>

              {/* Durasi dan Tanggal Mulai */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Durasi Sewa"
                  name="durasi"
                  value={formData.durasi}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Tanggal Mulai Sewa"
                  name="tanggalMulai"
                  type="date"
                  value={formData.tanggalMulai}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#45a049' },
                }}
              >
                NEXT
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RentApplicationForm; 