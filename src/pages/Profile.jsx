import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase.js';
import './Profile.css';
import defaultPP from '../assets/defaultPP.png';
import Card from "../components/Card";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profilePicture, setProfilePicture] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [likedCards, setLikedCards] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data: { user }} = await supabase.auth.getUser();
                const userId = user?.id;

                const {data, error} = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id',userId)
                    .single();
                setUserData(data);
                if (error) {
                    console.error('Error fetching profile:', error);
                    return;
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchLikedCards = async () => {
            setLoading(true);
            // Get current user
            const { data: { session } } = await supabase.auth.getSession();
            const userId = session?.user?.id;
            if (!userId) {
                setLikedCards([]);
                setLoading(false);
                return;
            }

            // Fetch liked card ids from the 'likes' table (matching your Card component)
            const { data: liked, error: likedError } = await supabase
                .from("likes")
                .select("card_id")
                .eq("user_id", userId);

            if (likedError || !liked || liked.length === 0) {
                setLikedCards([]);
                setLoading(false);
                return;
            }

            const cardIds = liked.map(l => l.card_id);

            // Fetch card details
            const { data: cards, error: cardsError } = await supabase
                .from("cards")
                .select("*")
                .in("id", cardIds);

            if (cardsError) {
                setLikedCards([]);
            } else {
                setLikedCards(cards);
            }
            setLoading(false);
        };

        fetchLikedCards();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    // Remove the handleUnlikeCard function since the Card component handles its own likes

    if (loading) return <div>Loading profile...</div>

    console.log(userData);
    return (
        <div className='profile-container'>
            <img src={defaultPP} alt='Loading Profile Picture...' className='profile-picture'></img><br />
            Username: {userData?.username} <br />
            Email: {userData?.email} <br />
            
            <h2>YOUR LIKED CARDS</h2>
            {likedCards.length === 0 ? (
                <p>No liked cards found.</p>
            ) : (
                <div className="liked-cards-container">
                    {likedCards.map(card => (
                        <Card
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            url={card.url}
                            type={card.type}
                            likeCount={card.like_count}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;