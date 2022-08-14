import React, {useState, useEffect} from 'react';

///. Simple Chess game - version: 1.0, last update: 14.8.2022 ///.
///.----------------------------------------------------------///.

export function Gameboard() {
// 1)pieces---------------------------------------------------------
    const [pawnB,knightB,bishopB,rookB,queenB,kingB] = ['♟','♞','♝','♜','♛','♚'];
    const [pawnW,knightW,bishopW,rookW,queenW,kingW] = ['♙','♘','♗','♖','♕','♔'];
    const allBlack = ['♟','♞','♝','♜','♛','♚'];
    const allWhite = ['♙','♘','♗','♖','♕','♔'];

    const storage = [[{"Field":"A8","Figure":"♜"},{"Field":"B8","Figure":"♞"},{"Field":"C8","Figure":"♝"},{"Field":"D8","Figure":"♛"},{"Field":"E8","Figure":"♚"},{"Field":"F8","Figure":"♝"},{"Field":"G8","Figure":"♞"},{"Field":"H8","Figure":"♜"},{"Field":"A7","Figure":"♟"},{"Field":"B7","Figure":"♟"},{"Field":"C7","Figure":"♟"},{"Field":"D7","Figure":"♟"},{"Field":"E7","Figure":"♟"},{"Field":"F7","Figure":"♟"},{"Field":"G7","Figure":"♟"},{"Field":"H7","Figure":"♟"},{"Field":"A6","Figure":""},{"Field":"B6","Figure":""},{"Field":"C6","Figure":""},{"Field":"D6","Figure":""},{"Field":"E6","Figure":""},{"Field":"F6","Figure":""},{"Field":"G6","Figure":""},{"Field":"H6","Figure":""},{"Field":"A5","Figure":""},{"Field":"B5","Figure":""},{"Field":"C5","Figure":""},{"Field":"D5","Figure":""},{"Field":"E5","Figure":""},{"Field":"F5","Figure":""},{"Field":"G5","Figure":""},{"Field":"H5","Figure":""},{"Field":"A4","Figure":""},{"Field":"B4","Figure":""},{"Field":"C4","Figure":""},{"Field":"D4","Figure":""},{"Field":"E4","Figure":""},{"Field":"F4","Figure":""},{"Field":"G4","Figure":""},{"Field":"H4","Figure":""},{"Field":"A3","Figure":""},{"Field":"B3","Figure":""},{"Field":"C3","Figure":""},{"Field":"D3","Figure":""},{"Field":"E3","Figure":""},{"Field":"F3","Figure":""},{"Field":"G3","Figure":""},{"Field":"H3","Figure":""},{"Field":"A2","Figure":"♙"},{"Field":"B2","Figure":"♙"},{"Field":"C2","Figure":"♙"},{"Field":"D2","Figure":"♙"},{"Field":"E2","Figure":"♙"},{"Field":"F2","Figure":"♙"},{"Field":"G2","Figure":"♙"},{"Field":"H2","Figure":"♙"},{"Field":"A1","Figure":"♖"},{"Field":"B1","Figure":"♘"},{"Field":"C1","Figure":"♗"},{"Field":"D1","Figure":"♕"},{"Field":"E1","Figure":"♔"},{"Field":"F1","Figure":"♗"},{"Field":"G1","Figure":"♘"},{"Field":"H1","Figure":"♖"}]];

// 2)states---------------------------------------------------------
    const [historyStorage, setHistoryStorage] = useState(storage);
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
        if(currentFigure===''&& clicked.innerHTML!==''&& clicked.innerHTML!==currentFigure) {
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
        } else if (currentFigure===clicked.innerHTML&& field===currentField) {
            setCurrentFigure('');
            setCurrentField('');
            (onMove==='black') ? setOnMove('white') : setOnMove('black');
            clicked.style.color = 'black';
        } else if (currentFigure!==''&& clicked.innerHTML!==kingB&& clicked.innerHTML!==kingW) {
            const vanishField = () => {
                (fields[(indexes.indexOf(currentField))]).innerHTML = '';
                (fields[(indexes.indexOf(currentField))]).style.color = 'black'
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
            setHistoryStorage(storage);
            setHistoryLevel(0);
        }

        setFigures() {
            const inner = (piece, i) => {
                this.fields[i].innerHTML = piece};
            for (let i=0;i<16;i++) {
                if(i===0||i===7) {
                inner(rookB,i)};if(i===1||i===6) {
                inner(knightB,i)};if(i===2||i===5) {
                inner(bishopB,i)};if(i===3) {
                inner(queenB,i)};if(i===4) {
                inner(kingB,i)};if (i>7&&i<16) {
                inner(pawnB,i)}};
            for (let i=48; i <64; i++) {
                if(i===56||i===63) {
                inner(rookW,i)};if(i===57||i===62) {
                inner(knightW,i)};if(i===58||i===61) {
                inner(bishopW,i)};if(i===59) {
                inner(queenW,i)};if(i===60) {
                inner(kingW,i)};if (i>47&&i<56) {
                inner(pawnW,i)}}
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
        console.log(historyLevel);
        console.log(JSON.stringify(historyStorage[historyLevel]));
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
