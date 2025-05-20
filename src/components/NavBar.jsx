import './NavBar.css';
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { supabase } from "../supabase.js";

const NavBar = ({ loggedIn, setLoggedIn, username }) => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    const goToDashBoard = () => {
        navigate("/dashboard");
    }

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out:', error);
                return;
            }
            
            setLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    const goToLogin = () => {
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
                <Button className="btn" variant="outlined" onClick={handleLogout}>Logout</Button>
            </div>
        )
    }

    return (
        <div className="navbar">
            <div className="noteit" onClick={goToHome}>
                Noteit
            </div>
            <div
                style={{
                    fontSize: '18px',
                    color: '#6a4c93',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif'
                }}
            >{loggedIn ? `Welcome, ${username}` : ""}
            </div>
            {loggedIn ? loggedInButtons() : loggedOutButtons()}
        </div>
    );
};

export default NavBar;