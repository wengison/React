import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Mobnav from './components/Mobnav';
import Header from './components/Header';


import Home from './components/home/home';
import Apps from './components/others/Apps';
import About from './components/others/About';
import Games from './components/games/Games';
import GamesQ from './components/games/quiz';
import GamesCh from './components/games/chess';
import GamesS from './components/games/snake';
import GamesT from './components/games/tetris';

import Weather from './components/others/apps/Weather';

function App() {

  const navClicked = false;
  const linkClicked = false;

  return (
    <Router>
        <Header className='primary-header' value={navClicked}/>
        <Mobnav value={linkClicked}/>
      <Routes>
        {/* first level routes */}
        <Route path='/' exact element={<Home/>}/>
        <Route path='/games' exact element={<Games/>}/>
        <Route path='/apps' element={<Apps/>}/>
        <Route path='/about' element={<About/>}/>
        {/* second level routes */}
        <Route path='/games/quiz' element={<GamesQ/>}/>
        <Route path='/games/chess' element={<GamesCh/>}/>
        <Route path='/games/snake' element={<GamesS/>}/>
        <Route path='/games/tetris' element={<GamesT/>}/>

        <Route path='/apps/weather' element={<Weather/>}/>
      </Routes>
    </Router>
  );
}

export default App;
