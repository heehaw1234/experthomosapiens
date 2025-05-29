import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase.js';
import './Profile.css';
import defaultPP from '../assets/defaultPP.png';

const Profile = () => {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profilePicture, setProfilePicture] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
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

    if (loading) return <div>Loading profile...</div>

    console.log(userData);
    return (
        <div className='profile-container'>
            <img src={defaultPP} alt='Loading Profile Picture...' className='profile-picture'></img><br />
            Username: {userData.username} <br />
            Email: {userData.email} <br />
        </div>
    );



}

export default Profile;