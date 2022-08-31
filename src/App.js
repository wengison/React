import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';

import Home from './components';
import Friends from './components/others/Friends';
import About from './components/others/About';
import Games from './components/games/Games';
import GamesQ from './components/games/quiz';
import GamesCh from './components/games/chess';
import GamesS from './components/games/snake';
import GamesT from './components/games/tetris';

function App() {
  return (
    <Router>
      <Routes>
        {/* first level routes */}
        <Route path='/' exact element={<Home/>}/>
        <Route path='/games' exact element={<Games/>}/>
        <Route path='/friends' element={<Friends/>}/>
        <Route path='/about' element={<About/>}/>
        {/* second level routes */}
        <Route path='/games/quiz' element={<GamesQ/>}/>
        <Route path='/games/chess' element={<GamesCh/>}/>
        <Route path='/games/snake' element={<GamesS/>}/>
        <Route path='/games/tetris' element={<GamesT/>}/>
      </Routes>
    </Router>
  );
}

export default App;
