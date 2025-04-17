import React from 'react';
import { Typography } from '@mui/material';

const TotalPrice = ({ total }) => {
  return (
    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
      Total: ₦{total.toFixed(2)}
    </Typography>
  );
};

export default TotalPrice;
