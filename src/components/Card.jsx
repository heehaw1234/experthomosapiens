import './Card.css';
import { useState, useEffect } from "react";
import { supabase } from "../supabase.js";

// SVG icons as React components
const DownloadIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path d="M10 3v10m0 0l-4-4m4 4l4-4M4 17h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LikeIcon = ({ filled }) => (
  <span
    style={{
      fontSize: "2rem",
      display: "inline-block",
      verticalAlign: "middle",
      color: filled ? "#f43f5e" : "#f43f5e",
      filter: filled ? "none" : "grayscale(1) opacity(0.6)"
    }}
    role="img"
    aria-label={filled ? "liked" : "like"}
  >
    ❤️
  </span>
);

const Card = ({ id, title, url, type, likeCount: initialLikeCount }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
    const [userId, setUserId] = useState(null);
    const [modCode, setModCode] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUserId(session.user.id);
                const { data: likeData } = await supabase
                    .from('likes')
                    .select('*')
                    .eq('card_id', id)
                    .eq('user_id', session.user.id)
                    .single();
                if (likeData) setHasLiked(true);
            }
        };
        fetchUserData();
    }, [id]);

    useEffect(() => {
        const fetchModCode = async () => {
            const {data: modCode} = await supabase
                .from('cards')
                .select("*")
                .eq('id', id)
                .single();
            if (modCode && modCode.module_code) setModCode(modCode.module_code);
        }
        fetchModCode();
    }, [])

    const toggleLike = async () => {
        if (!userId) return;
        try {
            if (hasLiked) {
                const { error: deleteError } = await supabase
                    .from('likes')
                    .delete()
                    .eq('card_id', id)
                    .eq('user_id', userId);
                if (deleteError) {
                    console.error('Error removing like:', deleteError);
                    return;
                }
                const { error: updateError } = await supabase
                    .from('cards')
                    .update({ like_count: likeCount - 1 })
                    .eq('id', id);
                if (updateError) {
                    console.error('Error updating card:', updateError);
                    return;
                }
                setHasLiked(false);
                setLikeCount(prev => prev - 1);
            } else {
                const { error: insertError } = await supabase
                    .from('likes')
                    .insert({
                        card_id: id,
                        user_id: userId,
                        created_at: new Date().toISOString()
                    });
                if (insertError) {
                    console.error('Error adding like:', insertError);
                    return;
                }
                const { error: updateError } = await supabase
                    .from('cards')
                    .update({ like_count: likeCount + 1 })
                    .eq('id', id);
                if (updateError) {
                    console.error('Error updating card:', updateError);
                    return;
                }
                setHasLiked(true);
                setLikeCount(prev => prev + 1);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = title || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        } catch (err) {
            alert('Failed to download file.');
        }
    };


    return (
        <div className="card dark-card">
            <div className="cardtop">

                <h3 className="mod-title">{modCode}</h3>
                <h2 className="title">{title}</h2>
                <p className="likecount">{likeCount} <span role="img" aria-label="likes">❤️</span></p>
            </div>
            <div className="card-content-grow">
                <a href={url} className="card_img_container" target="_blank" rel="noreferrer">
                    <img className="card_img" src={url} alt={title} />
                </a>
            </div>
            <div className="cardbtns">
                <button className="downloadbtn" onClick={handleDownload} title="Download">
                    <DownloadIcon />
                </button>
                <button
                    className={hasLiked ? "likedbtn" : "likebtn"}
                    onClick={toggleLike}
                    aria-pressed={hasLiked}
                    title={hasLiked ? "Unlike" : "Like"}
                >
                    <LikeIcon filled={hasLiked} />
                </button>
            </div>
        </div>
    );
};

export default Card;