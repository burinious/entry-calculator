// src/components/AddItem.js
import React, { useState } from 'react';
import { db } from '../components/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Fade
} from '@mui/material';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleAddItem = async () => {
    if (!itemName || !price || !quantity) {
      setFeedback({
        open: true,
        message: 'Please fill out all fields',
        severity: 'warning',
      });
      return;
    }

    if (parseFloat(price) <= 0 || parseInt(quantity, 10) <= 0) {
      setFeedback({
        open: true,
        message: 'Price and Quantity must be positive numbers',
        severity: 'warning',
      });
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'inventory'), {
        name: itemName,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        timestamp: new Date(),
      });

      setFeedback({
        open: true,
        message: 'Item added successfully!',
        severity: 'success',
      });

      setItemName('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding document: ', error);
      setFeedback({
        open: true,
        message: 'Failed to add item',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 3,
        backgroundColor: '#fff',
        '@media (max-width: 600px)': {
          maxWidth: '90%',
        },
        transition: 'all 0.3s ease', // Smooth transition for all changes
      }}
    >
      {/* Title Section */}
      <Fade in={true} timeout={600}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            color: '#1976d2',
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '1.8rem' },
          }}
        >
          {loading ? 'Adding Item...' : 'Add Item to Inventory'}
        </Typography>
      </Fade>

      {/* Item Name Input */}
      <TextField
        fullWidth
        label="Item Name"
        variant="outlined"
        margin="normal"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        autoFocus
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': {
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
          },
          '& .Mui-focused': {
            borderColor: '#1976d2',
          },
        }}
      />

      {/* Price Input */}
      <TextField
        fullWidth
        label="Price"
        type="number"
        variant="outlined"
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        inputProps={{
          min: 0,
          step: '0.01',
        }}
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': {
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
          },
          '& .Mui-focused': {
            borderColor: '#1976d2',
          },
        }}
      />

      {/* Quantity Input */}
      <TextField
        fullWidth
        label="Quantity"
        type="number"
        variant="outlined"
        margin="normal"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        inputProps={{
          min: 1,
        }}
        sx={{
          marginBottom: 3,
          '& .MuiInputBase-root': {
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
          },
          '& .Mui-focused': {
            borderColor: '#1976d2',
          },
        }}
      />

      {/* Submit Button with Loading State */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        disabled={loading}
        sx={{
          padding: '14px',
          fontWeight: 'bold',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
          textTransform: 'none',
          transition: 'all 0.3s ease', // Smooth transition for hover
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Add Item'
        )}
      </Button>

      {/* Feedback Snackbar */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={feedback.severity}
          onClose={() => setFeedback({ ...feedback, open: false })}
          sx={{
            width: '100%',
            borderRadius: 2,
            padding: '10px',
            backgroundColor:
              feedback.severity === 'success'
                ? '#388e3c'
                : feedback.severity === 'error'
                ? '#d32f2f'
                : '#fbc02d',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddItem;
