import React, {useState, useEffect, useContext} from 'react';
import ContextGameState from './context/Context';


const Quizgame = (props) => {
    const data = props.que;
    const [current, setCurrent] = useState(0);
    const [question, setQuestion] = useState(data[current].text);
    const [options, setOptions] = useState(data[current].options);
    const {setGameState, score, setScore} = useContext(ContextGameState);

    const myFor = ()=> {
        const objs = [];
        for (let i=0; i<4; i++) {
            objs.push(<li onClick={(e)=>{increment(e,current)}} className='question' key={Math.random()*100000}>{options[i]}</li>)
        }
        return objs;
    }

    const increment = (e,c) => {
        if (c < data.length-1) {
            checkAnswer(data[current].answer, e.target.innerHTML);
            setCurrent(current+1);
            setQuestion(data[current+1].text);
            setOptions(data[current+1].options);
        } else {
            setGameState('end');
            //ulozit score to localestorage 
        }
    };

    const checkAnswer = (answer, picked) => {
        if(answer===picked) {
            setScore(score+1);
            console.log('Your score: '+(score+1));
        } else {
            setScore(score);
            console.log('Your score: '+score);
        }
    }

    useEffect(()=>{ 
    },[current]);

  return (
    <section className='quizgame-div f-body'>
        <div className='quizbox-question'><h2>{question}</h2></div>
        <div className='quizbox-grid'>{myFor()}</div>
    </section>
  )
}

export default Quizgame;