import {useState} from "react";

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

export default Card;