import React from 'react';
import './home.css';
// import '../style/header.css';
// import '../style/media-header.css';

function Home() {
  return (
    <>
    
    <div className='just-center f-body'>
        <div className='startgame-div'>
            <img className='startgame-img' src={require('./react-logo.png')} alt={'obr'}></img>
        </div>
      </div>
    </>
  )
}

export default Home;