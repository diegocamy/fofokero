import React from 'react';

const Spinner = () => {
  return (
    <div className='text-center m-3'>
      <h2>Cargando fofocas...</h2>
      <div
        className='spinner-border'
        style={{ width: '3rem', height: '3rem' }}
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
      <p>Esto puede tardar unos momentos</p>
    </div>
  );
};

export default Spinner;
