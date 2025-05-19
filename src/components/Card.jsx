import {useState} from "react";
import './Card.css';

const Card = ({ title, url, type }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState(url);

  const toggleLike = () => {
    setHasLiked(!hasLiked);
    setLikeCount(prev => (hasLiked ? prev - 1 : prev + 1));
  };

  const handleDownload = () => {
    window.location.href = url;
  };

  return (
    <div className="card">
      <div id="cardtop">
        <h2 className="title">{title}</h2>
        <p id="likecount">Likes: {likeCount}</p>
      </div>
      <a href={url} className="card_img" target="_blank" rel="noreferrer">
        <img className="card_img" src={thumbnailUrl} alt="Card" />
      </a>
      <button onClick={handleDownload}>Download</button>
      <button className="likebtn" onClick={toggleLike}>
        {hasLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default Card;