import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar navbar-dark bg-dark'>
        <a className='navbar-brand' href='#'>
          Fofokero 👀
        </a>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Ajustes ⚙
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
