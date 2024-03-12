import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import { QUESTIONS } from './questions.js';

const App = () => {
  const [questions] = useState(QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [runCount, setRunCount] = useState(0);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  useEffect(() => {
    if (currentQuestionIndex >= Object.keys(questions).length) {
      const yesAnswers = answers.filter((ans) => ans === 'yes').length;
      const score = (100 * yesAnswers) / Object.keys(questions).length;
      setScore(score);

      updateLocalStorage(score);
    }
  }, [answers, currentQuestionIndex, questions]);

  useEffect(() => {
    loadLocalStorageData();
  }, []); 

  const updateLocalStorage = (newScore) => {
    let storedData = localStorage.getItem('quizData') || '[]';
    storedData = JSON.parse(storedData);

    storedData.push(newScore);
    localStorage.setItem('quizData', JSON.stringify(storedData)); 

    calculateAverage();
    setRunCount(storedData.length);
  };

  const calculateAverage = () => {
    let storedData = localStorage.getItem('quizData') || '[]';
    storedData = JSON.parse(storedData);

    const total = storedData.reduce((sum, val) => sum + val, 0);
    setAverageRating(total / storedData.length);
  };

  const loadLocalStorageData = () => {
    let storedData = localStorage.getItem('quizData') || '[]';
    storedData = JSON.parse(storedData);
    calculateAverage();
    setRunCount(storedData.length);
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0); 
  };

  return (
    <div className="app-container">
      <h1>Programming Skills Quiz</h1>
      {currentQuestionIndex < Object.keys(questions).length ? (
        <Question
          question={questions[currentQuestionIndex + 1]} // Offset index
          onAnswer={handleAnswer}
        />
      ) : (
        <div className="results">
          <h2>Your Score: {score}%</h2>
          <p>Average Score: {averageRating}%</p> 
          <p>Total Runs: {runCount}</p>
          <button onClick={resetQuiz}>Retake Quiz</button>
        </div>
      )}
    </div>
  );
};

export default App;
