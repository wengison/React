import React, {useState} from 'react';
import ContextGameState from './context/Context';
import Header from '../../Header';

import Startgame from './Startgame';
import Tetris from './Tetris';
import Endgame from './Endgame';

function GamesT() {
    const [gameState, setGameState] = useState('start');
    const [score, setScore] =useState(0);

  return (
    <ContextGameState.Provider value={{gameState,setGameState, score, setScore}}>
        <Header className='header'/>
        {gameState === 'start' && <Startgame className='startgame'/>}
        {gameState === 'tetris' && <Tetris className='tetris'/>}
        {gameState === 'end' && <Endgame className='endgame'/>}
    </ContextGameState.Provider>
  )
}

export default GamesT;