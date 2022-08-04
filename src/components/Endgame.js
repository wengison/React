import React, {useContext} from 'react'
import ContextGameState from '../context/Context';

const Endgame = () => {
  
  const {score} = useContext(ContextGameState);

  return (
    <>
      <div className='endgame-div'><h1>The end</h1></div>
      <div className='endscore-div' ><h4>Your score: {score}</h4></div>
    </>
  )
}

export default Endgame;