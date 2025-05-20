import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { containerBox, authPaper, titleText, submitButton } from "../styles/authStyles";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { Link as MuiLink } from '@mui/material';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if username is unique
  const isUsernameUnique = async (username) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // Check username uniqueness
      const unique = await isUsernameUnique(username);
      if (!unique) {
        alert("Username is already taken. Please choose another.");
        setLoading(false);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        likedCards: []
      });
      alert("Account created! You can now log in.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
    setLoading(false);
  };

  return (
    <Box sx={containerBox}>
      <Paper elevation={6} sx={authPaper}>
        <Typography variant="h4" align="center" sx={titleText}>
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            variant="outlined"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={submitButton}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Box>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: '#555' }}
        >
          Already have an account?{' '}
          <MuiLink
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ color: '#6a4c93', fontWeight: 500 }}
          >
            Log In
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;