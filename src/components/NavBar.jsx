import React, { useState } from "react";
import './NavBar.css';
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";

const NavBar = ({ loggedIn, setLoggedIn, username }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const goToDashBoard = () => {
        navigate("/dashboard");
    };

    const goToLogin = () => {
        setLoggedIn(false);
        navigate("/login");
    };

    const goToSignUp = () => {
        navigate("/signup");
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDashboardClick = () => {
        handleMenuClose();
        goToDashBoard();
    };

    const loggedOutButtons = () => (
        <div className="auth-buttons">
            <Button className="btn" variant="outlined" onClick={goToLogin}>Login</Button>
            <Button className="btn" variant="outlined" onClick={goToSignUp}>Sign Up</Button>
        </div>
    );

    const loggedInButtons = () => (
        <div className="auth-buttons">
            <Button
                className="btn"
                variant="outlined"
                onClick={handleMenuOpen}
                aria-controls={anchorEl ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? 'true' : undefined}
            >
                {username}
            </Button>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
                <MenuItem onClick={goToLogin}>Logout</MenuItem>
            </Menu>
        </div>
    );

    return (
        <div className="navbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="noteit" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                Noteit
            </div>
            <div style={{ marginLeft: "auto" }}>
                {loggedIn ? loggedInButtons() : loggedOutButtons()}
            </div>
        </div>
    );
};

export default NavBar;