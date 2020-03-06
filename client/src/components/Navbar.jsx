import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar navbar-dark bg-dark'>
        <a className='navbar-brand' href='/'>
          Fofokero{' '}
          <span role='img' aria-label='ojos'>
            👀
          </span>
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
