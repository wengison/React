import React, {useState} from 'react';
import ContextGameState from './context/Context';
import Header from '../../Header';

import Startgame from './Startgame';
import Snake from './Snake';
import Endgame from './Endgame';

function GamesS() {
    const [gameState, setGameState] = useState('start');
    const [score, setScore] =useState(0);

  return (
    <ContextGameState.Provider value={{gameState,setGameState, score, setScore}}>
        <Header className='header'/>
        {gameState === 'start' && <Startgame className='startgame'/>}
        {gameState === 'snake' && <Snake className='snake'/>}
        {gameState === 'end' && <Endgame className='endgame'/>}
    </ContextGameState.Provider>
  )
}

export default GamesS;