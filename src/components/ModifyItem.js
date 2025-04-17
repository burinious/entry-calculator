// src/components/ModifyItem.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Alert,
} from "@mui/material";
import { db } from "../components/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const ModifyItem = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inventory"));
        const itemsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchItems();
  }, []);

  const handleModifyItem = async () => {
    const item = items.find((item) => item.id === selectedItemId);

    if (item && newPrice && newQuantity) {
      const itemRef = doc(db, "inventory", item.id);
      try {
        await updateDoc(itemRef, {
          price: parseFloat(newPrice),
          quantity: parseInt(newQuantity, 10),
        });
        setSuccessMessage(`Item "${item.name}" updated successfully!`);
        setNewPrice("");
        setNewQuantity("");
      } catch (err) {
        console.error("Update failed: ", err);
      }
    } else {
      alert("Please select an item and fill in both price and quantity.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
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
          Modify Inventory Item
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel id="item-select-label" color="secondary">
            Select Item
          </InputLabel>
          <Select
            labelId="item-select-label"
            value={selectedItemId}
            label="Select Item"
            onChange={(e) => setSelectedItemId(e.target.value)}
            sx={{
              backgroundColor: "background.default",
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              },
            }}
          >
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="New Price (₦)"
          type="number"
          fullWidth
          margin="normal"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          sx={{
            borderRadius: "8px",
            backgroundColor: "background.default",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        />

        <TextField
          label="New Quantity"
          type="number"
          fullWidth
          margin="normal"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          sx={{
            borderRadius: "8px",
            backgroundColor: "background.default",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            padding: 1.5,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          onClick={handleModifyItem}
        >
          Modify Item
        </Button>
      </Box>
    </Container>
  );
};

export default ModifyItem;
