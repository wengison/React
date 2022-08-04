import React, {useContext, useEffect} from 'react';
import ContextGameState from '../context/Context';

const Startgame = () => {

  const {setGameState, setScore} = useContext(ContextGameState);

  useEffect(()=> {
    setScore(0);
  },[]);

  return (
    <>
      <div className='just-center'>
        <div className='startgame-div'>
            <img src={require('./react-logo.png')} alt={'obr'}></img>
            <h1>Welcome in React Quiz !!</h1>
            <button onClick={()=>setGameState('quiz')} className='newgame-btn'>New game</button>
        </div>
      </div>
    </>
  )
}

export default Startgame;