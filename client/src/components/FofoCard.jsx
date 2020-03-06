import React from 'react';

const FofoCard = ({ fofoca }) => {
  const {
    imagen,
    fotoUsuario,
    linkPerfil,
    timeStamp,
    titulo,
    fuente,
    titular,
    enlace
  } = fofoca;

  return (
    <div className='card shadow border-0'>
      <img src={imagen} className='card-img-top' alt='foto de la noticia' />
      <div className='card-body'>
        <p className='card-title'>
          <img
            className='rounded-circle my-auto m-2'
            src={fotoUsuario}
            style={{ width: '30px' }}
            alt='Avatar'
          />
          <a href={linkPerfil}>{fuente}</a>
        </p>
        <p className='card-subtitle mb-2 text-muted'>
          <span role='img' aria-label='relojito'>
            🕓
          </span>{' '}
          {timeStamp}
        </p>
        <p className='card-text'>{titular ? titular : titulo}</p>
        <a
          href={enlace}
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-primary btn-dark'
        >
          Fofoquear{' '}
          <span role='img' aria-label='ojos'>
            👀
          </span>
        </a>
      </div>
    </div>
  );
};

export default FofoCard;
