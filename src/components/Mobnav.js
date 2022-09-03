import React from 'react';
import { NavLink } from 'react-router-dom';
import './style/Mobnav.css'

function Mobnav({value}) {
  const activation = () => {
    console.log('active');
  }

  return (
    <div >
      <ul className='wtf-mobile'>
        <li><NavLink to='/' onClick={()=>activation()}>Home</NavLink></li>
        {/* <li><NavLink to='/games' onClick={()=>activation()}>New game</NavLink></li> */}
        <li><NavLink to='/apps' onClick={()=>activation()}>Apps</NavLink></li>
        <li><NavLink to='/about' onClick={()=>activation()}>More</NavLink></li>
        
      </ul>
    </div>
  )
} 

export default Mobnav