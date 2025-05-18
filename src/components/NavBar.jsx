import './NavBar.css';
import {BrowserRouter, Route, Routes, useNavigate, Link} from "react-router-dom";
import {Button} from "@mui/material";

//add logic about if log in then change buttons to log out only
const NavBar = ({loggedIn, setLoggedIn}) => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    const goToDashBoard = () => {
        navigate("/dashboard");
    }

    const goToLogin = () => {
        setLoggedIn(false);
        navigate("/login");
    }

    const goToSignUp = () => {
        navigate("/signup");
    }

    const loggedOutButtons = () => {
        return(
            <div className="auth-buttons">
                <Button className="btn" variant="outlined" onClick={goToLogin}>Login</Button>
                <Button className="btn" variant="outlined" onClick={goToSignUp}>Sign Up</Button>
            </div>
        )
    }

    const loggedInButtons = () => {
        return(
            <div className="auth-buttons">
                <Button className="btn" variant="outlined" onClick={goToDashBoard}>Home</Button>
                <Button className="btn" variant="outlined" onClick={goToLogin}>Logout</Button>
            </div>
        )
    }

    return (
        <div className="navbar">
            <div className="noteit" onClick ={goToHome}>
                Noteit
            </div>
            {loggedIn ? loggedInButtons() : loggedOutButtons()}
        </div>
    );
};

export default NavBar;


