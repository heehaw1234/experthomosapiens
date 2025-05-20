import './Card.css';
import { useState, useEffect } from "react";
import { supabase } from "../supabase.js";

const Card = ({ id, title, url, type, likeCount: initialLikeCount }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUserId(session.user.id);
                
                // Check if user has already liked this card
                const { data: likeData } = await supabase
                    .from('likes')
                    .select('*')
                    .eq('card_id', id)
                    .eq('user_id', session.user.id)
                    .single();
                
                if (likeData) {
                    setHasLiked(true);
                }
            }
        };
        
        fetchUserData();
    }, [id]);

    const toggleLike = async () => {
        if (!userId) return;
        
        try {
            if (hasLiked) {
                // Remove like
                const { error: deleteError } = await supabase
                    .from('likes')
                    .delete()
                    .eq('card_id', id)
                    .eq('user_id', userId);
                
                if (deleteError) {
                    console.error('Error removing like:', deleteError);
                    return;
                }
                
                // Update card like count
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
                // Add like
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
                
                // Update card like count
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