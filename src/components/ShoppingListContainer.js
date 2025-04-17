import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { formatCurrency } from '../utils/formatCurrency'; // Helper for formatting price

const ShoppingListContainer = ({ shoppingList }) => {
  if (!shoppingList || shoppingList.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6" color="textSecondary">
          No items found in the shopping list.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {shoppingList.map((item, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              transition: '0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {item.itemName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.quantity} x {formatCurrency(item.price)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShoppingListContainer;
