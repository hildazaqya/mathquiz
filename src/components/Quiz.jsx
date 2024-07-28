import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

async function getData() {
    const apiUrl = await fetch("https://opentdb.com/api.php?amount=5&category=19&type=multiple");
    return apiUrl.json();
}

function Quiz() {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const { questionNumber } = useParams();
    const navigate = useNavigate();
    const questionIndex = parseInt(questionNumber);

    useEffect(() => {
        async function fetchData() {
          const quizData = await getData();
          setDataQuiz(
            quizData.results.map((question) => ({
              ...question,
              answers: shuffleAnswers([
                ...question.incorrect_answers,
                question.correct_answer,
              ]),
            }))
          );
        }
        fetchData();
      }, []);

    const shuffleAnswers = (answers) => {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    };

    const handleAnswerClick = (answerIndex) => {
        setSelectedAnswer((prevSelected) => ({
            ...prevSelected,
            [questionIndex]: answerIndex,
        }));
    };

    const handleNextQuestion = () => {
        if (questionIndex < dataQuiz.length - 1) {
            navigate(`/quiz/${questionIndex + 1}`)
        }
    };

    const handlePreviousQuestion = () => {
        if (questionIndex > 0) {
            navigate(`/quiz/${questionIndex - 1}`)
        }
    };

    if (!dataQuiz.length) {
        return <div>Loading....</div>;
    }

    const currentQuestion = dataQuiz[questionIndex];
    const answers = currentQuestion.answers;
    return (
        <div className="flex flex-col items-center h-full w-full mx-[50px]">
            <div className="p-3">
                <h3 className="font-semibold text-accent text-3xl">Questions {questionNumber} </h3>
                <p className="text-base mt-2 text-accent">
                    {currentQuestion.question}
                </p>
                <div className="grid grid-cols-2 mt-3 gap-3">
                    {answers.map((answer, index) => (
                        <button
                            key={index}
                            className={`flex flex-row gap-3 items-center py-2 px-3
                                        rounded-md cursor-pointer transition-colors duration 200 ${selectedAnswer[questionIndex] === index
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                                }`}
                            onClick={() => handleAnswerClick(index)}
                        >
                            <span>{String.fromCharCode(65 + index)}.</span>
                            <span>{answer}</span>
                        </button>
                    ))}
                </div>
                <div className="flex flex-row justify-between mt-5 w-full">
                    <button
                        className="font-semibold text-base"
                        onClick={handlePreviousQuestion}
                        disabled={questionIndex === 0}
                    >
                        Previous Question
                    </button>
                    <button
                        className="font-semibold text-base"
                        onClick={handleNextQuestion}
                        disabled={questionIndex === dataQuiz.length - 1}
                    >
                        Next Question
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Quiz;