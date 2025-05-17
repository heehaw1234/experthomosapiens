import { useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate, Link} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import NavBar from "./components/NavBar.jsx";


const Card = ({ title, url }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleLikeClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if (newClickCount % 2 === 1) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
    setHasLiked(!hasLiked);
  };

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <p id="likecount">Likes: {likeCount}</p>
      <a href={url} className="card_img" target="_blank" rel="noreferrer">
        <img className="card_img" src={url} alt="Card image" />
      </a>
      <button id="downloadtag" onClick={() => {setHasDownloaded(!hasDownloaded); window.location.href = url;}}>download</button>
      <button className="likebtn" onClick={handleLikeClick}>
        {hasLiked ? '❤️' : 'Like'}
      </button>
    </div>
  );
};

const Funcbar = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);      // element name of the file

  const handleButtonClick = () => {
    fileInputRef.current.click();         // triggers hidden file input below in return
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    const fileName = file.name;

    onFileUpload({ title: fileName, url: fileURL });
  };

  return (
    <div id="functionbar">
      <button onClick={handleButtonClick}>Upload File</button>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*,application/pdf"/>
    </div>
  );
};


const App = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCards = cards.filter(card =>     // Filter cards based on the search term
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (fileData) => {
    setCards((prev) => [...prev, fileData]);
  };

  return (
    <div className="app">
      <BrowserRouter basename="/experthomosapiens">
        <NavBar />
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
      <Funcbar onFileUpload={handleFileChange} />
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="card_blk">
          {filteredCards.map((card, index) => (
            <Card key={index} title={card.title} url={card.url} />
          ))}
        </div>
      </div>
      <div id="bottomspace1"></div>
      <div className="bottombar"></div>
      <div id="bottomspace2"></div>
    </div>
  );
};

export default App;