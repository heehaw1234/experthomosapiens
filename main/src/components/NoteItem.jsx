import React, { useState } from 'react';

const noteStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  position: 'relative'
};

const noteHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px'
};

const titleStyle = {
  margin: '0 0 10px 0',
  fontSize: '18px',
  fontWeight: '600',
  color: '#333'
};

const contentStyle = {
  fontSize: '16px',
  color: '#555',
  marginBottom: '15px',
  flexGrow: 1,
  whiteSpace: 'pre-wrap'
};

const metaStyle = {
  fontSize: '14px',
  color: '#999',
  marginTop: 'auto'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '15px'
};

const buttonStyle = (color) => ({
  backgroundColor: color,
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s'
});

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  borderRadius: '4px',
  border: '1px solid #ddd',
  fontSize: '16px'
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: '100px',
  fontFamily: 'inherit'
};

const NoteItem = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('Title and content cannot be empty');
      return;
    }
    
    onUpdate(note.id, {
      title: editTitle,
      content: editContent
    });
    
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={noteStyle}>
      {isEditing ? (
        <>
          <input
            type="text"
            style={inputStyle}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            style={textareaStyle}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
          <div style={buttonGroupStyle}>
            <button 
              onClick={handleSaveEdit} 
              style={buttonStyle('#4361ee')}
            >
              Save
            </button>
            <button 
              onClick={handleCancelEdit} 
              style={buttonStyle('#6c757d')}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={noteHeaderStyle}>
            <h3 style={titleStyle}>{note.title}</h3>
          </div>
          <p style={contentStyle}>{note.content}</p>
          <div style={metaStyle}>
            <p>By: {note.author} | {formatDate(note.createdAt)}</p>
          </div>
          <div style={buttonGroupStyle}>
            <button 
              onClick={handleEdit} 
              style={buttonStyle('#4361ee')}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(note.id)} 
              style={buttonStyle('#dc3545')}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteItem;