import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Link
} from '@mui/material';
import { containerBox , authPaper, titleText, submitButton} from "../styles/authStyles";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: handle Firebase Signup
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
                        Log In
                    </Button>
                </Box>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 3, color: '#555' }}
                >
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        underline="hover"
                        sx={{ color: '#6a4c93', fontWeight: 500 }}
                    >
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Signup;
