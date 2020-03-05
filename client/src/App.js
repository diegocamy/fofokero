import React from 'react';
import Navbar from './components/Navbar';
import Fofokas from './components/Fofokas';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Fofokas />
      </div>
    </div>
  );
}

export default App;
