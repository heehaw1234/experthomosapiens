import { useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './App.css';

const Card = ({ title, url }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <a href={url} className="card_img" target="_blank" rel="noreferrer">
        <img className="card_img" src={url} alt="Card image"/>
      </a>
      <a href={url} target="_blank">
        <button id="downloadtag" onClick={() => setHasDownloaded(!hasDownloaded)}>download</button>
      </a>
      <button className="likebtn" onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "✔" : "Like"}
      </button>
    </div>
  );
};

const Topbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="topbar">
      <div className="noteit">NoteIt</div>
      <div className="auth-buttons">
        <Button className="btn" variant="outlined" onClick={() => setOpen(true)}>Sign Up / Login</Button>
        <Dialog open={open} onClose={() => setOpen(false)} id="dialog_login">
          <DialogTitle>Login / Sign up</DialogTitle>
          <DialogContent className="dialog_content">Email</DialogContent>
          <input className="login" type="text" placeholder="Enter your email"/>
          <DialogContent className="dialog_content">Username</DialogContent>
          <input className="login" type="text" placeholder="Enter a Username"/>
          <DialogContent className="dialog_content">Password</DialogContent>
          <input className="login" type="text" placeholder="Enter your Password"/>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
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
      <input id="search_bar" placeholder="search here" type="text" />
    </div>
  );
};


const App = () => {
  const [cards, setCards] = useState([]);

  const handleFileChange = (fileData) => {
    setCards((prev) => [...prev, fileData]);
  };

  return (
    <div className="app">
      <Topbar />
      <Funcbar onFileUpload={handleFileChange} />

      <div className="card_blk">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} url={card.url} />
        ))}
      </div>

      <div id="bottomspace1"></div>
      <div className="bottombar"></div>
      <div id="bottomspace2"></div>
    </div>
  );
};

export default App;