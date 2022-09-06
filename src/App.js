import React,{useState, createContext} from 'react';
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
import Todo from './components/others/todo/Todo';

export const mobileMenuContext = createContext();

function App() {

  // const navClicked = React.createContext(false);
  const [navClicked, setNavClicked] = useState(false);
  // const linkClicked = false;

  return (
    <Router>
      <mobileMenuContext.Provider value={{navClicked, setNavClicked}}>
        <Header className='primary-header'/>
        <Mobnav/>
      </mobileMenuContext.Provider>
      <Routes>
        {/* first level routes */}
        <Route path='/' exact element={<Home/>}/>
        <Route path='/games' exact element={<About/>}/>
        <Route path='/apps' element={<About/>}/>
        <Route path='/about' element={<Apps/>}/>
        <Route path='/playground' exact element={<Games/>}/>
        {/* second level routes */}
        <Route path='/games/quiz' element={<GamesQ/>}/>
        <Route path='/games/chess' element={<GamesCh/>}/>
        <Route path='/games/snake' element={<GamesS/>}/>
        <Route path='/games/tetris' element={<GamesT/>}/>

        {/* mini shi*s */}
        <Route path='/apps/weather' element={<Weather/>}/>
        <Route path='/apps/todo' element={<Todo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
