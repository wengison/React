import React, {useContext, useEffect} from 'react';
import ContextGameState from './context/Context';

const Startgame = () => {

  const {setGameState, score, setScore} = useContext(ContextGameState);

  useEffect(()=> {
    console.log(score);
    setScore(0);
  });

  return (
    <>
      <div className='just-center f-body'>
        <div className='startgame-div'>
            <img src={require('./style/react-logo.png')} alt={'obr'}></img>
            <h1>Welcome in React Quiz !!</h1>
            <button onClick={()=>setGameState('quiz')} className='newgame-btn'>New Quiz</button>
        </div>
      </div>
    </>
  )
}

export default Startgame;