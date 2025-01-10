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
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Kelola Pengguna', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Kelola Kos', icon: <HomeIcon />, path: '/admin/properties' },
    { text: 'Transaksi', icon: <ReceiptIcon />, path: '/admin/transactions' },
    { text: 'Laporan', icon: <AssessmentIcon />, path: '/admin/reports' },
    { text: 'Pengaturan', icon: <SettingsIcon />, path: '/admin/settings' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => setSelectedMenu(item.text)}
            selected={selectedMenu === item.text}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  // Mock data for dashboard
  const dashboardData = {
    totalUsers: 150,
    totalProperties: 45,
    activeBookings: 28,
    pendingApprovals: 5,
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
          <Typography variant="body1" sx={{ mr: 2 }}>
            Hello, {localStorage.getItem('userName') || 'Admin'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
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
            display: { xs: 'none', sm: 'block' },
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Pengguna
                  </Typography>
                  <Typography variant="h4">{dashboardData.totalUsers}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Kos
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.totalProperties}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Booking Aktif
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.activeBookings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Menunggu Persetujuan
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.pendingApprovals}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Activities Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Aktivitas Terbaru
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  • Kos baru ditambahkan oleh pemilik kos (2 menit yang lalu)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Booking baru dari user123 (15 menit yang lalu)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Pembayaran diterima untuk Kos Menteng (1 jam yang lalu)
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 