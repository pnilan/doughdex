import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo for DoughDex" />
    </nav>
  );
};

export default Header;