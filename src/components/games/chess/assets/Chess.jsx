///. Simple Chess game - version: 1.0, last update: 27.8.2022 ///.
///.----------------------------------------------------------///.
import React, {useState, useEffect} from 'react';
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
    let whiteIsChecked = false;
    let blackIsChecked = false;

// 2)states---------------------------------------------------------
    const [lastKing, setLastKing] = useState(0);
    const [onMove, setOnMove] = useState('white');
    const [currentField, setCurrentField] = useState('');
    const [currentFigure, setCurrentFigure] = useState('');
    const [currentPosition, setCurrentPosition] = useState([]);
    const [possibleMoves, setPossibleMoves] = useState([]);
    const [whiteIsCheckedState, setWhiteIsCheckedState] = useState(false);
    const [blackIsCheckedState, setBlackIsCheckedState] = useState(false);
    const [check, setCheck] = useState('');
    const [kingMovedW, setKingMovedW] =useState(false);
    const [kingMovedB, setKingMovedB] =useState(false);
    // const [checkKingW, setChecKingkW] = useState(false);
    // const [checkKingB, setCheckKingB] = useState(false);
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
    function setFields(){
       return(indexes.map(id=>(
       <div className='field' id={id} key={id} 
       onClick={()=>Piece.movement(id)}>
       </div>
       )));
    }


// 4)game preparation---------------------------------------------------------
    class Game {
        constructor(time) {
            this.time = time;
            this.fields = Array.from(document.querySelectorAll('.field'));
        }

         static setGameboard() {
            const black = [1,3,5,7,8,10,12,14,17,19,21,23,24,26,28,30,33,35,37,39,40,42,44,46,49,51,53,55,56,58,60,62];
            const fields = Array.from(document.querySelectorAll('.field'));
            document.querySelector('.menu').style.background = 'none';
            black.map(b=>fields[b].style.background='lightblue');
            fields.forEach(f=>f.style.color = 'black');
            fields.forEach(f=>f.style.border = 'none');
            fields.map(f=>f.innerHTML='');
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

// 5)main game logic---------------------------------------------------------
    class Piece {
        constructor(clickedField, clickedPiece) { 
            this.clickedField = clickedField;
            this.clickedPiece = clickedPiece;
            this.fields = Array.from(document.querySelectorAll('.field'));
            this.f = this.fields.indexOf(this.clickedField);
            this.possibleMoves = [];
            this.orangeOrange = ()=>{
                this.possibleMoves.forEach(m=>{
                    // const t = this.fields[m]
                    if(this.fields[m]){
                        this.fields[m].style.border = 'solid orange 3px'
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
                    this.queenBehavior(allWhite);
                    break;
                case queenB:
                    this.queenBehavior(allBlack);
                    break;
                case kingW: 
                    this.kingBehavior(allWhite);
                    break;
                case kingB: 
                    this.kingBehavior(allBlack);
                    break;
                default: return false;
            }
        }   

        pawnBehavior(group) {
            const fields = this.fields; 
            const f = this.f;
            const possible = (...pars) => this.possibleMoves.push(...pars);
            let [start, forth, left, right, position] = [];
            if(group===allWhite)[start, forth, left, right, position] = [f-16,f-8,f-9,f-7,f>47];
            if(group===allBlack)[start, forth, left, right, position] = [f+16,f+8,f+7,f+9,f<17];
            //situace:
            const rowA = [0,8,16,24,32,40,48,56];
            const rowH = [7,15,23,31,39,47,55,63];
            const A0 = rowA.includes(f)&&fields[f].innerHTML===pawnW;
            const H0 = rowH.includes(f)&&fields[f].innerHTML===pawnB;
            const A = fields[forth].innerHTML===''&& fields[start]!==undefined&& fields[start].innerHTML=== ''&& position;     
            //start //f+-16
            const B = fields[forth].innerHTML===''&& !group.includes(fields[forth].innerHTML);     
            //forth //f+-8
            const C = fields[left]&&fields[left].innerHTML!=='' && fields[left]!==undefined&&!A0&& !group.includes(fields[left].innerHTML);      
            //left  //f+-7   
            const D = fields[right]&&fields[right].innerHTML!==''&& fields[right]!==undefined&&!H0&& !group.includes(fields[right].innerHTML);     
            //right //f+-9
            //kombinace podminek:
            if (A && B && C && D)possible(start,forth,left,right)
            if (A && B && C)possible(start,forth,left)
            if (A && B && D)possible(start,forth,right)
            if (A && C && D)possible(start,left,right) 
            if (C && B && D)possible(left,forth,right)  
            if (A && B)possible(start,forth)
            if (A && C)possible(start,left)
            if (A && D)possible(start,right)
            if (B && C)possible(forth,left)
            if (B && D){possible(forth,right);}//console.log(true);}
            if (C && D)possible(left,right)
            if (A)possible(start)
            if (B)possible(forth)
            if (C)possible(left)
            if (D)possible(right)
        }

        pawnLeftRightOnly(group) {
            const fields = this.fields; 
            const f = this.f;
            const possible = (...pars) => this.possibleMoves.push(...pars);
            let [left, right] = [];
            if(group===allWhite)[left, right] = [f-9,f-7,f>47];
            if(group===allBlack)[left, right] = [f+7,f+9,f<17];
            const rowA = [0,8,16,24,32,40,48,56];
            const rowH = [7,15,23,31,39,47,55,63];
            const A0 = rowA.includes(f)&&fields[f].innerHTML===pawnW;
            const H0 = rowH.includes(f)&&fields[f].innerHTML===pawnB;
            const C = fields[left]&& fields[left]!==undefined&&!A0&& !group.includes(fields[left].innerHTML);      
            //left  //f+-7   
            const D = fields[right]&& fields[right]!==undefined&&!H0&& !group.includes(fields[right].innerHTML); 
            //right //f+-9
            if(C&&D)possible(left,right)
            if(C)possible(left)
            if(D)possible(right)
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
        }

        bishopBehavior(group) {
            const fields = this.fields;
            const f = this.f;
            const whiteFields = [
                [0,9,18,27,36,45,54,63],[2,11,20,29,38,47],[16,25,34,43,52,61],[4,13,22,31],[32,41,50,59],[6,15],[48,57],
                [2,9,16],[47,54,61],[4,11,18,25,32],[31,38,45,52,59],[6,13,20,27,34,41,48],[15,22,29,36,43,50,57]
            ];
            const blackFields = [
                [1,8],[3,10,17,24],[5,12,19,26,33,40],[7,14,21,28,35,42,49,56],[23,30,37,44,51,58],[39,46,53,60],[55,62],[24,33,42,51,60],
                [40,49,58],[5,14,23],[3,12,21,30,39],[1,10,19,28,37,46,55],[8,17,26,35,44,53,62],
                // ??? proc  extra arrs?!
                [40,49,58],[24,33,42,51,60],[8,17,26,35,44,53,62],[1,10,19,28,37,46,55],[3,12,21,30,39],[5,14,23]
            ];   
            const possible= [];
            const [shorterA, shorterB] = [[],[]]
            const [shorterAA,shorterAB, shorterBA, shorterBB] = [[],[],[],[]];
            whiteFields.forEach(arr=>(arr.includes(f))? possible.push(arr): false);
            blackFields.forEach(arr=>(arr.includes(f))? possible.push(arr): false);
            possible.forEach(ar=>{
                ar.forEach(num=>{
                    if(num<f)shorterA.push(num);
                    if(num>f)shorterB.push(num);
                })
            });
            let [actualA, actualB,actualC, actualD] = [-10,-10,-10,-10];
            const short = (arr,s1,s2,a1,a2)=> {
                arr.forEach(num=>{
                    if(num>a1) {
                        a1=num;
                        s1.push(num)
                    } else if(num>a2){
                        a1=100;
                        a2=num;
                        s2.push(num)
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
//checking direction
            let direction = false;
            const kingIsHere = (a) => {
                a.map(arr=>arr.forEach(num=>{
                    if(this.fields[num].innerHTML===kingB) {
                        direction = arr;
                    } else if(this.fields[num].innerHTML===kingW) {
                        direction = arr;
                    } 
                }))
                return direction;
            }
            const withoutKing = ['♟','♞','♝','♜','♛','♙','♘','♗','♖','♕']
            //const withoutKing = allBlack.concat(allWhite);
            kingIsHere(final);
            // let color;
            // group===allWhite?color='black':color='white';
            if(direction&&onMove==='black') {
                this.fields.forEach(f=>f.classList.remove('check-direction-blackis'));
                //group
                direction.find(e=>{
                    this.fields[e].classList.add('check-direction-blackis');
                    // this.fields[e].style.border = 'solid orange 2px'
                    return withoutKing.includes(this.fields[e].innerHTML);
                })
            } else if (direction&&onMove==='white') {
                this.fields.forEach(f=>f.classList.remove('check-direction-whiteis'));
                //group
                direction.find(e=>{
                    this.fields[e].classList.add('check-direction-whiteis');
                    // this.fields[e].style.border = 'solid orange 2px'
                    return withoutKing.includes(this.fields[e].innerHTML);
                })
            }
            final.forEach(f=>barrier(f, this.possibleMoves));
            this.possibleMoves = this.possibleMoves.filter(e=>!group.includes(fields[e].innerHTML));
        }


        rookBehavior(group) {
            const fields = this.fields;
            const f = this.f;
            let cur;
            const [A,B,C,D,E,F,G,H] = [
                [0,8,16,24,32,40,48,56],[1,9,17,25,33,41,49,57],[2,10,18,26,34,42,50,58],
                [3,11,19,27,35,43,51,59],[4,12,20,28,36,44,52,60],[5,13,21,29,37,45,53,61],
                [6,14,22,30,38,46,54,62],[7,15,23,31,39,47,55,63]
            ]
            const [up,down,left,right] = [[],[],[],[]];
            if(A.includes(f)){
                right.push(f+1,f+2,f+3,f+4,f+5,f+6,f+7);
                cur=A
            }
            if(B.includes(f)){
                left.push(f-1);
                right.push(f+1,f+2,f+3,f+4,f+5,f+6);
                cur=B
            }
            if(C.includes(f)){
                left.push(f-1,f-2);
                right.push(f+1,f+2,f+3,f+4,f+5);
                cur=C
            }
            if(D.includes(f)){
                left.push(f-1,f-2,f-3);
                right.push(f+1,f+2,f+3,f+4);
                cur=D
            }
            if(E.includes(f)){
                left.push(f-1,f-2,f-3,f-4);
                right.push(f+1,f+2,f+3);
                cur=E
            }
            if(F.includes(f)){
                left.push(f-1,f-2,f-3,f-4,f-5);
                right.push(f+1,f+2);
                cur=F
            }
            if(G.includes(f)){
                left.push(f-1,f-2,f-3,f-4,f-5,f-6);
                right.push(f+1);
                cur=G
            }
            if(H.includes(f)){
                left.push(f-1,f-2,f-3,f-4,f-5,f-6,f-7);
                cur=H
            }
            let possible = [];
            cur.forEach(num=>{
                if(num<f)up.unshift(num)
                else if(num>f)down.push(num)
            })
            // left.reverse()
            // console.log(left,right)
            left.find(el=>{
                possible.push(el)
                return fields[el].innerHTML!==''})
            right.find(el=>{
                possible.push(el)
                return fields[el].innerHTML!==''})
            // console.log(up, down)
            up.find(el=>{
                possible.push(el)
                return fields[el].innerHTML!==''})
            down.find(el=>{
                possible.push(el)
                return fields[el].innerHTML!==''})
           
                
//rook behavior => checking direction
                // let direction = false;
                
                // const withoutKing = ['♟','♞','♝','♜','♛','♙','♘','♗','♖','♕']
                //const withoutKing = allBlack.concat(allWhite);
                // kingIsHere(final);
               
                // if(direction&&onMove==='black') {
                //     this.fields.forEach(f=>f.classList.remove('check-direction-blackis'));
                //     //group
                //     direction.find(e=>{
                //         this.fields[e].classList.add('check-direction-blackis');
                //         // this.fields[e].style.border = 'solid orange 2px'
                //         return withoutKing.includes(this.fields[e].innerHTML);
                //     })
                // } else if (direction&&onMove==='white') {
                //     this.fields.forEach(f=>f.classList.remove('check-direction-whiteis'));
                //     //group
                //     direction.find(e=>{
                //         this.fields[e].classList.add('check-direction-whiteis');
                //         // this.fields[e].style.border = 'solid orange 2px'
                //         return withoutKing.includes(this.fields[e].innerHTML);
                //     })
                // }
                // final.forEach(f=>barrier(f, this.possibleMoves));
                // this.possibleMoves = this.possibleMoves.filter(e=>!group.includes(fields[e].innerHTML));
                
                this.possibleMoves = possible.filter(e=>!group.includes(fields[e].innerHTML));

        }

        queenBehavior(color) {
            const possibleQueen = [];
            this.rookBehavior(color);
            possibleQueen.concat(this.possibleMoves);
            this.bishopBehavior(color);
            possibleQueen.concat(this.possibleMoves);
        }

        kingBehavior(group) {
            const fields = this.fields;
            const f = this.f;
            setLastKing(f);
            const kingBasic = [f-9,f-8,f-7,f-1,f+1,f+7,f+8,f+9];
            const [Aline, Hline] = [[0,8,16,24,32,40,48,56],[7,15,23,31,39,47,55,63]]
            const A = (f===4&&fields[7].innerHTML===rookB&&kingMovedB===false)  //kingBasic.push(f+2)
            const B = (f===4&&fields[0].innerHTML===rookB&&kingMovedB===false)//kingBasic.push(f-2)
            const C = (f===60&&fields[63].innerHTML===rookW&&kingMovedW===false)//kingBasic.push(f+2)
            const D = (f===60&&fields[56].innerHTML===rookW&&kingMovedW===false)//kingBasic.push(f-2)

            if(A&&B)kingBasic.push(f+2,f-2)
            if(A)kingBasic.push(f+2)
            if(B)kingBasic.push(f-2)
            if(C&&D)kingBasic.push(f+2,f-2)
            if(C)kingBasic.push(f+2)
            if(D)kingBasic.push(f-2)

            const kingPlus = kingBasic.filter(f=>(fields[f]&&!group.includes(fields[f].innerHTML))) 
            
            //+if fields[f].classList.contains('checked-W/B')===false
            this.possibleMoves = kingPlus;
            if(fields[f].innerHTML===kingW) {
                const kingPlusPlus = kingPlus.filter(f=>!fields[f].classList.contains('checkedFromBlack'));
                this.possibleMoves = kingPlusPlus;
            } else if(fields[f].innerHTML===kingB) {
                const kingPlusPlus = kingPlus.filter(f=>!fields[f].classList.contains('checkedFromWhite'));
                this.possibleMoves = kingPlusPlus;
            }

            if(Aline.includes(f)) {
                this.possibleMoves = this.possibleMoves.filter(num=>num!==f-1&&num!==f-9&&num!==f+7);
            } else if(Hline.includes(f)) {
                this.possibleMoves = this.possibleMoves.filter(num=>num!==f+1&&num!==f-7&&num!==f+9);
            }
            
            // + tahy rosada:
            if(check===false&&fields[f].innerHTML===kingW&&fields[f+1].innerHTML===''&&fields[f+2].innerHTML===''&&fields[63].innerHTML===rookW&&fields[62].innerHTML===''&&fields[61]==='') {
                console.log(fields[62].innerHTML)
                this.possibleMoves.push(f+2);
            }
            if(check===false&&fields[f].innerHTML===kingW&&fields[f-1].innerHTML===''&&fields[f-2].innerHTML===''&&fields[f-3].innerHTML===''&&fields[56].innerHTML===rookW&&fields[57].innerHTML===''&&fields[58]==='') {
                this.possibleMoves.push(f-2);
            }
            if(check===false&&fields[f].innerHTML===kingB&&fields[f+1].innerHTML===''&&fields[f+2].innerHTML===''&&fields[7].innerHTML===rookB&&fields[6].innerHTML===''&&fields[5]==='') {
                this.possibleMoves.push(f+2);
            }
            if(check===false&&fields[f].innerHTML===kingB&&fields[f-1].innerHTML===''&&fields[f-2].innerHTML===''&&fields[f-3].innerHTML===''&&fields[0].innerHTML===rookB&&fields[1].innerHTML===''&&fields[2]==='') {
                this.possibleMoves.push(f-2);
            }
        }

        //pokud byl posun krale o 2 pole (neco jako..lastPositionKing-currentPositionKing >1 =>rosada)
        static rosada(cur) {
            const fields = Array.from(document.querySelectorAll('.field'));
            // console.log(lastKing-cur==-2);
            if(lastKing-cur===-2||lastKing-cur===2){
                if(cur===62) {
                    fields[63].innerHTML='';
                    fields[61].innerHTML=rookW;
                }
                if(cur===58) {
                    fields[56].innerHTML='';
                    fields[59].innerHTML=rookW;
                }
                if(cur===6) {
                    fields[7].innerHTML='';
                    fields[5].innerHTML=rookB;
                }
                if(cur===2) {
                    fields[0].innerHTML='';
                    fields[3].innerHTML=rookB;
                }
            }
        }

        static kingMoved(figure,fields) {
            if (figure===kingW&&fields[60].innerHTML!==kingW) {
                console.log('kingW moved');
                setKingMovedW(true);
            } 
            else if(figure===kingB&&fields[4].innerHTML!==kingB) {
                setKingMovedB(true);
                console.log('kingB Moved')
            }
        }
        
        static kingIsChecked(fields) {
            fields.forEach(f=>{
                if (f.innerHTML===kingB&&f.classList.contains('checkedFromWhite')) {
                    blackIsChecked = true;
                    setBlackIsCheckedState(true);
                } else if(f.innerHTML===kingW&&f.classList.contains('checkedFromBlack')) {
                    whiteIsChecked = true;
                    setWhiteIsCheckedState(true);
                }
            })
            if(blackIsChecked){
                fields.forEach(f=>f.innerHTML===kingB&&onMove==='black'?f.style.color = 'orange':false)
            } else if(whiteIsChecked){
                fields.forEach(f=>f.innerHTML===kingW&&onMove==='white'?f.style.color = 'orange':false)
            }
        }

        static pawnForQueen(field, figure) {
            const fields = Array.from(document.querySelectorAll('.field'));
            if(figure===pawnW&&!fields[field]-8&&fields.indexOf(field)<8)field.innerHTML = queenW;
            if(figure===pawnB&&fields.indexOf(field)>55)field.innerHTML = queenB;
        }

        

        static movement(id) {
            const fields = Array.from(document.querySelectorAll('.field'));
            const fieldNumber = indexes.indexOf(id);
            const clicked = fields[fieldNumber]; //===id ?
            const clickedValue = clicked.innerHTML;
        //1-vyber figury (oznaceni)
            if(currentFigure===''&& clicked.innerHTML!==''&& clicked.innerHTML!==currentFigure&& historyLevel===historyStorage.length-1) {
                fields.forEach(f=>f.style.border = 'none');
                const pickFigure = () => {
                    fields.forEach(f=>f.style.color = 'black');
                    setCurrentFigure(clicked.innerHTML);
                    setCurrentField(id);
                    clicked.style.color = 'orange';
                    // Piece.kingMoved(currentFigure, fields);
                    const pieceType = new Piece(clicked, clickedValue);
                    pieceType.behavior();
                    setPossibleMoves(pieceType.possibleMoves);
                    pieceType.orangeOrange();
                }
                if (onMove==='white'&& allWhite.indexOf(clicked.innerHTML)!==-1) {
                    pickFigure();
                    setOnMove('black');
                    setBlackIsCheckedState(false);
                } else if (onMove==='black'&& allBlack.indexOf(clicked.innerHTML)!==-1) {
                    pickFigure();
                    setOnMove('white');
                    setWhiteIsCheckedState(false);
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
            else if (currentFigure!=='') {
                const move = () => {
                    const moveNow =()=> {
                        clicked.innerHTML = currentFigure;
                        setCurrentFigure('');
                        setHistoryLevel((previous)=>previous+1);
                        new History(historyLevel+1, historyStorage);
                        //------------------------------
                        Piece.pawnForQueen(clicked, currentFigure);
                        Piece.rosada(fieldNumber);
                        //------------------------------
                        (fields[(indexes.indexOf(currentField))]).innerHTML = '';
                        (fields[(indexes.indexOf(currentField))]).style.color = 'black';
                        fields.forEach(f=>f.style.border = 'none');
                    }

                    if(possibleMoves.includes(fieldNumber)){
                        if(blackIsCheckedState) {
                            const filtered = possibleMoves.filter(m=>fields[m].classList.contains('check-direction-blackis'));
                            const kingPos = fields.find(f=>f.innerHTML===kingB);
                            const king = new Piece(kingPos,kingB);
                            king.behavior();
                            if(filtered.includes(fieldNumber)||king.possibleMoves.includes(fieldNumber)) {
                                fields.forEach(f=>{
                                    if(filtered.includes(fields.indexOf(f))||king.possibleMoves.includes(fields.indexOf(f))) {
                                        console.log('jsou dostupna pole');
                                    }
                                })
                                moveNow();
                                Piece.kingMoved(currentFigure, fields);
                            }
                        } else if(whiteIsCheckedState) {
                            const filtered = possibleMoves.filter(m=>fields[m].classList.contains('check-direction-whiteis'));
                            const kingPos = fields.find(f=>f.innerHTML===kingW);
                            const king = new Piece(kingPos,kingW);
                            king.behavior();
                            if(filtered.includes(fieldNumber)||king.possibleMoves.includes(fieldNumber)) {
                                fields.forEach(f=>{
                                    if(filtered.includes(fields.indexOf(f))||king.possibleMoves.includes(fields.indexOf(f))) {
                                        console.log('jsou dostupna pole');
                                    }
                                })
                                moveNow();
                                Piece.kingMoved(currentFigure, fields);
                            }
                        } 
                        else if (!blackIsCheckedState&&!whiteIsCheckedState) {
                            moveNow();
                            Piece.kingMoved(currentFigure, fields);
                        }
                    }
                }

                const checkZone = (color) => {
                    const liveFigures = [];
                    const liveFiguresFields = [];
                    let checking = [];
                    fields.forEach(f=>{
                        if(color.includes(f.innerHTML)){
                            liveFigures.push(f.innerHTML) //push f 
                            liveFiguresFields.push(f)
                        }
                    })
                    liveFiguresFields.forEach(l=>{
                        let piece = new Piece(l,l.innerHTML)
                        if(l.innerHTML===pawnW||l.innerHTML===pawnB){
                            piece.pawnLeftRightOnly(color);
                            checking = checking.concat(piece.possibleMoves)
                        } else {
                            piece.behavior(color);
                            checking = checking.concat(piece.possibleMoves)
                        }
                    });
                    if (color===allWhite) {
                        fields.forEach(f=>f.classList.remove('checkedFromWhite'));
                        checking.forEach(ch=>fields[ch].classList.add('checkedFromWhite'));
                    } else {
                        fields.forEach(f=>f.classList.remove('checkedFromBlack'));
                        checking.forEach(ch=>fields[ch].classList.add('checkedFromBlack'));
                    }
                }

                if (onMove==='black'&& allWhite.indexOf(clicked.innerHTML)===-1){
                    move();
                    checkZone(allWhite);
                    Piece.kingIsChecked(fields);
                    // setWhiteIsChecked(false);
                    
                }
                else if (onMove==='white'&& allBlack.indexOf(clicked.innerHTML)===-1){
                    move();
                    checkZone(allBlack);
                    Piece.kingIsChecked(fields);
                    // setBlackIsChecked(false);
                }
            }
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

    useEffect(()=>{
        setCheck('')
        // console.log(blackIsCheckedState);

    },[whiteIsCheckedState,blackIsCheckedState])


// 7)render---------------------------------------------------------
  return (
    <section className='chess-body f-body'>
        <div className='history-btns'>
            <button className='menu-btn'><HiMenuAlt1 /></button>
            <button onClick={()=>listHistory('back')}>◄◄</button>
            <button onClick={()=>{viewHistory()}} className='view-btn' title='Only in console'><TbHistory/> View History <TbHistory/></button>
            <button onClick={()=>listHistory('forth')}>►►</button>
            <button className='option-btn'><FiSettings/></button>
        </div>
        <div className='gameboard menu'>
            {/* <section id='demo'>
                <h1>Play with friend</h1>
                <h1>Play with computer</h1>
            </section> */}
            {setFields()}
        </div>
        <button onClick={()=>{Game.setGameboard();const game = new Game(420);game.setFigures()}} className='play-btn' title='Click to start'>Play</button>
    </section>
  )
}