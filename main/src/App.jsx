import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState(() => {
    // Load notes from localStorage on initial render
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes([
      ...notes,
      {
        id: Date.now().toString(),
        ...newNote,
        createdAt: new Date().toISOString(),
        isPublic: true,
      }
    ]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updatedNote } : note
    ));
  };

  return (
    <div className="app-container">
      <Header />
      <NoteForm addNote={addNote} />
      <NoteList 
        notes={notes}
        onDelete={deleteNote}
        onUpdate={updateNote}
      />
    </div>
  );
}

export default App;