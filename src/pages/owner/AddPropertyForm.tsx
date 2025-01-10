import { useState, ChangeEvent } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  ImageList,
  ImageListItem,
  SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface PropertyData {
  name: string;
  address: string;
  price: string;
  description: string;
  type: string;
  facilities: string;
  rules: string;
}

const AddPropertyForm = () => {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    name: '',
    address: '',
    price: '',
    description: '',
    type: '',
    facilities: '',
    rules: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
      
      setImages(prev => [...prev, ...newImages]);
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasi
    if (!propertyData.name || !propertyData.address || !propertyData.price) {
      setError('Nama, alamat, dan harga harus diisi');
      return;
    }

    try {
      const formData = new FormData();
      (Object.keys(propertyData) as Array<keyof PropertyData>).forEach(key => {
        formData.append(key, propertyData[key]);
      });
      
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await fetch('/api/properties', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Reset form
        setPropertyData({
          name: '',
          address: '',
          price: '',
          description: '',
          type: '',
          facilities: '',
          rules: '',
        });
        setImages([]);
        setPreviewUrls([]);
        // Redirect atau tampilkan pesan sukses
      } else {
        const data = await response.json();
        setError(data.message || 'Terjadi kesalahan saat menambah properti');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menghubungi server');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Tambah Properti Kos
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Kos"
                name="name"
                value={propertyData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Alamat"
                name="address"
                value={propertyData.address}
                onChange={handleInputChange}
                multiline
                rows={2}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Harga per Bulan"
                name="price"
                type="number"
                value={propertyData.price}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipe Kos</InputLabel>
                <Select
                  name="type"
                  value={propertyData.type}
                  onChange={handleSelectChange}
                  label="Tipe Kos"
                >
                  <MenuItem value="putra">Kos Putra</MenuItem>
                  <MenuItem value="putri">Kos Putri</MenuItem>
                  <MenuItem value="campur">Kos Campur</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deskripsi"
                name="description"
                value={propertyData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fasilitas"
                name="facilities"
                value={propertyData.facilities}
                onChange={handleInputChange}
                multiline
                rows={2}
                placeholder="Contoh: AC, Kamar mandi dalam, Wifi, dll"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Peraturan Kos"
                name="rules"
                value={propertyData.rules}
                onChange={handleInputChange}
                multiline
                rows={2}
                placeholder="Contoh: Jam malam, Tamu, dll"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Foto-foto Kos
              </Typography>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                multiple
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AddPhotoAlternateIcon />}
                >
                  Upload Foto
                </Button>
              </label>

              <ImageList sx={{ mt: 2 }} cols={3} rowHeight={200}>
                {previewUrls.map((url, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      loading="lazy"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        bgcolor: 'rgba(255, 255, 255, 0.7)',
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Tambah Properti
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddPropertyForm; 