import React from 'react';
import { TextField, Button, Stack } from '@mui/material';

const ItemInput = ({ itemName, setItemName, price, setPrice, quantity, setQuantity, handleAddToShoppingList }) => {
  return (
    <Stack spacing={3}>
      <TextField
        label="Item Name"
        variant="outlined"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
      <TextField
        label="Price (₦)"
        variant="outlined"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
      <TextField
        label="Quantity"
        variant="outlined"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToShoppingList}
        size="large"
        sx={{
          '&:hover': { backgroundColor: '#2E6E9E' },
          padding: '10px 20px',
          fontWeight: 'bold',
        }}
      >
        Add to Shopping List
      </Button>
    </Stack>
  );
};

export default ItemInput;
