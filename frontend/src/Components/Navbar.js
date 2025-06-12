import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const myDrawer = (
    <div>

        
    </div>
  )

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Form', icon: <FormatAlignJustifyIcon />, path: '/forms' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  ];

  const list = (
    <Box
      sx={{ width: '100%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={currentPath === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      {/* Top Navbar Bar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          bgcolor: 'primary.main', // blue background
          display: 'flex',
          alignItems: 'center',
          px: 2,
          zIndex: 1300, // ensure it's above other content
        }}
      >
        <Button
          onClick={toggleDrawer(true)}
          sx={{ color: 'white', minWidth: 'auto' }}
        >
          <MenuIcon />
        </Button>
        <Box sx={{ color: 'white', ml: 2, fontWeight: 'bold', fontSize: '18px' }}>
          Inquizo
        </Box>
      </Box>

      {/* Top Drawer */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: 64 }} />
    </React.Fragment>
  );
}
