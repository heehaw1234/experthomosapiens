import './Card.css';
import { useState } from "react";

const Card = ({ title, url, type }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const toggleLike = () => {
        setHasLiked(!hasLiked);
        setLikeCount(prev => (hasLiked ? prev - 1 : prev + 1));
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = title; // filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="card">
        <div id="cardtop">
            <h2 className="title">{title}</h2>
            <p id="likecount">Likes: {likeCount}</p>
        </div>
        <a href={url} className="card_img_container" target="_blank" rel="noreferrer">
            <img className="card_img" src={url} alt={title} />
        </a>
        <div id="cardbtns">
            <button className="likebtn" onClick={handleDownload}>Download</button>
            <button className={hasLiked ? "likedbtn" : "likebtn"} onClick={toggleLike}>
                {hasLiked ? '❤️' : '🤍'}
            </button>
        </div>
        </div>
    );
};

export default Card;