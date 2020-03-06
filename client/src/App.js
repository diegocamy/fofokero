import React from 'react';
import Navbar from './components/Navbar';
import Fofokas from './components/Fofokas';

import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Fofokas />
      </div>
      <Footer />
    </div>
  );
}

export default App;
