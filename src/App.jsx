import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './App.css';

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png" className="card_img" target="blank">
        <img
          className="card_img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"
          alt="Card image"
        />
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

const App = () => {
  return (
    <div className="app">
      <Topbar />
      <div className="card_blk">
        <Card title="Star Wars" />
        <Card title="Avatar" />
        <Card title="The Lion King" />
        <Card title="Transformers" />
        <Card title="Jurassic Park" />
        <Card title="Minecraft Movie" />
        <Card title="Jujutsu Kaisen" />
        <Card title="One Punch Man" />
        <Card title="Demon Slayer: Mugen Train" />
        <Card title="Chainsaw Man" />
        <Card title="Hunter X Hunter" />
        <Card title="Big Bang Theory" />
      </div>
    </div>
  );
};

export default App;
