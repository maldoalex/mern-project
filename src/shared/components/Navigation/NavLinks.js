import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return (
    <ul className='nav-links'>
    <li>
      <NavLink to='/' exact>ALL USERS</NavLink>
    </li>
    <li>
      <NavLink to='/u1/moments'>MY MOMENTS</NavLink>
    </li>
    <li>
      <NavLink to='/moments/new'>ADD MOMENT</NavLink>
    </li>
    <li>
      <NavLink to='/auth'>AUTHENTICATE</NavLink>
    </li>
    </ul>
  )
};

export default NavLinks;