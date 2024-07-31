import React from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const selectedAnswer = JSON.parse(localStorage.getItem("selectedAnswer")) || {};
  const dataQuiz = JSON.parse(localStorage.getItem("dataQuiz")) || [];

  const correctAnswers = dataQuiz.filter((question, index) => {
    const userAnswer = selectedAnswer[index];
    if (!userAnswer || !question.answers) {
      return false;
    }
  
    const isCorrect = question.correct_answer === userAnswer;
    console.log(`Question ${index + 1}: Correct: ${question.correct_answer}, User: ${userAnswer}, Correct: ${isCorrect}`); // Debug
    return isCorrect;
  }).length;
  
  const totalQuestions = dataQuiz.length;
  const wrongAnswers = totalQuestions - correctAnswers;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full px-[50px]">
      <h2 className="font-semibold text-accent text-2xl">Your Score Is:</h2>
      <h2 className="font-semibold text-accent text-3xl">{correctAnswers * 10}</h2>
      <p className="text-lg text-green-600 mt-3">Correct Answers: {correctAnswers}</p>
      <p className="text-lg mt-2 text-red-600">Wrong Answers: {wrongAnswers}</p>
      <p className="text-lg mt-2 text-accent">Number of Questions Answered: {totalQuestions}</p>
      <button
        className="mt-5 px-4 py-2 bg-success text-white rounded"
        onClick={() => {
          localStorage.clear();
          navigate("/quiz/0");
        }}
      >
        Retake Quiz
      </button>
    </div>
  );
}

export default Results;
