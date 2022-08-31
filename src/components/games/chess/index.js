import React from 'react';
import Header from '../../Header';
import { Chess } from './assets/Chess';
import './style/chess.css';
import './style/media-chess.css'


function GamesCh() {
  return (
    <>
        <Header className='header'/>
        <Chess />
    </>
  )
}
export default GamesCh;