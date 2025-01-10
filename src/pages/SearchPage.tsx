import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  CardActionArea,
  Paper,
} from '@mui/material';
import MainLayout from '../layouts/MainLayout';

// Mock data for search results
const mockProperties = [
  {
    id: 1,
    title: 'Kos Exclusive Menteng',
    location: 'Jakarta Pusat',
    price: 2500000,
    type: 'Putri',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi'],
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    title: 'Kos Premium Kemang',
    location: 'Jakarta Selatan',
    price: 3000000,
    type: 'Putra',
    facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi', 'TV'],
    image: 'https://via.placeholder.com/300x200',
  },
  // Add more mock properties as needed
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [priceRange, setPriceRange] = useState<number[]>([1000000, 5000000]);
  const [type, setType] = useState('all');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  useEffect(() => {
    // Filter properties based on search criteria
    const filtered = mockProperties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = type === 'all' || property.type === type;
      const matchesPrice =
        property.price >= priceRange[0] && property.price <= priceRange[1];

      return matchesSearch && matchesType && matchesPrice;
    });

    setFilteredProperties(filtered);
  }, [searchQuery, type, priceRange]);

  return (
    <MainLayout>
      <Container>
        <Grid container spacing={3}>
          {/* Filters */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filter
              </Typography>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Cari"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tipe Kos</InputLabel>
                  <Select
                    value={type}
                    label="Tipe Kos"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value="all">Semua</MenuItem>
                    <MenuItem value="Putra">Putra</MenuItem>
                    <MenuItem value="Putri">Putri</MenuItem>
                    <MenuItem value="Campur">Campur</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ px: 1 }}>
                  <Typography gutterBottom>Range Harga</Typography>
                  <Slider
                    value={priceRange}
                    onChange={(_, newValue) => setPriceRange(newValue as number[])}
                    valueLabelDisplay="auto"
                    min={1000000}
                    max={5000000}
                    step={100000}
                    valueLabelFormat={(value) =>
                      `Rp ${value.toLocaleString('id-ID')}`
                    }
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      Rp {priceRange[0].toLocaleString('id-ID')}
                    </Typography>
                    <Typography variant="body2">
                      Rp {priceRange[1].toLocaleString('id-ID')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Search Results */}
          <Grid item xs={12} md={9}>
            <Typography variant="h5" gutterBottom>
              Hasil Pencarian
            </Typography>
            <Grid container spacing={2}>
              {filteredProperties.map((property) => (
                <Grid item xs={12} sm={6} key={property.id}>
                  <Card>
                    <CardActionArea
                      onClick={() => navigate(`/booking/${property.id}`)}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={property.image}
                        alt={property.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h3">
                          {property.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {property.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tipe: {property.type}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {property.facilities.map((facility, index) => (
                            <Typography
                              key={index}
                              variant="body2"
                              component="span"
                              sx={{
                                mr: 1,
                                px: 1,
                                py: 0.5,
                                bgcolor: 'grey.100',
                                borderRadius: 1,
                                display: 'inline-block',
                                mb: 0.5,
                              }}
                            >
                              {facility}
                            </Typography>
                          ))}
                        </Box>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                          Rp {property.price.toLocaleString('id-ID')}/bulan
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default SearchPage; 