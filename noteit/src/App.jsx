import { useState } from 'react';
import './App.css';

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className="card_container">
      <h2 className="title">{title}</h2>
      <img
        className="card_img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png"
        alt="Card image"
      />
      <button className="likebtn" onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "✔" : "Like"}
      </button>
    </div>
  );
};

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="noteit">NoteIt</div>
      <div className="auth-buttons">
        <button className="btn">Sign In</button>
        <button className="btn">Login</button>
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
        <Card title="Niggertron" />
        <Card title="Jurassic Park" />
        <Card title="Minecraft Movie" />
      </div>
    </div>
  );
};

export default App;
