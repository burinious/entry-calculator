// src/components/CheckInventory.js
import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

const CheckInventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inventory"));
        const itemsArray = [];
        querySnapshot.forEach((doc) => {
          itemsArray.push({ id: doc.id, ...doc.data() });
        });
        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, padding: 3 }}>

<Typography
  variant="h5"
  gutterBottom
  sx={{
    color: "primary.main", // Primary color for consistency with theme
    fontWeight: "bold", // Bold font weight to make the text stand out
    textAlign: "center", // Centered text horizontally
    fontSize: "2rem", // Custom font size for better visibility
    letterSpacing: "1px", // Slight letter spacing for a polished look
    lineHeight: 1.5, // Increase line height for better readability
    textTransform: "uppercase", // Uppercase letters for emphasis
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Optional: text shadow for added effect
    display: "flex", // Flexbox for centering vertically
    justifyContent: "center", // Center horizontally (if in flex container)
    alignItems: "center", // Center vertically (if in flex container)
    minHeight: "100px", // Set minimum height to ensure vertical centering works
  }}
>
  Inventory
</Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress size={50} color="primary" />
        </Box>
      ) : items.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" mt={3}>
          No items found in inventory.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "primary.dark" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Price
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "action.hover",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₦{item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CheckInventory;
