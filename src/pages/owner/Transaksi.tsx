import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Stack,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Transaction {
  id: number;
  name: string;
  kosName: string;
  date: string;
  status: 'selesai' | 'proses';
  amount?: string;
}

const Transaksi = () => {
  // Mock data untuk statistik
  const stats = [
    { label: 'Pendapatan Kotor', value: 'Rp5.000.000', icon: '💰' },
    { label: 'Transaksi Selesai', value: '10', icon: '✅' },
    { label: 'Transaksi Yang Sedang Diproses', value: '3', icon: '⏳' },
    { label: 'Kamar Kost Tersedia', value: '1', icon: '🏠' },
  ];

  // Mock data untuk riwayat transaksi
  const transactions: Transaction[] = [
    {
      id: 1,
      name: 'Hendro Arifin',
      kosName: 'Rumah Sewa Kos',
      date: 'Tanggal Pembayaran',
      status: 'selesai',
    },
    {
      id: 2,
      name: 'Fendi Rahman',
      kosName: 'Rumah Sewa Kos',
      date: 'Tanggal Pembayaran',
      status: 'selesai',
    },
    {
      id: 3,
      name: 'Rivan Ardi',
      kosName: 'Rumah Sewa Kos',
      date: 'Tanggal Pembayaran',
      status: 'selesai',
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Transaksi
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Hi, Pemilik, Selamat Datang di Roomie Area!
      </Typography>

      {/* Statistik Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ mb: 2, fontSize: '2rem' }}>{stat.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {stat.value}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Riwayat Transaksi */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Riwayat Transaksi
        </Typography>
        <Stack spacing={2}>
          {transactions.map((transaction) => (
            <Paper
              key={transaction.id}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ sm: 'center' }}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar>{transaction.name[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle1">{transaction.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {transaction.kosName}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {transaction.date}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircleIcon color="success" />
                  <Typography variant="body2" color="success.main">
                    Pembayaran Selesai
                  </Typography>
                </Stack>

                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ minWidth: 100 }}
                >
                  Lihat Detail
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Transaksi; 