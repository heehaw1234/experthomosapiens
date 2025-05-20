import { useState, useEffect } from 'react';
import './App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { auth, db } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const App = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  // Fetch all cards from Firestore
  const fetchCards = async () => {
    const querySnapshot = await getDocs(collection(db, "cards"));
    const cardsArr = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCards(cardsArr);
  };

  // Add a new card to Firestore
  const addCard = async (fileData) => {
    if (!auth.currentUser) return;
    await addDoc(collection(db, "cards"), {
      ...fileData,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      likeCount: 0
    });
    fetchCards(); // Refresh cards after adding
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.username) {
            setUsername(userData.username);
          } else {
            console.warn("No username field found in Firestore for this user.");
            setUsername("");
          }
        } else {
          console.warn("No user document found for UID:", user.uid);
          setUsername("");
        }
        await fetchCards(); // Fetch cards when user logs in
      } else {
        setLoggedIn(false);
        setUsername("");
        setCards([]); // Clear cards on logout
      }
      setLoading(false);
    });

    return () => unsubscribe();
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