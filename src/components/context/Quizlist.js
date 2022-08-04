import React, {useState, createContext} from 'react';

const Quizlist = () => {

        const questions = createContext([
            {
                id: 0,
                text: 'Kolik je 0 / 1 ?'
            },
            {
                id: 1,
                text: 'Kolik je 1 + 1 ?'
            },
            {
                id: 2,
                text: 'Kolik je 2 + 2 ?'
            },
            {
                id: 3,
                text: 'Kolik je 3 + 3 ?'
            }
        ])


        const [currentid, setCurrentid] = useState(0);


  return (
        <div>random</div>
  )
}

export default Quizlist;