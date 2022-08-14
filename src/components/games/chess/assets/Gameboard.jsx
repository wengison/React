import React, {useState, useEffect} from 'react';
import { Default } from './Default';

///. Simple Chess game - version: 1.0, last update: 14.8.2022 ///.
///.----------------------------------------------------------///.

export function Gameboard() {
// 1)pieces---------------------------------------------------------
    const storageDefault = Default();
    const [pawnB,knightB,bishopB,rookB,queenB,kingB] = ['♟','♞','♝','♜','♛','♚'];
    const [pawnW,knightW,bishopW,rookW,queenW,kingW] = ['♙','♘','♗','♖','♕','♔'];
    const allBlack = ['♟','♞','♝','♜','♛','♚'];
    const allWhite = ['♙','♘','♗','♖','♕','♔'];

// 2)states---------------------------------------------------------
    const [historyStorage, setHistoryStorage] = useState(storageDefault);
    const [currentField, setCurrentField] = useState('');
    const [currentFigure, setCurrentFigure] = useState('');
    const [historyLevel, setHistoryLevel] = useState(0);
    const [onMove, setOnMove] = useState('');
    const [currentPosition, setCurrentPosition] = useState([]);
    
    // const [pawnPosition, setPawnPosition] = useState('');
    // const [knightPosition, setKnightPosition] = useState('');
    // const [bishopPosition, setBishopPosition] = useState('');
    // const [rookPosition, setRookPosition] = useState('');
    // const [queenPosition, setQueenPosition] = useState('');
    // const [kingPosition, setKingPosition] = useState('');

// 3)indexes & fields---------------------------------------------------------
    const setIndexes = () => {
        let ids = [];
        const rows = ['A','B','C','D','E','F','G','H'];
        for (let i=8; i>0; i--) {
            rows.forEach(line=>ids.push(line+i))
        }
        return ids;
    }
    const indexes = setIndexes();

    const setFields = () => {
       return(indexes.map(id=>(<div className='field'id={id}key={id} onClick={()=>figureMovement(id)}></div>)));
    }


// 4)main game logic---------------------------------------------------------
    const figureMovement = (field) => {
        const fields = Array.from(document.querySelectorAll('.field'));
        const clicked = fields[(indexes.indexOf(field))];

        //1-vyber figury (oznaceni)
        if(currentFigure===''&& clicked.innerHTML!==''&& clicked.innerHTML!==currentFigure&& historyLevel===historyStorage.length-1) {
            const pickFigure = () => {
                fields.forEach(f=>f.style.color = 'black');
                setCurrentFigure(clicked.innerHTML);
                setCurrentField(field);
                clicked.style.color = 'orange';
            }
            if (onMove==='white'&& allWhite.indexOf(clicked.innerHTML)!==-1) {
                pickFigure();
                setOnMove('black');
            } else if (onMove==='black'&& allBlack.indexOf(clicked.innerHTML)!==-1) {
                pickFigure();
                setOnMove('white');
            }
        } 
        //2-nechci tuto figuru (vraceni)
        else if (currentFigure===clicked.innerHTML&& field===currentField) {
            setCurrentFigure('');
            setCurrentField('');
            (onMove==='black') ? setOnMove('white') : setOnMove('black');
            clicked.style.color = 'black';
        } 
        //3-tah s figurou
        else if (currentFigure!==''&& clicked.innerHTML!==kingB&& clicked.innerHTML!==kingW) {
            const vanishField = () => {
                (fields[(indexes.indexOf(currentField))]).innerHTML = '';
                (fields[(indexes.indexOf(currentField))]).style.color = 'black';
            }
            if (onMove==='black'&& allWhite.indexOf(clicked.innerHTML)===-1) {
                clicked.innerHTML = currentFigure;
                setCurrentFigure('');
                vanishField();
                setHistoryLevel((previous)=>previous+1);
                new History(historyLevel, historyStorage);
            } else if (onMove==='white'&& allBlack.indexOf(clicked.innerHTML)===-1) {
                clicked.innerHTML = currentFigure;
                setCurrentFigure('');
                vanishField();
                setHistoryLevel((previous)=>previous+1);
                new History(historyLevel, historyStorage);
            }
        }
    }

// 5)game preparation---------------------------------------------------------
    class Game {
        constructor(time) {
            this.time = time;
            this.fields = Array.from(document.querySelectorAll('.field'));
            this.gameboard = this.setGameboard();
        }

         setGameboard() {
            const black = [
                1,3,5,7, 8,10,12,14, 
                17,19,21,23, 24,26,28,30, 
                33,35,37,39, 40,42,44,46, 
                49,51,53,55, 56,58,60,62 
            ]
            black.map(b=>this.fields[b].style.background='lightblue');
            this.fields.forEach(f=>f.style.color = 'black');
            this.fields.map(f=>f.innerHTML='');
            setCurrentField('');
            setCurrentFigure('');
            setOnMove('white');
            setHistoryStorage(storageDefault);
            setHistoryLevel(0);
        }

        setFigures() {
            const fields = (Array.from(document.querySelectorAll('.field')));
            let figures = [];
            historyStorage[0].forEach(obj=>figures.push(obj.Figure));
            for (let i=0;i<64;i++) {
                fields[i].innerHTML = figures[0];
                figures.shift();
            } 
        }
    }

// 6)history of moves---------------------------------------------------------
    class History {
        constructor(level, history) {
            this.level = level;
            this.history = history;
            this.fields = Array.from(document.querySelectorAll('.field'));
            this.report = this.write();
        }

        write() {
            const positions = [];
            this.fields.forEach(f=>{
                if (f.innerHTML!==''||f.innerHTML==='') {
                    const id = (f.id);  //A1-H8
                    const figure = f.innerHTML; //♟-♚
                    const position = {
                        Field: id,
                        Figure: figure
                    }
                    positions.push(position);
                }
            });
            this.history.push(positions);
            setHistoryStorage(this.history);
            setCurrentPosition(historyStorage[historyLevel]);
        }
    }

    const listHistory = (click) => {
        const fields = (Array.from(document.querySelectorAll('.field')));

        if(historyLevel>0 &&click ==='back') {
            let figures = [];
            historyStorage[historyLevel-1].forEach(obj=>figures.push(obj.Figure));
            setHistoryLevel((previous)=>previous-1)
            for (let i=0;i<64;i++) {
                fields[i].innerHTML = figures[0];
                figures.shift();
            } 
        } 
        if(historyLevel<historyStorage.length-1&& click==='forth') {
            let figures = [];
            historyStorage[historyLevel+1].forEach(obj=>figures.push(obj.Figure));
            setHistoryLevel((previous)=>previous+1)
            for (let i=0;i<64;i++) {
                fields[i].innerHTML = figures[0];
                figures.shift();
            } 
        }
    }

    const viewHistory = () => {
        if (historyLevel===historyStorage.length-1) {
            console.log(historyLevel);
            console.log(JSON.stringify(historyStorage[historyLevel]));
        }
        console.log(JSON.stringify({historyStorage}));
    }

    if (onMove==='') {
        setTimeout(()=>{
            new Game();
        },20);
    }

    useEffect(()=>{
        console.log(currentPosition);
    },[currentPosition]);

// 7)render---------------------------------------------------------
  return (
    <section className='chess-body'>
        <div className='history-btns'>
            <button onClick={()=>listHistory('back')}>◄◄</button>
            <button onClick={()=>{viewHistory()}}>View History</button>
            <button onClick={()=>listHistory('forth')}>►►</button>
        </div>
        <div  className='gameboard'>{setFields()}</div>
        <button onClick={()=>{const game = new Game(600);game.setFigures()}}>Play</button>
    </section>
  )
}
