///. Simple Chess game - version: 1.0, last update: 17.8.2022 ///.
///.----------------------------------------------------------///.
import React, {useState, useEffect} from 'react';
import { Default } from './Default';
import { TbHeartMinus, TbHistory } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';
import { HiMenuAlt1 } from 'react-icons/hi';

export function Chess() {
// 1)pieces---------------------------------------------------------
    const storageDefault = Default();
    const [pawnW,knightW,bishopW,rookW,queenW,kingW] = ['♙','♘','♗','♖','♕','♔'];
    const [pawnB,knightB,bishopB,rookB,queenB,kingB] = ['♟','♞','♝','♜','♛','♚'];
    const allWhite = ['♙','♘','♗','♖','♕','♔'];
    const allBlack = ['♟','♞','♝','♜','♛','♚'];

    const [horseMoves, setHorseMoves] = useState('');

// 2)states---------------------------------------------------------
    const [onMove, setOnMove] = useState('');
    const [currentField, setCurrentField] = useState('');
    const [currentFigure, setCurrentFigure] = useState('');
    const [currentPosition, setCurrentPosition] = useState([]);
    const [possibleMoves, setPossibleMoves] = useState([]);
    const [check, setCheck] = useState(false);
    const [historyStorage, setHistoryStorage] = useState(storageDefault);
    const [historyLevel, setHistoryLevel] = useState(0);

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
       return(indexes.map(id=>(<div className='field'id={id}key={id} onClick={()=>pieceMovement(id)}></div>)));
    }

// 4)main game logic---------------------------------------------------------
    class Piece {
        constructor(clickedField, clickedPiece) { 
            this.clickedField = clickedField;
            this.clickedPiece = clickedPiece;
            // this.allFields = Array.from(document.querySelectorAll('.field'));
            // this.field = fields.indexOf(this.clickedField);
            this.possibleMoves = [];
        }

        
        behavior() {
            const fields = Array.from(document.querySelectorAll('.field'));
            const f = fields.indexOf(this.clickedField);
            const orangeOrange=()=>{
                this.possibleMoves.map(m=>{if(fields[m]&&fields[m].innerHTML!==kingB&&fields[m].innerHTML!==kingW)fields[m].style.border = 'solid orange 3px'})
            }
            switch(this.clickedPiece) {
            //WHITE PAWN-------------------------------------------------------------------------------
            case pawnW: 
            const A = (i)=>fields[i-8].innerHTML===''&&fields[i-16].innerHTML=== ''&& i>47;       //je na startu..............// f-16
            const B = (i)=>fields[i-8].innerHTML===''&&!allWhite.includes(fields[i-8].innerHTML); //nema pred sebou prekazku..// f-8
            const C = (i)=>fields[i-7].innerHTML!==''&&!allWhite.includes(fields[i-7].innerHTML); //muze vyhazovat doleva.....// f-7   
            const D = (i)=>fields[i-9].innerHTML!==''&&!allWhite.includes(fields[i-9].innerHTML); //muze vyhazovat doprava....// f-9
            //1-pesec ma nejvice moznosti----------------//(A,B,C,D): push(f-7,f-8,f-9,f-16);
                if (A(f)&&B(f)&&C(f)&&D(f))this.possibleMoves.push(f-16,f-8,f-7,f-9)
            //2-pesec ma prave 3 moznosti----------------
                if(A(f)&&B(f)&&C(f))this.possibleMoves.push(f-16,f-8,f-7)
                if(A(f)&&B(f)&&D(f))this.possibleMoves.push(f-16,f-8,f-9)
                if(A(f)&&C(f)&&D(f))this.possibleMoves.push(f-16,f-7,f-9) 
                if(C(f)&&B(f)&&D(f))this.possibleMoves.push(f-7,f-8,f-9)  //cbd 
            //3-pesec ma prave 2 moznosti----------------
                if(A(f)&&B(f))this.possibleMoves.push(f-16,f-8)
                if(A(f)&&C(f))this.possibleMoves.push(f-16,f-7)
                if(A(f)&&D(f))this.possibleMoves.push(f-16,f-9)
                if(B(f)&&C(f))this.possibleMoves.push(f-8,f-7)
                if(B(f)&&D(f))this.possibleMoves.push(f-8,f-9)
                if(C(f)&&D(f))this.possibleMoves.push(f-7,f-9)
            //4-pesec ma prave 1 moznost----------------
                if(A(f))this.possibleMoves.push(f-16)
                if(B(f))this.possibleMoves.push(f-8)
                if(C(f))this.possibleMoves.push(f-7)
                if(D(f))this.possibleMoves.push(f-9)
                orangeOrange();
                break;
            //BLACK PAWN-------------------------------------------------------------------------------        
            case pawnB:
            const A2 = (i)=>i<16&&fields[i+8].innerHTML===''&&fields[i+16].innerHTML==='';  //je na startu.....................// f-16
            const B2 = (i)=>fields[i+8].innerHTML===''&&!allBlack.includes(fields[i+8].innerHTML); //nema pred sebou prekazku..// f-8
            const C2 = (i)=>fields[i+7].innerHTML!==''&&!allBlack.includes(fields[i+7].innerHTML); //muze vyhazovat doleva.....// f-7
            const D2 = (i)=>fields[i+9].innerHTML!==''&&!allBlack.includes(fields[i+9].innerHTML); //muze vyhazovat doprava....// f-9
            //1-pesec ma nejvice moznosti----------------
                if (A2(f)&&B2(f)&&C2(f)&&D2(f))this.possibleMoves.push(f+16,f+8,f+7,f+9)
            //2-pesec ma prave 3 moznosti----------------
                if(A2(f)&&B2(f)&&C2(f))this.possibleMoves.push(f+16,f+8,f+7)
                if(A2(f)&&B2(f)&&D2(f))this.possibleMoves.push(f+16,f+8,f+9)
                if(A2(f)&&C2(f)&&D2(f))this.possibleMoves.push(f+16,f+7,f+9)
                if(C2(f)&&B2(f)&&D2(f))this.possibleMoves.push(f+7,f+8,f+9)
            //3-pesec ma prave 2 moznosti----------------
                if(A2(f)&&B2(f))this.possibleMoves.push(f+16,f+8)
                if(A2(f)&&C2(f))this.possibleMoves.push(f+16,f+7)
                if(A2(f)&&D2(f))this.possibleMoves.push(f+16,f+9)
                if(B2(f)&&C2(f))this.possibleMoves.push(f+8,f+7)
                if(B2(f)&&D2(f))this.possibleMoves.push(f+8,f+9)
                if(C2(f)&&D2(f))this.possibleMoves.push(f+7,f+9)
            //4-pesec ma prave 1 moznost----------------
                if(A2(f))this.possibleMoves.push(f+16)
                if(B2(f))this.possibleMoves.push(f+8)
                if(C2(f))this.possibleMoves.push(f+7)
                if(D2(f))this.possibleMoves.push(f+9)
                orangeOrange();
                break;
            //KNIGHT-------------------------------------------------------------------------------
            case knightW :
                this.knightBehavior(allWhite);
                break;
            case knightB:
                this.knightBehavior(allBlack);
            }
        }   

        knightBehavior(group) {
            const fields = Array.from(document.querySelectorAll('.field'));
            const f = fields.indexOf(this.clickedField);
            const orangeOrange=()=>{
                this.possibleMoves.map(m=>{if(fields[m]&&fields[m].innerHTML!==kingB&&fields[m].innerHTML!==kingW)fields[m].style.border = 'solid orange 3px'})
            }
            //1) //horse -15,-17,-6,-10,+6,+10,+15,+17
                this.possibleMoves.push(f-17,f-15,f-10,f-6,f+6,f+10,f+15,f+17);
            //2) //if exist                                                   
                const knightMovesW = this.possibleMoves.filter(f=>fields[f]);
                const knightMovesW2 = knightMovesW.filter(f=>!group.includes(fields[f].innerHTML));
            //3) vylouceni pri krajnich pozicich vlevo/vpravo
               // A sloupec=> nesmi -17,-10,+6,+15
               //    for(let i=0;i<57;i+8){horseA.push(i)} ???
                const horseA = [0,8,16,24,32,40,48,56];
                if(horseA.includes(f)) {
                    this.possibleMoves=knightMovesW2.filter(x=>x!==f-17&&x!==f-10&&x!==f+6&&x!==f+15);
                } 
                // this.possibleMoves = horseA;
                // B sloupec=> nesmi -10,+6
                const horseB = [1,9,17,25,33,41,49,57];
                if(horseB.includes(f)) {
                    this.possibleMoves=knightMovesW2.filter(x=>x!==f-10&&x!==f+6);
                }
                // this.possibleMoves = horseB;
                // G sloupec=> nesmi -6,+10
                const horseG = [6,14,22,30,38,46,54,62];
                if(horseG.includes(f)) {
                    this.possibleMoves=knightMovesW2.filter(x=>x!==f-6&&x!==f+10);
                }
                // this.possibleMoves = horseG;
                // H sloupec=> nesmi -15,-6,+10,+17
                let horseH = [7,15,23,31,39,47,55,63];
                if(horseH.includes(f)) {
                    this.possibleMoves=knightMovesW2.filter(x=>x!==f-15&&x!==f-6&&x!==f+10&&x!==f+17);
                }
                else if (!horseA.includes(f)&&!horseB.includes(f)&&!horseG.includes(f)&&!horseH.includes(f)){
                    this.possibleMoves = knightMovesW2;
                }
                // this.orangeSolid();
                orangeOrange();
        }

        static pawnForQueen(field, figure) {
            const fields = Array.from(document.querySelectorAll('.field'));
            if (figure===pawnW&&!fields[field]-8&&fields.indexOf(field)<8) {
                field.innerHTML = queenW;
            }
            if(figure===pawnB&&fields.indexOf(field)>58) {
                field.innerHTML = queenB;
            }
        }
    }

    const pieceMovement = (field) => {
        const fields = Array.from(document.querySelectorAll('.field'));
        const fieldNumber = indexes.indexOf(field);
        const clicked = fields[fieldNumber];
        const clickedValue = clicked.innerHTML;
    //1-vyber figury (oznaceni)
        if(currentFigure===''&& clicked.innerHTML!==''&& clicked.innerHTML!==currentFigure&& historyLevel===historyStorage.length-1) {
            const pickFigure = () => {
                fields.forEach(f=>f.style.color = 'black');
                setCurrentFigure(clicked.innerHTML);
                setCurrentField(field);
                clicked.style.color = 'orange';
                const pieceType = new Piece(clicked, clickedValue);
                pieceType.behavior();
                setPossibleMoves(pieceType.possibleMoves);
                // console.log(pieceType.possibleMoves);
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
            fields.forEach(f=>f.style.border = 'none');
        } 
    //3-tah s figurou
        else if (currentFigure!==''&& clicked.innerHTML!==kingB&& clicked.innerHTML!==kingW) {
            const move = () => {
                const moveNow =()=> {
                    clicked.innerHTML = currentFigure;
                    setCurrentFigure('');
                    setHistoryLevel((previous)=>previous+1);
                    new History(historyLevel, historyStorage);
                    Piece.pawnForQueen(clicked, currentFigure);
                    (fields[(indexes.indexOf(currentField))]).innerHTML = '';
                    (fields[(indexes.indexOf(currentField))]).style.color = 'black';
                    fields.forEach(f=>f.style.border = 'none');
                }
                //klikam na policko, ktere se nachazi v predem definovanych pozizich => pokud vaci true=> "move()" muze probehnout =>
                //pokud vraci false => jde na dalsi podminku, kde je potreba zamezit definovanym figuram (zatim pawn, knight) volny pohyb..
                if(possibleMoves.includes(fieldNumber)) { 
                    console.log(currentFigure);
                    moveNow();
                } 
                if ((currentFigure!==pawnB&&currentFigure!==pawnW&&currentFigure!==knightW&&currentFigure!==knightB)) {          
                    console.log('wtf');
                    moveNow();
                }
            }

            if (onMove==='black'&& allWhite.indexOf(clicked.innerHTML)===-1) {
                move();
            } else if (onMove==='white'&& allBlack.indexOf(clicked.innerHTML)===-1) {
                move();
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
            1,3,5,7,     8,10,12,14, 
            17,19,21,23, 24,26,28,30, 
            33,35,37,39, 40,42,44,46, 
            49,51,53,55, 56,58,60,62];
            black.map(b=>this.fields[b].style.background='lightblue');
            this.fields.forEach(f=>f.style.color = 'black');
            this.fields.forEach(f=>f.style.border = 'none');
            this.fields.map(f=>f.innerHTML='');
            setCurrentField('');
            setCurrentFigure('');
            setOnMove('white');
            setHistoryStorage(storageDefault);
            setHistoryLevel(0);
            document.querySelector('.play-btn').title = 'Click to start';
        }

        setFigures() {
            const fields = (Array.from(document.querySelectorAll('.field')));
            let figures = [];
            historyStorage[0].forEach(obj=>figures.push(obj.Figure));
            for (let i=0;i<64;i++) {
                fields[i].innerHTML = figures[0];
                figures.shift();
            } 
            document.querySelector('.play-btn').title = '';
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
            document.querySelector('.play-btn').title = 'Click to restart';
        }
    }

    const listHistory = (click) => {
        const fields = (Array.from(document.querySelectorAll('.field')));
        if(historyLevel>=1 &&click ==='back') {
            let figures = [];
            historyStorage[historyLevel-1].map(obj=>figures.push(obj.Figure));
            setHistoryLevel((previous)=>previous-1)
            for (let i=0;i<64;i++) {
                fields[i].innerHTML = figures[0];
                figures.shift();
            } 
        } 
        if(historyLevel<historyStorage.length-1&& click==='forth') {
            let figures = [];
            historyStorage[historyLevel+1].map(obj=>figures.push(obj.Figure));
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
        },42);
    }

    useEffect(()=>{
        console.log(currentPosition);
    },[currentPosition, historyLevel]);

// 7)render---------------------------------------------------------
  return (
    <section className='chess-body'>
        <div className='history-btns'>
            <button className='menu-btn'><HiMenuAlt1 /></button>
            <button onClick={()=>listHistory('back')}>◄◄</button>
            <button onClick={()=>{viewHistory()}} className='view-btn' title='Look into the console'><TbHistory/> View History <TbHistory/></button>
            <button onClick={()=>listHistory('forth')}>►►</button>
            <button className='option-btn'><FiSettings/></button>
        </div>
        <div  className='gameboard'>{setFields()}</div>
        <button onClick={()=>{const game = new Game(600);game.setFigures()}} className='play-btn' title='Click to start'>Play</button>
    </section>
  )
}