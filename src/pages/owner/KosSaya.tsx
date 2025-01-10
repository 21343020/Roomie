import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

interface KosFormData {
  namaKos: string;
  jenisCatering: string;
  deskripsi: string;
  tahunBerdiri: string;
  alamatLengkap: string;
  peraturanKos: string;
  fasilitas: string;
  ketersediaanKamar: string;
  hargaKos: string;
  metodePembayaran: string;
}

const KosSaya = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<KosFormData>({
    namaKos: '',
    jenisCatering: '',
    deskripsi: '',
    tahunBerdiri: '',
    alamatLengkap: '',
    peraturanKos: '',
    fasilitas: '',
    ketersediaanKamar: '',
    hargaKos: '',
    metodePembayaran: '',
  });

  // State untuk menyimpan foto-foto
  const [fotoKos, setFotoKos] = useState<File[]>([]);
  const [fotoKamar, setFotoKamar] = useState<File[]>([]);
  const [fotoKamarMandi, setFotoKamarMandi] = useState<File[]>([]);
  const [fotoFasilitas, setFotoFasilitas] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleImageUpload = (type: 'kos' | 'kamar' | 'kamarMandi' | 'fasilitas') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      switch (type) {
        case 'kos':
          setFotoKos(prev => [...prev, ...files]);
          break;
        case 'kamar':
          setFotoKamar(prev => [...prev, ...files]);
          break;
        case 'kamarMandi':
          setFotoKamarMandi(prev => [...prev, ...files]);
          break;
        case 'fasilitas':
          setFotoFasilitas(prev => [...prev, ...files]);
          break;
      }
    }
  };

  const handleRemoveImage = (type: 'kos' | 'kamar' | 'kamarMandi' | 'fasilitas', index: number) => {
    switch (type) {
      case 'kos':
        setFotoKos(prev => prev.filter((_, i) => i !== index));
        break;
      case 'kamar':
        setFotoKamar(prev => prev.filter((_, i) => i !== index));
        break;
      case 'kamarMandi':
        setFotoKamarMandi(prev => prev.filter((_, i) => i !== index));
        break;
      case 'fasilitas':
        setFotoFasilitas(prev => prev.filter((_, i) => i !== index));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi submit form
    console.log(formData);
  };

  const renderImageUploadSection = (
    title: string,
    type: 'kos' | 'kamar' | 'kamarMandi' | 'fasilitas',
    files: File[],
  ) => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {files.map((file, index) => (
          <Grid item xs={4} key={index}>
            <Paper
              sx={{
                p: 1,
                position: 'relative',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover',
                }}
              />
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  bgcolor: 'rgba(255,255,255,0.8)',
                }}
                onClick={() => handleRemoveImage(type, index)}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 1,
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed',
              borderColor: 'divider',
            }}
          >
            <input
              accept="image/*"
              type="file"
              id={`upload-${type}`}
              multiple
              hidden
              onChange={handleImageUpload(type)}
            />
            <label htmlFor={`upload-${type}`}>
              <IconButton component="span">
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">
          {isEditing ? 'Edit Kos' : 'Tambah Kos Baru'}
        </Typography>
      </Stack>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Kos"
                name="namaKos"
                value={formData.namaKos}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Jenis Katering Penyewa</InputLabel>
                <Select
                  name="jenisCatering"
                  value={formData.jenisCatering}
                  label="Jenis Katering Penyewa"
                  onChange={handleInputChange}
                >
                  <MenuItem value="putra">Putra</MenuItem>
                  <MenuItem value="putri">Putri</MenuItem>
                  <MenuItem value="campur">Campur</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deskripsi Kos"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                multiline
                rows={3}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tahun Kos Berdiri"
                name="tahunBerdiri"
                type="number"
                value={formData.tahunBerdiri}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Alamat Lengkap Kost"
                name="alamatLengkap"
                value={formData.alamatLengkap}
                onChange={handleInputChange}
                multiline
                rows={2}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Peraturan Kos"
                name="peraturanKos"
                value={formData.peraturanKos}
                onChange={handleInputChange}
                multiline
                rows={2}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Fasilitas</InputLabel>
                <Select
                  name="fasilitas"
                  value={formData.fasilitas}
                  label="Fasilitas"
                  onChange={handleInputChange}
                >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ketersediaan Kamar"
                name="ketersediaanKamar"
                type="number"
                value={formData.ketersediaanKamar}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Harga Kos"
                name="hargaKos"
                type="number"
                value={formData.hargaKos}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Metode Pembayaran</InputLabel>
                <Select
                  name="metodePembayaran"
                  value={formData.metodePembayaran}
                  label="Metode Pembayaran"
                  onChange={handleInputChange}
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="transfer">Transfer Bank</MenuItem>
                  <MenuItem value="ewallet">E-Wallet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Foto Sections */}
          {renderImageUploadSection('Foto Kost', 'kos', fotoKos)}
          {renderImageUploadSection('Foto Kamar', 'kamar', fotoKamar)}
          {renderImageUploadSection('Foto Kamar Mandi', 'kamarMandi', fotoKamarMandi)}
          {renderImageUploadSection('Foto Fasilitas Bersama', 'fasilitas', fotoFasilitas)}

          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#4CAF50',
                '&:hover': {
                  bgcolor: '#45a049',
                },
              }}
            >
              {isEditing ? 'Simpan Perubahan' : 'Tambah Kos'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default KosSaya; 