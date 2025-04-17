import React, { useState } from 'react';
import { Container, Paper, Divider, Typography } from '@mui/material';
import { jsPDF } from 'jspdf';
import Header from './Header';
import ItemInput from './ItemInput';
import ShoppingListContainer from './ShoppingListContainer';
import TotalPrice from './TotalPrice';
import PrintButton from './PrintButton';

const ShoppingList = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  // Add item to shopping list
  const handleAddToShoppingList = () => {
    if (itemName && price && quantity) {
      setShoppingList((prevList) => [
        ...prevList,
        { itemName, price: parseFloat(price), quantity: parseInt(quantity) },
      ]);
      setItemName('');
      setPrice('');
      setQuantity('');
    } else {
      alert('Please fill out all fields');
    }
  };

  // Calculate the total price of the shopping list
  const calculateTotal = () =>
    shoppingList.reduce((total, item) => total + item.price * item.quantity, 0);

  // Print the shopping list to PDF
  const handlePrintToPDF = () => {
    const doc = new jsPDF();
    doc.text('Shopping List', 14, 20);
    doc.text('Item', 14, 30);
    doc.text('Quantity', 100, 30);
    doc.text('Price', 150, 30);

    shoppingList.forEach((item, index) => {
      const y = 40 + index * 10;
      doc.text(item.itemName, 14, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`₦${item.price.toFixed(2)}`, 150, y);
    });

    const total = calculateTotal();
    doc.text('Total: ₦' + total.toFixed(2), 14, 50 + shoppingList.length * 10);
    doc.save('shopping-list.pdf');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={5} sx={{ p: 4, borderRadius: 3, backgroundColor: '#f7f7f7' }}>
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
      > <Header title="Shopping List" /></Typography> 

        {/* Item Input Section */}
        <ItemInput
          itemName={itemName}
          setItemName={setItemName}
          price={price}
          setPrice={setPrice}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToShoppingList={handleAddToShoppingList}
        />

        <Divider sx={{ my: 4 }} />

        {/* Shopping List Header */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main', // Ensure the header stands out
            textAlign: 'center', // Center the header text
          }}
        >
          Items:
        </Typography>

        {/* Shopping List Container */}
        <ShoppingListContainer shoppingList={shoppingList} />

        {/* Total Price */}
        <TotalPrice total={calculateTotal()} />

        {/* Print Button */}
        <PrintButton handlePrintToPDF={handlePrintToPDF} />
      </Paper>
    </Container>
  );
};

export default ShoppingList;
