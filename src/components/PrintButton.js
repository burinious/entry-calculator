// src/components/PrintButton.js
import React from "react";
import { Button, Box } from "@mui/material";

const PrintButton = ({ handlePrintToPDF }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrintToPDF}
        fullWidth
        sx={{
          padding: "12px 0",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#3f51b5", // Darker shade of blue for hover
          },
        }}
      >
        Print Shopping List
      </Button>
    </Box>
  );
};

export default PrintButton;
