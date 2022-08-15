import React from 'react';
import Header from '../../Header';
import { Gameboard } from './assets/Gameboard';
import './style/chess.css';


function GamesCh() {
  return (
    <>
        <Header className='header'/>
        <Gameboard/>
    </>
  )
}
export default GamesCh;