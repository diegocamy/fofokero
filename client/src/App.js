import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Fofokas from './components/Fofokas';

import './App.css';

function App() {
  const [opciones, setOpciones] = useState({});
  const [ultimasFofocas, setUltimasFofocas] = useState(null);

  useEffect(() => {}, []);

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
