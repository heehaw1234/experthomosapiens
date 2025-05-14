import React from 'react';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0',
  borderBottom: '1px solid #eaeaea',
  marginBottom: '20px'
};

const logoStyle = {
  color: '#4361ee',
  margin: '0',
  fontSize: '28px',
  fontWeight: '600'
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={logoStyle}>NoteShare</h1>
      <div>
        <p style={{ margin: 0, color: '#555' }}>Share your thoughts with the world!</p>
      </div>
    </header>
  );
};

export default Header;