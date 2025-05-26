import React, { useState } from 'react';

const ModSearchBar = ({ fetchCards }) => {
  const [curMod, setCurMod] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setCurMod(value);
    fetchCards(value.toUpperCase()); // Only uppercase when sending to Supabase
  };

  return (
    <div className="functionBar">
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search by module..."
          className="text_input_bar"
          value={curMod}
          onChange={handleChange}
        />
      </form>   
    </div>
  );
};

export default ModSearchBar;