///.-----------------------------------------------------------///.
///.  Simple Chess game - version: 1.0, last update: 13.8.2022 ///.
///.-----------------------------------------------------------///.

import React, {useState} from 'react';
export function Gameboard() {

    // 1)pieces---------------------------------------------------------
    const [pawnB,knightB,bishopB,rookB,queenB,kingB] = ['♟','♞','♝','♜','♛','♚'];
    const [pawnW,knightW,bishopW,rookW,queenW,kingW] = ['♙','♘','♗','♖','♕','♔'];
    const allBlack = ['♟','♞','♝','♜','♛','♚'];
    const allWhite = ['♙','♘','♗','♖','♕','♔'];

    // 2)states---------------------------------------------------------
    const [currentPosition, setCurrentPosition] = useState('');
    const [currentFigure, setCurrentFigure] = useState('');
    const [onMove, setOnMove] = useState('');
    // const [pawnPosition, setPawnPosition] = useState('');
    // const [knightPosition, setKnightPosition] = useState('');
    // const [bishopPosition, setBishopPosition] = useState('');
    // const [rookPosition, setRookPosition] = useState('');
    // const [queenPosition, setQueenPosition] = useState('');
    // const [kingPosition, setKingPosition] = useState('');

    // 3)gameboard indexes& fields---------------------------------------------------------
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
       return(indexes.map(id=>(<div className='field'id={id}key={id} onClick={()=>figureToField(currentFigure, id)}></div>)));
    }


    // 4)game logic---------------------------------------------------------
    const figureToField = (figure, field) => {
        const fields = Array.from(document.querySelectorAll('.field'));
        const clicked = fields[(indexes.indexOf(field))];
        console.log(onMove);
        if(currentFigure===''&& clicked.innerHTML!==''&& clicked.innerHTML!==currentFigure) {
            const pickFigure = () => {
                fields.forEach(f=>f.style.color = 'black');
                setCurrentFigure(clicked.innerHTML);
                setCurrentPosition(field);
                clicked.style.color = 'orange';
                console.log(figure);
            }
            if (onMove==='white'&& allWhite.indexOf(clicked.innerHTML)!==-1) {
                pickFigure();
                setOnMove('black');
            } else if (onMove==='black'&& allBlack.indexOf(clicked.innerHTML)!==-1) {
                pickFigure();
                setOnMove('white');
            }
        } else if (currentFigure===clicked.innerHTML&& field===currentPosition) {
            setCurrentFigure('');
            setCurrentPosition('');
            (onMove==='black') ? setOnMove('white') : setOnMove('black');
            clicked.style.color = 'black';
        } else if (currentFigure!==''&& clicked.innerHTML!==kingB&& clicked.innerHTML!==kingW) {
            const vanishField = () => (fields[(indexes.indexOf(currentPosition))]).innerHTML = '';
            if (onMove==='black'&& allWhite.indexOf(clicked.innerHTML)===-1) {
                clicked.innerHTML = currentFigure;
                setCurrentFigure('');
                vanishField();
            } else if (onMove==='white'&& allBlack.indexOf(clicked.innerHTML)===-1) {
                clicked.innerHTML = currentFigure;
                setCurrentFigure('');
                vanishField();
            }
        }
    }

    // 5)start position---------------------------------------------------------
    class Game {
        constructor(time) {
            this.time = time;
        }

         static setGameboard() {
            const fields = Array.from(document.querySelectorAll('.field'));
            fields.forEach(f=>f.style.color = 'black');
            setCurrentPosition('');
            setCurrentFigure('');
            setOnMove('white');
            fields.map(f=>f.innerHTML='');
            const black = [
                1,3,5,7, 8,10,12,14, 17,19,21,23, 24,26,28,30, 
                33,35,37,39, 40,42,44,46, 49,51,53,55, 56,58,60,62];
    
            for (let b of black) {
                    fields[b].style.background = 'grey';
            };
        }

        setFigures() {
            const fields = Array.from(document.querySelectorAll('.field'));
            const inner = (piece, i) => {
                fields[i].innerHTML = piece;
            };
            for (let i=0;i<16;i++) {
                if(i===0||i===7) {
                    inner(rookB,i)
                };
                if(i===1||i===6) {
                    inner(knightB,i)
                };
                if(i===2||i===5) {
                    inner(bishopB,i)
                };
                if(i===3) {
                    inner(queenB,i)
                };
                if(i===4) {
                    inner(kingB,i)
                };
                if (i>7&&i<16) {
                    inner(pawnB,i)
                } 
            }
            for (let i=48; i <64; i++) {
                if(i===56||i===63) {
                    inner(rookW,i)
                };
                if(i===57||i===62) {
                    inner(knightW,i)
                };
                if(i===58||i===61) {
                    inner(bishopW,i)
                };
                if(i===59) {
                    inner(queenW,i)
                };
                if(i===60) {
                    inner(kingW,i)
                };
                if (i>47&&i<56) {
                    inner(pawnW,i)
                } 
            }
        }
    }
    if (onMove==='') {
        setTimeout(Game.setGameboard,20);
    }

    // 6)render---------------------------------------------------------
  return (
    <section className='chess-body'>
        <div  className='gameboard'>{setFields()}</div>
        <button onClick={()=>{let game = new Game(600);Game.setGameboard();game.setFigures()}}>Play</button>
    </section>
  )
}
