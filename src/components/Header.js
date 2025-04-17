
import React from 'react';
import { Typography } from '@mui/material';

const Header = ({ title }) => {
  return (
    <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
      {title}
    </Typography>
  );
};

export default Header;
