import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import axios from 'axios';
import FofoCard from './FofoCard';

import './Fofokas.css';

const Fofokas = () => {
  const [fofocas, setFofocas] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    //obtener ultimas noticias guardadas
    const fofocasGuardadas = JSON.parse(localStorage.getItem('ultimasFofocas'));
    if (fofocasGuardadas) {
      //verificar si pasaron menos de 5 minutos, si es asi, mostrar esas mismas noticias sin
      //volver a cargar otras
      const horaActual = new Date().getTime();
      if (horaActual - fofocasGuardadas.hora < 600000) {
        setFofocas(fofocasGuardadas.fofocas);
      } else {
        fetchFofocas();
      }
    }
  }, []);

  const fetchFofocas = async e => {
    try {
      setCargando(true);
      const respuesta = await axios.get('http://localhost:5000/fofocas', {
        params: {
          perfiles:
            'http://facebook.com/aplateia/posts,http://facebook.com/sentinela24h/posts,http://www.facebook.com/RiveraCiudad/posts'
        }
      });
      setFofocas(respuesta.data);
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarFofocas = fofocas => {
    //guardar en localStore las fofocas
    let ultimasFofocas = {};
    ultimasFofocas.hora = new Date().getTime();
    ultimasFofocas.fofocas = fofocas;
    localStorage.setItem('ultimasFofocas', JSON.stringify(ultimasFofocas));

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
