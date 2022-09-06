import React, {useEffect, useContext}   from 'react';
import { NavLink } from 'react-router-dom';
import {FaUserCircle, FaReacteurope} from 'react-icons/fa';
import { mobileMenuContext } from '../App';
import './style/header.css';
import './style/media-header.css';

const Header = () => {

  const {navClicked, setNavClicked} = useContext(mobileMenuContext);
  
  const clickFunction = () => {
    const ham = document.querySelector('#nav-icon3');
    const mobnav = document.querySelector('.wtf-mobile');
    console.log(navClicked);
    // !navClicked? setNavClicked(true): setNavClicked(false);
    if(!navClicked) {
      mobnav.classList.add('active');
      ham.classList.add('open');
      setNavClicked(true);
    } else {
      mobnav.classList.remove('active');
      ham.classList.remove('open');
      setNavClicked(false);
    }
  }
  
  useEffect(()=>{
    
    // console.log(navClicked);
  },[navClicked])

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
          <NavLink to='/apps' className='navlink'>
            <p className='header-links-p-border'>Apps</p>
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

      <div className='hamburger-menu'>
      <div id='nav-icon3' className='close' onClick={()=>clickFunction()}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      </div>
      
    </div>
  )
}

export default Header;