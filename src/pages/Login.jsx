import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { containerBox, authPaper, titleText, submitButton } from "../styles/authStyles"
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { sendPasswordResetEmail } from "firebase/auth";

const Login = ({setLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in as:", userCredential.user.email);
            setLoggedIn(true);
            navigate("/dashboard"); // change route to your actual main page
        } catch (error) {
            console.error("Login failed:", error.message);
            alert("Login failed: " + error.message);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            alert("Please enter your email address above first.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent. Check your inbox.");
        } catch (error) {
            console.error("Reset failed:", error.message);
            alert("Failed to send reset email: " + error.message);
        }
    };

    return (
        <Box
            sx={ containerBox }
        >
            <Paper
                elevation={6}
                sx={ authPaper }
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={ titleText }
                >
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
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
                    <Button
                        type="submit"
                        variant="contained"
                        sx={ submitButton }
                    >
                        Log In
                    </Button>
                    <Button
                        onClick={handlePasswordReset}
                        variant="text"
                        sx={{ color: '#6a4c93', textTransform: 'none' }}
                    >
                        Forgot your password?
                    </Button>
                </Box>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 3, color: '#555' }}
                >
                    Don&apos;t have an account?{' '}
                    <MuiLink
                        component={RouterLink}
                        to="/signup"
                        underline="hover"
                        sx={{ color: '#6a4c93', fontWeight: 500 }}
                    >
                    Sign Up
                    </MuiLink>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
