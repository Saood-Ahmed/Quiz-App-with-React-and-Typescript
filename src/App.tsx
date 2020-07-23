import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuiz, Difficulty, QusetionState } from './Api';
import './App.css';

export type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer: string;
}

const Total_Questions = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QusetionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
 
  const [results, setResults] = useState(false);
  // console.log(fetchQuiz(Total_Questions, Difficulty.EASY))

  const startQuiz = async () => {
    setPlayAgain(true);
    setLoading(true);
    setGameOver(false);

    const getQuiz = await fetchQuiz(Total_Questions, Difficulty.EASY);

    setQuestions(getQuiz);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    setResults(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    // e.preventDefault();
    // const answer1 = e.currentTarget.value;
    // console.log(answer1)
    if(!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if(correct) {
        console.log(answer)
        e.currentTarget.classList.add("correct");
        setScore(prev => prev + 1);
      } else{
        e.currentTarget.classList.add("wrong");
      }
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      setUserAnswers(prev => [...prev, AnswerObject])
    }
    else {
      setGameOver(true)
    }

  }

  const nextQuestion = () => {
    
    const nextQuestion = number + 1;

    if(nextQuestion === Total_Questions) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }

  }

  //SHOW RESULTS METHOD
  const showResults = () => {
    setResults(true);
  }

  return (
    <div className="App container center">
      <h3>QUIZ APP</h3>
      { gameOver || userAnswers.length === Total_Questions ? (<button className="start" onClick={ startQuiz }>
        Start
      </button>) : null}
  {!gameOver ? (<h2 className="score">Score: {score}</h2>) : null}
      {loading && <p>Loading...</p> }
      {!loading && !gameOver && (
      <QuestionCard 
        questionNumber = {number + 1}
        totalQuestions = {Total_Questions}
        question = {questions[number].question}
        answers = {questions[number].answer}
        userAnswer = {userAnswers ? userAnswers[number] : undefined}
        callBack = {checkAnswer}
      />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== Total_Questions - 1 ? (
      <button className="next u-full-width button-primary" onClick={ nextQuestion }>
       <h5> Next</h5>
      </button>) : null }
       {/*Show Results  */}
        {!loading && userAnswers.length === Total_Questions? (
         <button className="u-full-width button-success" onClick={ showResults }>
           Show Results
       </button>) : null}
       {results ? (
         <div className="container">
         {userAnswers.map((res: AnswerObject) => (
             <div className="container" key={res.question}>
                 <h4>Question: {res.question}</h4>
                 <h4 style={{color: 'green'}}>Correct Answer: {res.correctAnswer}</h4>
             </div>
         ))}
     </div>
       ) : null}
       {userAnswers.length === Total_Questions ? (<button className="u-full-width button-primary" onClick={ startQuiz }>
        <h5>PlayAgain</h5>
      </button>) : null}
    </div>
  );
}

export default App;
