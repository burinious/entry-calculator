import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import {
  Box,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit, Delete, FileDownload } from '@mui/icons-material';

const EntryManager = () => {
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [entry, setEntry] = useState({ name: '', price: '', quantity: '', date: '' });

  useEffect(() => {
    const savedEntries = localStorage.getItem('entries');
    if (savedEntries) setEntries(JSON.parse(savedEntries));
  }, []);

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEdit = () => {
    if (!entry.name || !entry.price || !entry.quantity) return;

    const newEntry = { ...entry, date: new Date().toLocaleString() };

    if (editIndex !== null) {
      const updated = [...entries];
      updated[editIndex] = newEntry;
      setEntries(updated);
      setEditIndex(null);
    } else {
      setEntries([...entries, newEntry]);
    }

    setEntry({ name: '', price: '', quantity: '', date: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEntry(entries[index]);
  };

  const handleDelete = (index) => {
    const filtered = entries.filter((_, i) => i !== index);
    setEntries(filtered);
  };

  const grandTotal = entries.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseFloat(item.quantity) || 0;
    return total + price * quantity;
  }, 0);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entries');
    XLSX.writeFile(wb, 'entries.xlsx');
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
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
      > Entry Management
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Item Name"
          name="name"
          value={entry.name}
          onChange={handleInputChange}
          sx={{ width: '100%', '& .MuiInputLabel-root': { color: 'secondary.main' } }}
        />
        <TextField
          label="Price (₦)"
          type="number"
          name="price"
          value={entry.price}
          onChange={handleInputChange}
          sx={{ width: '100%', '& .MuiInputLabel-root': { color: 'secondary.main' } }}
        />
        <TextField
          label="Quantity"
          type="number"
          name="quantity"
          value={entry.quantity}
          onChange={handleInputChange}
          sx={{ width: '100%', '& .MuiInputLabel-root': { color: 'secondary.main' } }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleAddOrEdit}
          sx={{
            width: '100%',
            '&:hover': { backgroundColor: 'success.dark' },
          }}
        >
          {editIndex !== null ? 'Update' : 'Add'}
        </Button>
        <Tooltip title="Export to Excel">
          <IconButton
            color="info"
            onClick={exportToExcel}
            sx={{
              '&:hover': { backgroundColor: 'info.light' },
            }}
          >
            <FileDownload />
          </IconButton>
        </Tooltip>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: 'grey.100' }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.light' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Price (₦)</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Total (₦)</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((item, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'grey.200' } }}>
                <TableCell>{item.name}</TableCell>
                <TableCell>₦{parseFloat(item.price).toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₦{(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEdit(index)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(index)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" align="right" sx={{ mt: 2, color: 'success.main' }}>
        Grand Total: ₦{grandTotal.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default EntryManager;
