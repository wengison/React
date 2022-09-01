import React from 'react';
import {Link} from 'react-router-dom';
import './games.css';

function Games() {
  return (
    <section className='games'>
        <section className='games-box f-body'>
            <Link to='/games/chess' className='games-box-card'>Chess</Link>
            <Link to='/games/quiz' className='games-box-card'>Quiz</Link>
            {/* <Link to='/games/snake' className='games-box-card'>Snake</Link>
            <Link to='/games/tetris' className='games-box-card'>Tetris</Link> */}
        </section>
    </section>
  )
}

export default Games;