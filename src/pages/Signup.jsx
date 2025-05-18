import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { containerBox , authPaper, titleText, submitButton} from "../styles/authStyles";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { sendPasswordResetEmail } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/dashboard"); // or redirect wherever you want after sign up
    } catch (error) {
        console.error("Signup Error:", error.message);
        alert(error.message);
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
            sx= { containerBox }
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
                    Sign Up
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
                    <TextField
                        variant="outlined"
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={
                            submitButton
                        }
                    >
                        Sign Up
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
                        to="/Login"
                        underline="hover"
                        sx={{ color: '#6a4c93', fontWeight: 500 }}
                    >
                    Login
                    </MuiLink>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Signup;
