import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import NavBar from "./components/NavBar.jsx";

export default function App() {
    return (
        <BrowserRouter basename="/experthomosapiens">
            <NavBar />
            <Routes>
                <Route index element={<About />} />  {}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}
