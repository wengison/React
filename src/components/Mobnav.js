import React,{useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { mobileMenuContext } from '../App';
import './style/Mobnav.css'
// import { mobileMenuContext } from '../App';

function Mobnav() {

  // console.log(value)
  const {setNavClicked} = useContext(mobileMenuContext);
  // console.log(navClicked);

  const activation = () => {
    const mob = document.querySelector('.wtf-mobile');
    const ham = document.querySelector('#nav-icon3');
    console.log(mob);
    mob.classList.remove('active');
    ham.classList.remove('open');
    setNavClicked(false);
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