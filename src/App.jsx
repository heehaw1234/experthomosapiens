import { useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './App.css';

const Card = ({ title, url }) => {
  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <a href={url} className="card_img" target="_blank" rel="noreferer">
        <img className="card_img" src={url} alt="Card image"/>
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

const Bottombar = () => {
  return (
    <div className="bottombar">

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

        <Card title="Star Wars" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="Avatar" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="The Lion King" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="Transformers" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="Jurassic Park" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="Minecraft Movie" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="Jujutsu Kaisen" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="One Punch Man" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="Demon Slayer: Mugen Train" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="Chainsaw Man" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="Hunter X Hunter" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
        <Card title="Big Bang Theory" url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"/>
      </div>

      <div id="bottomspace1"></div>
      <Bottombar />
      <div id="bottomspace2"></div>
    </div>
  );
};

export default App;
