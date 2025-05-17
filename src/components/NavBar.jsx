import './NavBar.css';
import {BrowserRouter, Route, Routes, useNavigate, Link} from "react-router-dom";
import {Button} from "@mui/material";
import logo from "../assets/DONOTCLICK.png"

//add logic about if log in then change buttons to log out only
const NavBar = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    const goToLogin = () => {
        navigate("/login");
    }

    const goToSignUp = () => {
        navigate("/signup");
    }


    return (
        <div className="navbar">
            <div className="logo" onClick ={goToHome}>
                <img src= {logo} alt="About"/>
            </div>
            <div className="auth-buttons">

                <Button className="btn" variant="outlined" onClick={goToLogin}>Login</Button>
                <Button className="btn" variant="outlined" onClick={goToSignUp}>Sign Up</Button>
            </div>
        </div>
    );
};

export default NavBar;


