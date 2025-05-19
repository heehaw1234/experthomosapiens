import { useState, useEffect } from 'react';
import './App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        const atIndex = user.email.indexOf('@');
        setUsername(user.email.substring(0, atIndex));
      } else {
        setLoggedIn(false);
        setUsername('');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addCard = (fileData) => {
    setCards(prev => [...prev, fileData]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <HashRouter>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} username={username} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/login" 
            element={
              loggedIn ? 
                <Navigate to="/dashboard" replace /> : 
                <Login setLoggedIn={setLoggedIn} />
            } 
          />
          <Route
            path="/dashboard"
            element={
              loggedIn ? 
                <Dashboard
                  cards={cards}
                  onFileUpload={addCard}
                  searchTerm={searchTerm}
                  onSearch={setSearchTerm}
                  username={username}
                /> :
                <Navigate to="/login" replace />
            }
          />
          <Route path="/" element={<Navigate to={loggedIn ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
