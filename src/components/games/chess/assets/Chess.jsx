///. Simple Chess game - version: 1.0, last update: 23.8.2022 ///.
///.----------------------------------------------------------///.
import React, {useState} from 'react';
import { Default } from './Default';
import { TbHistory } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';
import { HiMenuAlt1 } from 'react-icons/hi';

export function Chess() {
// 1)pieces---------------------------------------------------------
    const [pawnW,knightW,bishopW,rookW,queenW,kingW] = ['♙','♘','♗','♖','♕','♔'];
    const [pawnB,knightB,bishopB,rookB,queenB,kingB] = ['♟','♞','♝','♜','♛','♚'];
    const allWhite = ['♙','♘','♗','♖','♕','♔'];
    const allBlack = ['♟','♞','♝','♜','♛','♚'];

// 2)states---------------------------------------------------------
    const [onMove, setOnMove] = useState('');
    const [currentField, setCurrentField] = useState('');
    const [currentFigure, setCurrentFigure] = useState('');
    const [currentPosition, setCurrentPosition] = useState([]);
    const [possibleMoves, setPossibleMoves] = useState([]);
    // const [check, setCheck] = useState(false);
    const [historyStorage, setHistoryStorage] = useState(Default);
    const [historyLevel, setHistoryLevel] = useState(0);


// 3)indexes & fields---------------------------------------------------------
    const setIndexes = () => {
        let ids = [];
        const columns = ['A','B','C','D','E','F','G','H'];
        for (let i=8; i>0; i--) {
            columns.forEach(col=>ids.push(col+i))
        }
        return ids;
    }

    const indexes = setIndexes();
    const setFields = () => {
       return(indexes.map(id=>(
       <div className='field' id={id} key={id} 
       onClick={()=>Piece.movement(id)}>
       </div>
       )));
    }
    

// 4)main game logic---------------------------------------------------------
    class Piece {
        constructor(clickedField, clickedPiece) { 
            this.clickedField = clickedField;
            this.clickedPiece = clickedPiece;
            this.fields = Array.from(document.querySelectorAll('.field'));
            this.f = this.fields.indexOf(this.clickedField);
            this.possibleMoves = [];
            this.orangeOrange = ()=>{
                this.possibleMoves.forEach(m=>{
                    const t = this.fields[m]
                    if(t&&t.innerHTML!==kingB&&t.innerHTML!==kingW){
                        t.style.border = 'solid orange 3px'
                    }
                });
            }
        }

        behavior() {
            switch(this.clickedPiece) {
                case pawnW: 
                    this.pawnBehavior(allWhite);
                    break;
                case pawnB:
                    this.pawnBehavior(allBlack);
                    break;
                case knightW :
                    this.knightBehavior(allWhite);
                    break;
                case knightB:
                    this.knightBehavior(allBlack);
                    break;
                case bishopW:
                    this.bishopBehavior(allWhite);
                    break;
                case bishopB:
                    this.bishopBehavior(allBlack);
                    break;
                case rookW:
                    this.rookBehavior(allWhite);
                    break;
                case rookB:
                    this.rookBehavior(allBlack);
                    break;
                case queenW:
                    console.log(queenW);
                    break;
                case queenB:
                    console.log(queenB);
                    break;
                case kingW: 
                    console.log(kingW);
                    break;
                case kingB: 
                    console.log(kingB);
                    break;
                default: return false;
            }
        }   

        pawnBehavior(group) {
            const fields = this.fields; 
            const f = this.f;
            const possible = (...pars) => this.possibleMoves.push(...pars);
            let [start, forth, left, right, position] = [];
            if(group===allWhite)[start, forth, left, right, position] = [f-16,f-8,f-7,f-9,f>47];
            if(group===allBlack)[start, forth, left, right, position] = [f+16,f+8,f+7,f+9,f<17];
            //situace:
            const A = fields[forth].innerHTML===''&& fields[start].innerHTML=== ''&& position;     //start //f+-16
            const B = fields[forth].innerHTML===''&& !group.includes(fields[forth].innerHTML);     //forth //f+-8
            const C = fields[left].innerHTML!==''&& !group.includes(fields[left].innerHTML);       //left  //f+-7   
            const D = fields[right].innerHTML!==''&& !group.includes(fields[right].innerHTML);     //right //f+-9
            //kombinace podminek:
            if(A&&B&&C&&D)possible(start,forth,left,right)
            if(A&&B&&C)possible(start,forth,left)
            if(A&&B&&D)possible(start,forth,right)
            if(A&&C&&D)possible(start,left,right) 
            if(C&&B&&D)possible(left,forth,right)  
            if(A&&B)possible(start,forth)
            if(A&&C)possible(start,left)
            if(A&&D)possible(start,right)
            if(B&&C)possible(forth,left)
            if(B&&D)possible(forth,right)
            if(C&&D)possible(left,right)
            if(A)possible(start)
            if(B)possible(forth)
            if(C)possible(left)
            if(D)possible(right)
            //vykresleni:
            this.orangeOrange();
        }

        knightBehavior(group) {
            const fields = this.fields;
            const f = this.f;
            const A = [0,8,16,24,32,40,48,56];
            const B = [1,9,17,25,33,41,49,57];
            const G = [6,14,22,30,38,46,54,62];
            const H = [7,15,23,31,39,47,55,63];
        //1) //horse -15,-17,-6,-10,+6,+10,+15,+17
            this.possibleMoves.push(f-17,f-15,f-10,f-6,f+6,f+10,f+15,f+17);
        //2) //if exist, group                                                  
            const possible = this.possibleMoves.filter(f=>fields[f]).filter(f=>!group.includes(fields[f].innerHTML));
        //3) vylouceni pri krajnich pozicich vlevo/vpravo
            // A sloupec=> nesmi -17,-10,+6,+15
            if(A.includes(f))this.possibleMoves=possible.filter(x=>x!==f-17&&x!==f-10&&x!==f+6&&x!==f+15);
            // B sloupec=> nesmi -10,+6
            if(B.includes(f))this.possibleMoves=possible.filter(x=>x!==f-10&&x!==f+6);
            // G sloupec=> nesmi -6,+10
            if(G.includes(f))this.possibleMoves=possible.filter(x=>x!==f-6&&x!==f+10);
            // H sloupec=> nesmi -15,-6,+10,+17
            if(H.includes(f))this.possibleMoves=possible.filter(x=>x!==f-15&&x!==f-6&&x!==f+10&&x!==f+17);
            else if (!A.includes(f)&&!B.includes(f)&&!G.includes(f)&&!H.includes(f))this.possibleMoves = possible;
            this.orangeOrange();
        }

        bishopBehavior(group) {
            const fields = this.fields;
            const f = this.f;
            const whiteFields = [
                [0,9,18,27,36,45,54,63],[2,11,20,29,38,47],[16,25,34,43,52,61],[4,13,22,31],[32,41,50,59],[6,15],[48,57],
                [2,9,16],[47,54,61],[4,11,18,25,32],[31,38,45,52,59],[6,13,20,27,34,41,48],[15,22,29,36,43,50,57]
            ];
            const blackFields = [
                [1,8],[3,10,17,24],[5,12,19,26,33,40],[7,14,21,28,35,42,49,56],[23,30,37,44,51,58],[39,46,53,60],[55,62],
                [5,14,23],[3,12,21,30,39],[1,10,19,28,37,46,55],[8,17,26,35,44,33,62],[24,33,42,51,60],[40,49,58]
            ];   
            // const A = [[0,9,18,27,36,45,54,63],[2,11,20,29,38,47],[16,25,34,43,52,61],[4,13,22,31],[32,41,50,59],[6,15],[48,57]];
            // const B =[[2,9,15],[47,54,61],[4,11,18,25,32],[31,38,45,52,59],[6,13,20,27,34,41,48],[15,22,29,36,43,50,57]];
            const possible= [];
            let occupied = [];
            const [shorterA, shorterB] = [[],[]]
            const [shorterAA,shorterAB, shorterBA, shorterBB] = [[],[],[],[]];
            whiteFields.forEach(arr=>(arr.includes(f))? possible.push(arr): false);
            blackFields.forEach(arr=>(arr.includes(f))? possible.push(arr): false);
            possible.forEach(ar=>{
                ar.forEach(num=>{
                    if(fields[num].innerHTML&&fields[num].innerHTML!==fields[f].innerHTML)occupied.push(num)
                })
            });
            possible.forEach(ar=>{
                ar.forEach(num=>{
                    if(num<f)shorterA.push(num);
                    if(num>f)shorterB.push(num);
                })
            });
            let [actualA, actualB,actualC, actualD] = [-1,-1,-1,-1];
            const short = (arr,s1,s2,a1,a2)=> {
                arr.forEach(num=>{
                    if(num>a1) {
                        s1.push(num)
                        a1=num;
                    } else if(num>a2){
                        a1=100;
                        s2.push(num)
                        a2=num;
                    }
                })
            }
            short(shorterA, shorterAA, shorterAB, actualA, actualB);
            short(shorterB, shorterBA, shorterBB, actualC, actualD);
            shorterAA.reverse();
            shorterAB.reverse();
            const barrier= (arr, possible)=> {
                arr.find(num=>{
                    possible.push(num);
                    return fields[num].innerHTML!==''
                })
            }
            const final = [shorterAA,shorterAB,shorterBB,shorterBA];
            final.forEach(f=>barrier(f, this.possibleMoves));
            this.possibleMoves = this.possibleMoves.filter(e=>!group.includes(fields[e].innerHTML));
            this.orangeOrange();
        }


        rookBehavior(group) {
            // const fields = this.fields;
            // const f = this.f;
            //conditions for rook
            //smer (doleva) a) -1 => push => const arrLeftRook = []  leftInner if element.innerHTML!=='' => indexOf(thisElement)
            //smer (doprava) b) +1 => push => const arrRightRook = []
            //smer (nahoru) c) +8 => push => const arrUpRook = []
            //smer (dolu) d) -8 => push => const arrDown = []
        }



        static pawnForQueen(field, figure) {
            const fields = Array.from(document.querySelectorAll('.field'));
            if(figure===pawnW&&!fields[field]-8&&fields.indexOf(field)<8)field.innerHTML = queenW;
            if(figure===pawnB&&fields.indexOf(field)>58)field.innerHTML = queenB;
        }

        static movement(id) {
            const fields = Array.from(document.querySelectorAll('.field'));
            const fieldNumber = indexes.indexOf(id);
            const clicked = fields[fieldNumber];
            const clickedValue = clicked.innerHTML;
        //1-vyber figury (oznaceni)
            if(currentFigure===''&& clicked.innerHTML!==''&& clicked.innerHTML!==currentFigure&& historyLevel===historyStorage.length-1) {
                const pickFigure = () => {
                    fields.forEach(f=>f.style.color = 'black');
                    setCurrentFigure(clicked.innerHTML);
                    setCurrentField(id);
                    clicked.style.color = 'orange';
                    const pieceType = new Piece(clicked, clickedValue);
                    pieceType.behavior();
                    setPossibleMoves(pieceType.possibleMoves);
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
            else if (currentFigure===clicked.innerHTML&& id===currentField) {
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
                        new History(historyLevel+1, historyStorage);
                        Piece.pawnForQueen(clicked, currentFigure);
                        (fields[(indexes.indexOf(currentField))]).innerHTML = '';
                        (fields[(indexes.indexOf(currentField))]).style.color = 'black';
                        fields.forEach(f=>f.style.border = 'none');
                    }
                    //klikam na policko, ktere se nachazi v predem definovanych pozizich => pokud vaci true=> "moveNow()" muze probehnout =>
                    //pokud vraci false => jde na dalsi podminku, kde je potreba zamezit definovanym figuram (zatim pawn, knight,bishop) volny pohyb..
                    if(possibleMoves.includes(fieldNumber))moveNow();
                    if((currentFigure!==pawnB&&currentFigure!==pawnW&&currentFigure!==knightW&&currentFigure!==knightB)&&currentFigure!==bishopW&&currentFigure!==bishopB)moveNow();
                }

                if (onMove==='black'&& allWhite.indexOf(clicked.innerHTML)===-1)move();
                else if (onMove==='white'&& allBlack.indexOf(clicked.innerHTML)===-1)move();
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

        setPlayer() {

        }

        setTime() {

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
            setHistoryStorage(Default);
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
            this.report = this.save();
        }

        save() {
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
            // console.log(this.level);
            this.history.push(positions);
            setHistoryStorage(this.history);
            setCurrentPosition(historyStorage[historyLevel]);
            document.querySelector('.play-btn').title = 'Click to restart';
        }
    }

    const listHistory = (click) => {
        const fields = (Array.from(document.querySelectorAll('.field')));
        // fields.forEach(f=>f.innerHTML='');
        if(historyLevel>0 &&click ==='back') {
            let figures = [];
            setHistoryLevel((previous)=>previous-1);
            historyStorage[historyLevel-1].map(obj=>figures.push(obj.Figure));
            // for (let i=0;i<64;i++) {
            //     // fields[i].innerHTML = figures[0];
            //     figures.shift();
            // } 
                console.log(figures)
        } 
        if(historyLevel<historyStorage.length-1&& click==='forth') {
            let figures = [];
            setHistoryLevel((previous)=>previous+1)
            historyStorage[historyLevel+1].map(obj=>figures.push(obj.Figure));
            for (let i=0;i<64;i++) {
                fields[i].innerHTML = figures[0];
                figures.shift();
            } 
        }
    }

    const viewHistory = () => {
        if (historyLevel===historyStorage.length-1) {
            // console.log(historyLevel);
            console.log(currentPosition);
            // console.log(JSON.stringify(historyStorage[historyLevel]));
        }
        console.log(JSON.stringify({historyStorage}));
    }

    if (onMove==='') {
        setTimeout(()=>{
            new Game();
        },42);
    }

    // useEffect(()=>{
    //     // console.log(currentPosition);
    // },[]);

// 7)render---------------------------------------------------------
  return (
    <section className='chess-body'>
        <div className='history-btns'>
            <button className='menu-btn'><HiMenuAlt1 /></button>
            <button onClick={()=>listHistory('back')}>◄◄</button>
            <button onClick={()=>{viewHistory()}} className='view-btn' title='Only in console'><TbHistory/> View History <TbHistory/></button>
            <button onClick={()=>listHistory('forth')}>►►</button>
            <button className='option-btn'><FiSettings/></button>
        </div>
        <div  className='gameboard'>{setFields()}</div>
        <button onClick={()=>{const game = new Game(600);game.setFigures()}} className='play-btn' title='Click to start'>Play</button>
    </section>
  )
}