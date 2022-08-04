import React, {useState} from 'react';
import ContextGameState from './context/Context';
import Header from './components/Header';
import Startgame from './components/Startgame';
import Quiz from './components/Quiz';
import Endgame from './components/Endgame';

import './App.css';

function App() {

  const [gameState, setGameState] = useState('start');
  const [score, setScore] =useState(0);

  return (
    <>
      <ContextGameState.Provider value={{gameState,setGameState, score, setScore}}>
        <Header className='header'/>
        {gameState === 'start' && <Startgame className='startgame'/>}
        {gameState === 'quiz' && <Quiz className='quiz'/>}
        {gameState === 'end' && <Endgame className='endgame'/>}
      </ContextGameState.Provider>
    </>
  );
}

export default App;
