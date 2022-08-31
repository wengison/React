import React, {useState} from 'react';
import ContextGameState from './context/Context';
import Header from '../../Header';
import Snake from './Snake';


function GamesS() {
    const [score, setScore] =useState(0);

  return (
    <ContextGameState.Provider value={{score, setScore}}>
        <Header className='header'/>
        <Snake className='snake'/>
    </ContextGameState.Provider>
  )
}

export default GamesS;