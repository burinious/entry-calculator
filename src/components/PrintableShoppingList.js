// src/components/PrintableShoppingList.js
import React, { forwardRef } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Paper,
} from "@mui/material";

const PrintableShoppingList = forwardRef(({ shoppingList }, ref) => {
  return (
    <Paper ref={ref} elevation={3} sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Shopping List
      </Typography>
      <List>
        {shoppingList.map((item, index) => (
          <Box key={index}>
            <ListItem disablePadding>
              <ListItemText primary={`${index + 1}. ${item}`} />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Paper>
  );
});

export default PrintableShoppingList;
