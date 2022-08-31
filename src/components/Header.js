import React, {useState, useEffect}   from 'react';
import { NavLink } from 'react-router-dom';
import {FaUserCircle, FaReacteurope} from 'react-icons/fa';

import './style/header.css';
import './style/media-header.css';

const Header = () => {

  let clicked = false;

  const hamburger = ()=> {
    const body = document.querySelector('.just-center');
    const ham = document.querySelector('#nav-icon3');

    ham.addEventListener('click',()=>{
      if(!clicked) {
        clicked = true;
        ham.classList.add('open');
        const darker = document.createElement('div');
        const fbody = document.querySelector('.f-body');
        fbody.appendChild(darker);
        darker.className = 'darker'
      } else {
        clicked = false;
        ham.classList.remove('open');
        const el = document.querySelector('.darker');
        el.remove();
      }
    });

  }
    
  setTimeout(hamburger,100);

  useEffect(()=>{
    console.log('clean');
  },[])

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

      <div className='hamburger-menu'>
      <div id='nav-icon3' className='close'>
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