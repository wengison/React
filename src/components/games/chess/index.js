import React, {useState} from 'react';
import ContextGameState from './context/Context';
import Header from '../../Header';

import Startgame from './Startgame';
import Chess from './Chess';
import Endgame from './Endgame';

function GamesCh() {
    const [gameState, setGameState] = useState('start');


  return (
    <ContextGameState.Provider value={{gameState,setGameState}}>
        <Header className='header'/>
        {gameState === 'start' && <Startgame className='startgame'/>}
        {gameState === 'chess' && <Chess className='chess'/>}
        {gameState === 'end' && <Endgame className='endgame'/>}
    </ContextGameState.Provider>
  )
}

export default GamesCh;