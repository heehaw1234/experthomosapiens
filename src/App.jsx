import { useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NavBar from './components/NavBar.jsx';

const Card = ({ title, url }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const toggleLike = () => {
    setHasLiked(!hasLiked);
    setLikeCount(prev => (hasLiked ? prev - 1 : prev + 1));
  };

  const handleDownload = () => {
    window.location.href = url;
  };

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <p>Likes: {likeCount}</p>
      <a href={url} className="card_img" target="_blank" rel="noreferrer">
        <img className="card_img" src={url} alt="Card" />
      </a>
      <button onClick={handleDownload}>Download</button>
      <button className="likebtn" onClick={toggleLike}>
        {hasLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

const Funcbar = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    onFileUpload({ title: file.name, url: fileURL });
  };

  return (
    <div id="functionbar">
      <button onClick={() => fileInputRef.current.click()}>Upload File</button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*,application/pdf"
      />
    </div>
  );
};

const Dashboard = ({ cards, onFileUpload, searchTerm, onSearch }) => {
  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Funcbar onFileUpload={onFileUpload} />
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="card_blk">
        {filteredCards.map((card, index) => (
          <Card key={index} title={card.title} url={card.url} />
        ))}
      </div>
      <div id="bottomspace1" />
      <div className="bottombar" />
      <div id="bottomspace2" />
    </>
  );
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addCard = (fileData) => {
    setCards(prev => [...prev, fileData]);
  };

  return (
    <div className="app">
      <BrowserRouter basename="/experthomosapiens">
        <NavBar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
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
