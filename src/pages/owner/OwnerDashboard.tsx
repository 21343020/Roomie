import { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Paper,
  Avatar,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import KosSaya from './KosSaya';
import Transaksi from './Transaksi';

const drawerWidth = 280;

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, value: 'dashboard' },
    { text: 'Kos Saya', icon: <HomeIcon />, value: 'kos' },
    { text: 'Transaksi', icon: <ReceiptIcon />, value: 'transaksi' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: 'white' }}>
      {/* Logo */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          component="img"
          src="/images/logo.svg"
          alt="Roomie"
          sx={{ height: 40 }}
        />
      </Box>
      <Divider />
      
      {/* Menu Items */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.value} disablePadding>
            <ListItemButton
              selected={selectedMenu === item.value}
              onClick={() => setSelectedMenu(item.value)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: '#4CAF50',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#45a049',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: selectedMenu === item.value ? 'white' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderDashboardContent = () => {
    const stats = [
      { label: 'Total Kos', value: '2', icon: '🏠' },
      { label: 'Total Penyewa', value: '10', icon: '👥' },
      { label: 'Penyewa Aktif', value: '3', icon: '✅' },
      { label: 'Total', value: '8', icon: '💰' },
    ];

    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Hi, Selamat Datang di Roomie Area!
        </Typography>

        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h2" sx={{ mb: 1 }}>
                  {stat.icon}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Ulasan Penyewa Kost
          </Typography>
          <Grid container spacing={3}>
            {[1, 2, 3].map((review) => (
              <Grid item xs={12} md={4} key={review}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar>U</Avatar>
                    <Box>
                      <Typography variant="subtitle1">User Name</Typography>
                      <Typography variant="caption" color="text.secondary">
                        2 days ago
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {"⭐".repeat(5)}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {selectedMenu}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Hello, {localStorage.getItem('userName') || 'Owner'}</Typography>
            <Avatar sx={{ bgcolor: '#4CAF50' }}>
              <PersonIcon />
            </Avatar>
            <IconButton onClick={handleLogout} color="inherit">
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          {selectedMenu === 'dashboard' && renderDashboardContent()}
          {selectedMenu === 'kos' && <KosSaya />}
          {selectedMenu === 'transaksi' && <Transaksi />}
        </Container>
      </Box>
    </Box>
  );
};

export default OwnerDashboard; 