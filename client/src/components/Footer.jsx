import React from 'react';

const Footer = () => {
  return (
    <div className='text-center bg-dark p-2 text-white'>
      <div className='my-3'>
        <h6>Fofokero &copy; 2020</h6>
        <a
          className='text-white my-auto'
          href='http://github.com/diegocamy'
          rel='noopener noreferrer'
          target='_blank'
          style={{ textDecoration: 'none', fontSize: '2rem' }}
        >
          <i className='fab fa-github'></i> GitHub
        </a>
      </div>
    </div>
  );
};

export default Footer;
