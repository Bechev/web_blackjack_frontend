import React from 'react';
import { NavLink } from 'react-router-dom';


const link = {
    width: '100px',
    padding: '0px',
    margin: '0 6px 6px',
    textDecoration: 'none',
    color: 'grey',
}

  

const Navbar = () =>
  <div className="navbar">
    <NavLink
      to="/"
      exact
      style={link}
    >Home</NavLink>
    
    <NavLink
      to="/blackjack"
      exact
      style={link}
    >BlackJack</NavLink>

    <NavLink
      to="/about"
      exact
      style={link}
    >About</NavLink>
  </div>;


export default Navbar