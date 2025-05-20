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
      const fileName = `${userId}/${Date.now()}-${fileData.fileName}`;
      if (fileData.file instanceof File) {
        const { error: storageError } = await supabase.storage
          .from('card-images')
          .upload(fileName, fileData.file, {
            upsert: false,
            metadata: { user_id: userId }
          });
        if (storageError) {
          console.error('Error uploading file:', storageError);
          return;
        }
        const { data: urlData } = supabase.storage
          .from('card-images')
          .getPublicUrl(fileName);
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
      fetchCards();
    } catch (error) {
      console.error('Error in addCard:', error);
    }
  };

    useEffect(() => {
    const fetchUserAndCards = async (session) => {
      if (!session) {
        setLoggedIn(false);
        setUserId(null);
        setUsername('');
        setLoading(false);
        return;
      }

      setLoggedIn(true);
      setUserId(session.user.id);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profileData) {
        console.error('Error fetching profile:', profileError);
        setUsername('');
      } else {
        setUsername(profileData.username || '');
      }

      await fetchCards();
      setLoading(false);
    };

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchUserAndCards(session);
    });

    // Listen for changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        fetchUserAndCards(session);
      }
    );

    return () => {
      subscription?.unsubscribe?.();
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