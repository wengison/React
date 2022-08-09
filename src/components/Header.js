import React, {useContext, useRef}  from 'react';
import { NavLink } from 'react-router-dom';
import ContextGameState from './games/quiz/context/Context';
import {FaUserCircle, FaReacteurope} from 'react-icons/fa';

const Header = () => {

  const {setGameState} = useContext(ContextGameState);

  const activation = (element) => {
    element.classList.add('selected');
  }

  return (
    <div className='header'>
    <NavLink to='/' className='header-logo'>
      <FaReacteurope className='header-logo-img'/>
      <h1>REACT GAMES</h1>
    </NavLink>
    <div className='links'>
        <NavLink to='/games' className='navlink'>
          <p>New game</p>
        </NavLink>
        <NavLink to='/friends' className='navlink'>
          <p className='header-links-p-border'>Friends</p>
        </NavLink>
        <NavLink to='/about' className='navlink'>
          <p>About</p>
        </NavLink>
    </div>
    <div className='header-logo'>
      <button>LOG IN</button>
      <button>SIGN UP</button>
      <FaUserCircle className='user-icon'/>
    </div>
    </div>
  )
}

export default Header;