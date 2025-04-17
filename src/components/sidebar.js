import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box, ListItemIcon, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Box
      component="nav"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(to bottom, #1a237e, #303f9f)',  // Blue gradient background
          color: 'white',
          paddingTop: 2,
          paddingBottom: 2,
        },
      }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },  // Only show on larger screens
        }}
      >
        <List>
          <Typography variant="h5" sx={{ padding: 2, fontWeight: 'bold' }}>
            SuperMarket
          </Typography>
          <ListItem button component={Link} to="/" sx={{ '&:hover': { backgroundColor: '#3949ab' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button component={Link} to="/add-item" sx={{ '&:hover': { backgroundColor: '#3949ab' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Item" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button component={Link} to="/modify-item" sx={{ '&:hover': { backgroundColor: '#3949ab' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Modify Item" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button component={Link} to="/check-inventory" sx={{ '&:hover': { backgroundColor: '#3949ab' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Check Inventory" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button component={Link} to="/shopping-list" sx={{ '&:hover': { backgroundColor: '#3949ab' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Shopping List" sx={{ color: 'white' }} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
