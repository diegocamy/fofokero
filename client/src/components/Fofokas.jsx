import React, { useState } from 'react';
import Spinner from './Spinner';
import axios from 'axios';
import FofoCard from './FofoCard';

import './Fofokas.css';

const Fofokas = () => {
  const [fofocas, setFofocas] = useState(null);
  const [cargando, setCargando] = useState(false);

  const fetchFofocas = async e => {
    try {
      setCargando(true);
      const respuesta = await axios.get('http://localhost:5000/fofocas', {
        params: {
          perfiles: 'http://facebook.com/aplateia/posts'
        }
      });
      setFofocas(respuesta.data);
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarFofocas = fofocas => {
    return fofocas.map((f, index) => {
      if (f.titulo && f.imagen) {
        return <FofoCard key={index} fofoca={f} />;
      }
    });
  };

  if (cargando && !fofocas) {
    return <Spinner />;
  }

  if (!cargando && fofocas) {
    console.log(fofocas);
    return (
      <div className='m-2'>
        <div className='text-center m-4'>
          <h2 className='m-4'>Amigo, estas son las ultimas fofocas para ti</h2>
          <div className='m-2 card-columns'>{mostrarFofocas(fofocas)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='m-3'>
      <div className='text-center m-2'>
        <h1>Hola Amigo</h1>
        <h4 className='text-muted'>
          Haz click en el boton para cargar las ultimas fofocas!
        </h4>
        <button className='btn btn-primary m-4' onClick={fetchFofocas}>
          CARGAR FOFOCAS 📢
        </button>
      </div>
    </div>
  );
};

export default Fofokas;
