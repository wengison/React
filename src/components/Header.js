import React, {useEffect}   from 'react';
import { NavLink } from 'react-router-dom';
import {FaUserCircle, FaReacteurope} from 'react-icons/fa';

import './style/header.css';
import './style/media-header.css';

const Header = ({value}) => {

  // let clicked = false;

  
    const hamburger = ()=> {
      const ham = document.querySelector('#nav-icon3');
      const mobnav = document.querySelector('.wtf-mobile');
      // const body = document.querySelector('.just-center');
  
      ham.addEventListener('click',()=>{
        if(!value) {
          mobnav.classList.add('active');
          ham.classList.add('open');
          value = true;
        } else {
          mobnav.classList.remove('active');
          ham.classList.remove('open');
          value = false;
        }
      });
    }
    setTimeout(hamburger,10);

    

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