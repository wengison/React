import React, {useContext}  from 'react';
import ContextGameState from '../context/Context';

const Header = () => {

  const {setGameState} = useContext(ContextGameState);

  return (
    <div className='header'>
    
    <ul className='links'>
        <li onClick={()=>setGameState('start')}>New game</li>
        <li>Friends</li>
        <li>About</li>
    </ul>
    </div>
  )
}

export default Header;