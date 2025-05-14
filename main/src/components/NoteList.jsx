import React from 'react';
import NoteItem from './NoteItem';

const emptyStateStyle = {
  textAlign: 'center',
  padding: '40px 20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginTop: '20px'
};

const NoteList = ({ notes, onDelete, onUpdate }) => {
  if (notes.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <h2>No notes yet</h2>
        <p>Create your first note using the form above!</p>
      </div>
    );
  }

  // Sort notes by creation date (newest first)
  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <h2>Your Notes</h2>
      <div className="notes-grid">
        {sortedNotes.map(note => (
          <NoteItem 
            key={note.id} 
            note={note} 
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;