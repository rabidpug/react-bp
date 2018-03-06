import { NavLink, } from 'react-router-dom';
import React from 'react';

const Menu = () =>
  ( <nav>
    <NavLink to='/'>
      {'Home'}
    </NavLink>
    <NavLink to='/welcome'>
      {'Welcome'}
    </NavLink>
    <NavLink to='/bye'>
      {'Bye'}
    </NavLink>
  </nav> );

export default Menu;
