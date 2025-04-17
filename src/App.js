// src/App.js
import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import EntryManager from "./components/EntryManager";
import Register from "./components/Register";
import Sidebar from './components/sidebar';
import AddItem from "./components/AddItem";
import ModifyItem from "./components/ModifyItem";
import CheckInventory from "./components/CheckInventory";
import ShoppingList from "./components/ShoppingList";
import { auth } from "./components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => signOut(auth);
  const toggleRegister = () => setShowRegister((prev) => !prev);

  return (
    <Router>
      <CssBaseline />
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Entry Calculator
          </Typography>
          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {!user ? (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              {!showRegister ? (
                <Login onLogin={setUser} />
              ) : (
                <Register onRegister={setUser} />
              )}
              <Button
                onClick={toggleRegister}
                sx={{ mt: 2, width: "100%" }}
              >
                {showRegister
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Button>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <div className="app-layout" style={{ display: "flex" }}>
          <Sidebar />
          <main style={{ flexGrow: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<EntryManager user={user} />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/modify-item" element={<ModifyItem />} />
              <Route path="/check-inventory" element={<CheckInventory />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;
