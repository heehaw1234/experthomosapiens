import { useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import Card from './components/Card.jsx';
import SearchBar from './components/SearchBar.jsx';
import About from './pages/About.jsx';
import Dashboard from './pages/Dashboard.jsx';





const App = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const addCard = (fileData) => {
    setCards(prev => [...prev, fileData]);
  };


  return (
    <div className="app">
      <BrowserRouter basename="/experthomosapiens">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                cards={cards}
                onFileUpload={addCard}
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
