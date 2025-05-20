import { useState, useEffect } from 'react';
import './App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { supabase } from './supabase.js';

const App = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);

  // Fetch all cards from Supabase
  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*');
      
      if (error) {
        console.error('Error fetching cards:', error);
        return;
      }
      
      setCards(data || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  // Add a new card to Supabase
  const addCard = async (fileData) => {
    if (!userId) return;
    
    try {
      // First, upload the file to Supabase Storage
      const fileName = `${userId}/${Date.now()}-${fileData.fileName}`;
      
      // If fileData contains a File object
      if (fileData.file instanceof File) {
        const { data: storageData, error: storageError } = await supabase.storage
          .from('card-images')
          .upload(fileName, fileData.file, {
            upsert: false,
            metadata: { user_id: userId }
          });

        if (storageError) {
          console.error('Error uploading file:', storageError);
          return;
        }
        
        // Get the public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from('card-images')
          .getPublicUrl(fileName);
          
        // Add record to the cards table
        const { error } = await supabase
          .from('cards')
          .insert({
            title: fileData.title,
            url: urlData.publicUrl,
            type: fileData.file.type,
            created_by: userId,
            created_at: new Date().toISOString(),
            like_count: 0
          });
          
        if (error) {
          console.error('Error adding card to database:', error);
          return;
        }
      } else {
        // For cases where we already have a URL (like from object URL)
        const { error } = await supabase
          .from('cards')
          .insert({
            title: fileData.title,
            url: fileData.url,
            type: fileData.type || 'image',
            created_by: userId,
            created_at: new Date().toISOString(),
            like_count: 0
          });
          
        if (error) {
          console.error('Error adding card to database:', error);
          return;
        }
      }
      
      fetchCards(); // Refresh cards after adding
    } catch (error) {
      console.error('Error in addCard:', error);
    }
  };

  useEffect(() => {
    // Check for active session on component mount
    const checkSession = async () => {
      try {
        console.log("Checking session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error checking session:', error);
          setLoading(false);
          return;
        }
        console.log("Session:", session);
        if (session) {
          setLoggedIn(true);
          setUserId(session.user.id);
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', session.user.id)
            .single();
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else if (profileData) {
            setUsername(profileData.username || '');
          }
          await fetchCards();
        }
        setLoading(false);
      } catch (error) {
        console.error('Error in checkSession:', error);
        setLoading(false);
      }
    };
    
    // Set up auth state change listener
    const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setLoggedIn(true);
        setUserId(session.user.id);
        
        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else if (profileData) {
          setUsername(profileData.username || '');
        }
        
        await fetchCards();
      } else if (event === 'SIGNED_OUT') {
        setLoggedIn(false);
        setUsername('');
        setUserId(null);
        setCards([]);
      }
    });
    
    checkSession();
    
    // Clean up subscription on unmount
    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <HashRouter>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} username={username} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/login" 
            element={
              loggedIn ? 
                <Navigate to="/dashboard" replace /> : 
                <Login setLoggedIn={setLoggedIn} />
            } 
          />
          <Route
            path="/dashboard"
            element={
              loggedIn ? 
                <Dashboard
                  cards={cards}
                  onFileUpload={addCard}
                  searchTerm={searchTerm}
                  onSearch={setSearchTerm}
                  username={username}
                /> :
                <Navigate to="/login" replace />
            }
          />
          <Route path="/" element={<Navigate to={loggedIn ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;