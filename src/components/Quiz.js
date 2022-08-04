import React from 'react';
import Quizgame from './Quizgame';


const Quiz = () => {
    
    const questionsdata = [
      { id: 0, text: 'Which of this is not a programming language?',
          options: ['Python', 'Java', 'MC+', 'PHP'],
        answer: 'MC-03' },
      { id: 1, text: 'How many elements are in the periodic table?',
          options: [155, 118, 90, 85],
        answer: 118 },
      { id: 2, text: 'Where is the strongest human muscle located??',
          options: ['Jaw', 'Leg', 'Arm', 'Back'],
        answer: 'Jaw' },
      { id: 3, text: 'What artist has the most streams on Spotify?',
          options: ['Eminem', 'Drake', 'Post Malone', 'Ed Sheeran'],
        answer: 'Drake' },
      { id: 4, text: 'How many minutes are in a full week?',
          options: [10080, 336640, 11010, 201209],
        answer: 10080 },
      { id: 5, text: 'What car manufacturer had the highest revenue in 2020?',
          options: ['Toyota', 'Volkswagen', 'Kia', 'Hyundai'],
        answer: 'Volkswagen' },
      { id: 6, text: 'Who was the Ancient Greek God of the Sun?',
          options: ['Apollo', 'Hades', 'Poseidon', 'Herakles'],
        answer: 'Apollo' },
        { id: 7, text: 'What game studio makes the Red Dead Redemption series?',
          options: ['Activision', 'Rockstar Games', 'Sega', 'EA'],
        answer: 'Rockstar Games' },
        { id: 8, text: 'How many ghosts chase Pac-Man at the start of each game?',
          options: ['8', '3', '6', '4'],
        answer: 4 },
        { id: 9, text: 'What company was initially know as "Blue Ribbon Sports"?',
          options: ['Adidas', 'Puma', 'Hollister', 'Nike'],
        answer: 'Nike' },
        { id: 10, text: 'Which planet has the most moons?',
          options: ['Jupiter', 'Saturn', 'Mars', 'Neptun'],
        answer: 'Saturn' },
        { id: 11, text: 'What country has won the most World Cups?',
          options: ['China', 'Russia', 'Brazil', 'United States'],
        answer: 'Brazil' },
        { id: 12, text: 'Kratos is the main character of what video game series?',
          options: ['The Witcher', 'God of War', 'Dark Souls', 'The Elder Scrolls'],
        answer: 'God of War' },
        { id: 13, text: 'In what country would you find Mount Kilimanjaro?',
          options: ['Tanzania', 'Uganda', 'Nigeria', 'Kenya'],
        answer: 'Tanzania' },
        { id: 14, text: 'Wha famously crossed the Alps with elephants on the way to a war the Romans?',
          options: ['Alexander', 'Napoleon', 'Caesar', 'Hannibal'],
        answer: 'Hannibal' },
        { id: 15, text: 'What Netflix show had the most streaming views in 2021?',
          options: ['Stranger things', 'Squid Game', 'Avengers', 'You'],
        answer: 'Squid Game' },
        { id: 16, text: 'What is the largest Spanish speaking city in the world?',
          options: ['Buenos Aires', 'Mexico City', 'Barcelona', 'Santo Domingo'],
        answer: 'Mexico City' },
        { id: 17, text: 'How many dots appear on a pair of dice?',
          options: ['48', '50', '42', '36'],
        answer: '42' },
        { id: 18, text: 'In what country was Elon Musk born?',
          options: ['Australia', 'United States', 'South Africa', 'Norway'],
        answer: 'South Africa' },
        { id: 19, text: 'How many hearts does an octopus have?',
          options: ['1', '2', '3', '6'],
        answer: '3' },
        { id: 20, text: "On what continent would you find the world's largest desert?",
          options: ['Antarctica', 'Africa', 'Australia', 'Asia'],
        answer: 'Antarctica' },
        { id: 21, text: "Where did sushi originate?",
          options: ['Japan', 'China', 'Korea', 'India'],
        answer: 'China' },
        { id: 22, text: "Who is the world’s highest-paid athlete in 2021?",
          options: ['Conor McGregor', 'Roger Federer', 'Cristiano Ronaldo', 'Lionel Messi'],
        answer: 'Conor McGregor' },
        
  ];

  return (
    <div className='quizbox'>
          <Quizgame que={questionsdata}/>
    </div>
  )
}

export default Quiz;