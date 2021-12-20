import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <header>
    <nav>
      <NavLink to="/">home</NavLink>
      <NavLink to="/details">details</NavLink>
    </nav>
  </header>
);

export default Navbar;
