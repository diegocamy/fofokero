import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FofoCard from './FofoCard';

import './Fofokas.css';

const Fofokas = () => {
  const [fofocas, setFofocas] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [actualizadoHace, setActualizadoHace] = useState(null);

  useEffect(() => {
    fetchFofocas();
  }, []);

  //cargar nuevas fofocas a cada min
  setInterval(async () => {
    await fetchFofocas();
  }, 300000);

  const fetchFofocas = async () => {
    try {
      setMensaje('Cargando nuevas fofocas...');
      const respuesta = await axios.get('/fofocas');
      setFofocas(respuesta.data.fofocas);
      setActualizadoHace(respuesta.data.hora);
      setMensaje(null);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarFofocas = fofocas => {
    fofocas.sort(() => Math.random() - 0.5); //pseudo-random sort en las fofocas

    return fofocas.map((f, index) => {
      if (f.titulo && f.imagen) {
        return <FofoCard key={index} fofoca={f} />;
      } else {
        return null;
      }
    });
  };

  return (
    <div className='p-1'>
      <div className='text-center'>
        {mensaje ? (
          <div className='p-3'>
            <div className='spinner-border text-dark' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <h2 className='m-4 d-inline'>{mensaje}</h2>
          </div>
        ) : (
          <>
            <h2 className='m-2'>Te liga nas ultimas fofoca!</h2>
            <p className='mb-4'>
              Actualizadas el {new Date(actualizadoHace).toLocaleDateString()} a
              las {new Date(actualizadoHace).toLocaleTimeString()}
            </p>
          </>
        )}
        <div className='card-columns'>{fofocas && mostrarFofocas(fofocas)}</div>
      </div>
    </div>
  );
};

export default Fofokas;
