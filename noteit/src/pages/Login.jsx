import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Link
} from '@mui/material';
import {containerBox, authPaper, titleText, submitButton} from "../styles/authStyles"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: handle Firebase login
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
                </Box>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 3, color: '#555' }}
                >
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/signup"
                        underline="hover"
                        sx={{ color: '#6a4c93', fontWeight: 500 }}
                    >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
