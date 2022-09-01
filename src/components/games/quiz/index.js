import React, {useState} from 'react';
import ContextGameState from './context/Context';
import Startgame from './Startgame';
import Quiz from './Quiz';
import Endgame from './Endgame';

import './style/index.css';

function GamesQ() {
    const [gameState, setGameState] = useState('start');
    const [score, setScore] =useState(0);

    return (
        <ContextGameState.Provider value={{gameState,setGameState, score, setScore}}>
            {gameState === 'start' && <Startgame className='startgame'/>}
            {gameState === 'quiz' && <Quiz className='quiz'/>}
            {gameState === 'end' && <Endgame className='endgame'/>}
        </ContextGameState.Provider>
    )
}

export default GamesQ;