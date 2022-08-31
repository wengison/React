import React from 'react';
import Header from './Header';
import { NavLink} from 'react-router-dom';

function Home() {
  return (
    <>
    <Header className='header'/>
    <div className='just-center f-body'>
        <div className='startgame-div'>
            <img src={require('./style/react-logo.png')} alt={'obr'}></img>
            <h1>Welcome in React Games !!</h1>
            <NavLink to='/games' className='newgame-btn'>New game</NavLink>
        </div>
      </div>
    </>
  )
}

export default Home;