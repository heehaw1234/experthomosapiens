import { useState, useEffect } from 'react';
import './App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { supabase } from './supabase.js';

const App = () => {
  const [cards, setCards] = useState([]);             //array of card objects
  const [searchTerm, setSearchTerm] = useState('');   // strings
  const [loggedIn, setLoggedIn] = useState(false);    // boolean
  const [loading, setLoading] = useState(true);       // boolean
  const [username, setUsername] = useState('');       // string
  const [userId, setUserId] = useState(null);         // string, else null

  // Fetch all cards from Supabase
  const fetchCards = async () => {                     //async behaves like a promise/ multithreading, uses wait and check so that other function is not blocked
    try {
      const { data, error } = await supabase.from('cards').select('*'); // fetch all cards, data is an array of objects which contains the card meta data, as seen in the cards table within supabase
      if (error) {
        console.error('Error fetching cards:', error);
        return;
      }
      setCards(data || []);                                             // uses empty array if data is null, truthy check, to set array of cards
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  // Add a new card to Supabase
  const addCard = async (fileData) => {                                   
    if (!userId) return;                                                    // allow check if user is logged in
    try {
      const fileName = `${userId}/${Date.now()}-${fileData.fileName}`;      // file storage name format inside of supabase
      if (fileData.file instanceof File) {                                  // preliminary check if file is a file object
        const { error: storageError } = await supabase.storage              // uploades to 'card-images' bucket in supabase
          .from('card-images')
          .upload(fileName, fileData.file, {
            upsert: false,                                                  // prevents overwriting existing files with the same name
            metadata: { user_id: userId }                                   // tag card with relevant metadata for backend, in this case user_id
          });
        if (storageError) {
          console.error('Error uploading file:', storageError);
          return;
        }
        const { data: urlData } = supabase.storage.from('card-images').getPublicUrl(fileName);    // retrieves public URL for the uploaded file
        const { error } = await supabase                                     // insert card data into the 'cards' table (separate from the file storage/bucket), no .storage syntax
          .from('cards')
          .insert({                                                          // upload file metadata to the database table                           
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
      } else {                                                              // if fileData is not a file object, assume it's a URL
        const { error } = await supabase                                    // upload file metadata to the database table                   
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
      fetchCards();                                                         // re render the cards after adding a new one
    } catch (error) {
      console.error('Error in addCard:', error);
    }
  };

  useEffect(() => {
    const fetchUserAndCards = async (session) => {                          // define a function to set variables based on the session
      if (!session) {
        setLoggedIn(false);
        setUserId(null);
        setUsername('');
        setLoading(false);
        return;
      }

      setLoggedIn(true);
      setUserId(session.user.id);

      const { data: profileData, error: profileError } = await supabase     // supabase creates an object with the data and error properties, which are destructured and stored in the profileData and profileError variables
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)                                          // filter the profile data(user.id) for the current logged-in user
        .single();

      if (profileError || !profileData) {                                   // check if there was an error fetching the profile data or if the data is null
        console.error('Error fetching profile:', profileError);
        setUsername('');
      } else {
        setUsername(profileData.username || '');                            // set the username state variable to the value from the profileData object
      }

      await fetchCards();                                                   // pause all other functions until the fetchCards function is complete
      setLoading(false);                                                    // set loading to false after the cards have been fetched
    };

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {        // check if user is logged in
      fetchUserAndCards(session);                                       // call the function to fetch user and cards if logged in
    });

    // Listen for changes
    const { data: subscription } = supabase.auth.onAuthStateChange(     // setup function to listen for changes in the authentication state at all times
      async (_event, session) => {
        fetchUserAndCards(session);                                     // updates relevant variables based on the session
      }
    );

    return () => {                                                      // cleanup function that unsubscribes from auth state changes when the component unmounts
      subscription?.unsubscribe?.();
    };
  }, []);                                                               // no prop array, so this runs once on mount only

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <HashRouter>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} username={username} />
        <Routes>                                                 {/* When the URL changes, the component in the Route that matches the URL will be rendered, like a switch statement matching the path to the designated route */}
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              loggedIn ?
                <Navigate to="/dashboard" replace /> :            // replaces the current history entry so that user can't go back to login after being redirected
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
          <Route path="/" element={<Navigate to={loggedIn ? "/dashboard" : "/login"} replace />} /> {/* Redirect to dashboard if logged in, else redirect to login, FALLBACK */}
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;