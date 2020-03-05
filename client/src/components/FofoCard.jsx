import React from 'react';

const FofoCard = ({ fofoca }) => {
  const {
    imagen,
    fotoUsuario,
    linkPerfil,
    timeStamp,
    titulo,
    fuente,
    enlace
  } = fofoca;

  return (
    <div className='card shadow border-0'>
      <img src={imagen} className='card-img-top' alt='...' />
      <div className='card-body'>
        <p className='card-title'>
          <img
            className='rounded-circle m-1'
            src={fotoUsuario}
            style={{ width: '25px' }}
          />
          <a href={linkPerfil}>{fuente}</a>
        </p>
        <p className='card-subtitle mb-2 text-muted'>🕓 {timeStamp}</p>
        <p className='card-text'>{titulo}</p>
        <a href={enlace} className='btn btn-primary btn-dark'>
          Ver 👀
        </a>
      </div>
    </div>
  );
};

export default FofoCard;
