// MockPage.jsx
import React from 'react';
import Terminal from './Terminal';
import Admin from './Comps/LxcContainerComponent';

const MockPage = () => {
  return (
    <div>
      <h1>Mock Page</h1>
      <p>Content of your mock page.</p>
      <Admin />
    </div>
  );
};

export default MockPage;
