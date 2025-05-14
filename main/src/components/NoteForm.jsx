import React, { useState } from 'react';

const formStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '30px'
};

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
  minHeight: '120px',
  fontFamily: 'inherit'
};

const buttonStyle = {
  backgroundColor: '#4361ee',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  marginTop: '10px',
  transition: 'background-color 0.3s'
};

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content fields');
      return;
    }
    
    // Add new note
    addNote({
      title,
      content,
      author: author.trim() || 'Anonymous'
    });
    
    // Reset form
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2>Add a New Note</h2>
      <div>
        <input
          type="text"
          style={inputStyle}
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          style={textareaStyle}
          placeholder="Your note content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div>
        <input
          type="text"
          style={inputStyle}
          placeholder="Your Name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <button type="submit" style={buttonStyle}>Share Note</button>
    </form>
  );
};

export default NoteForm;