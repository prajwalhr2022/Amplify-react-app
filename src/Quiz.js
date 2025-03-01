import React, { useState } from "react";
import quizData from "./quizData";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    const correct = option === quizData[currentQuestion].answer;
    setIsCorrect(correct);

    if (correct) setScore(score + 1);

    // Wait 1 second before moving to next question
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Your Score: {score} / {quizData.length}</h2>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2>{quizData[currentQuestion].question}</h2>
          <div className="options">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`option-button ${selectedOption === option ? (isCorrect ? "correct" : "wrong") : ""}`}
                disabled={selectedOption !== null} // Disable after selection
              >
                {option}
              </button>
            ))}
          </div>
          {selectedOption !== null && (
            <p className={isCorrect ? "correct-text" : "wrong-text"}>
              {isCorrect ? "Correct!" : "Wrong!"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
