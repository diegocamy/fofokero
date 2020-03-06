import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FofoCard from './FofoCard';

import './Fofokas.css';

const Fofokas = () => {
  const [fofocas, setFofocas] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    //obtener ultimas noticias guardadas
    const fofocasGuardadas = JSON.parse(localStorage.getItem('ultimasFofocas'));
    if (fofocasGuardadas) {
      //verificar si pasaron menos de 5 minutos desde el ultimo ingreso a la app
      //si es asi, mostrar esas mismas noticias sin
      //volver a cargar otras
      const horaActual = new Date().getTime();
      if (horaActual - fofocasGuardadas.hora < 300000) {
        setFofocas(fofocasGuardadas.fofocas);
      } else {
        //si pasaron 5 minutos entonces cargar nuevas fofocas
        (async () => {
          setFofocas(fofocasGuardadas.fofocas);
          await fetchFofocas();
        })();
      }
    } else {
      //si no habian fofocas guardadas, cargar inmediatamente unas fofoquita
      (async () => {
        await fetchFofocas();
      })();
    }
  }, []);

  //cargar nuevas fofocas a cada 5 min
  setInterval(async () => {
    await fetchFofocas();
  }, 300000);

  const fetchFofocas = async e => {
    try {
      setMensaje('Cargando nuevas fofocas...');
      const respuesta = await axios.get('http://localhost:5000/fofocas');
      setFofocas(respuesta.data);
      setMensaje(null);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarFofocas = fofocas => {
    //guardar en localStore las fofocas
    fofocas.sort(() => Math.random() - 0.5); //pseudo-random sort en las fofocas
    let ultimasFofocas = {};
    ultimasFofocas.hora = new Date().getTime();
    ultimasFofocas.fofocas = fofocas;
    localStorage.setItem('ultimasFofocas', JSON.stringify(ultimasFofocas));

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
          <div>
            <div className='spinner-border text-dark' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <h2 className='m-4 d-inline'>{mensaje}</h2>
          </div>
        ) : (
          <h2 className='m-4'>Te liga nas ultimas fofoca!</h2>
        )}
        <div className='card-columns'>{fofocas && mostrarFofocas(fofocas)}</div>
      </div>
    </div>
  );
};

export default Fofokas;
