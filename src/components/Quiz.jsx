import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "./Timer";
import TotalQuestions from "./TotalQuestions";

async function getData() {
    const apiUrl = await fetch("https://opentdb.com/api.php?amount=10&category=19&type=multiple");
    return apiUrl.json();
}

function Quiz() {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(
        JSON.parse(localStorage.getItem("selectedAnswer")) || {}
    );
    const { questionNumber } = useParams();
    const navigate = useNavigate();
    const questionIndex = parseInt(questionNumber);

    useEffect(() => {
        async function fetchData() {
            const quizData = await getData();
            const processedData = quizData.results.map((question) => ({
                ...question,
                answers: shuffleAnswers([
                    ...question.incorrect_answers,
                    question.correct_answer,
                ]),
            }));
            setDataQuiz(processedData);
            localStorage.setItem("dataQuiz", JSON.stringify(processedData));
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
        const selectedValue = dataQuiz[questionIndex].answers[answerIndex];
    
        setSelectedAnswer((prevSelected) => {
          const updatedSelection = {
            ...prevSelected,
            [questionIndex]: selectedValue,
          };
    
          localStorage.setItem("selectedAnswer", JSON.stringify(updatedSelection));
          return updatedSelection;
        });
      };

    const handleNextQuestion = () => {
        if (questionIndex < dataQuiz.length - 1) {
            navigate(`/quiz/${questionIndex + 1}`)
        } else {
            navigate("/results");
        }
    };

    const handlePreviousQuestion = () => {
        if (questionIndex > 0) {
            navigate(`/quiz/${questionIndex - 1}`)
        }
    };

    const handleSubmit = () => {
        navigate("/results");
    }

    const handleTimeUp = () => {
        navigate("/results");
    };

    if (!dataQuiz.length) {
        return <div>Loading....</div>;
    }

    const currentQuestion = dataQuiz[questionIndex];
    const answers = currentQuestion.answers;
    return (
        <div className="flex flex-col items-center h-screen w-full px-[50px]">
            <Timer
                handleTimeUp={handleTimeUp}
            />
            <div className="p-3 w-[500px]">
                <h3 className="font-semibold text-accent text-3xl">Questions {questionIndex + 1} </h3>
                <p className="text-base mt-2 text-accent">
                    {currentQuestion.question}
                </p>
                <div className="grid grid-cols-2 mt-3 gap-3 max-w-[400px]">
                    {answers.map((answer, index) => (
                        <button
                            key={index}
                            className={`flex flex-row gap-3 items-center py-2 px-3
                                        rounded-md cursor-pointer transition-colors duration 200 ${selectedAnswer[questionIndex] === answer
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
                    {questionIndex === dataQuiz.length - 1 ? (
                        <button
                            className="font-semibold text-base bg-blue-700 text-white px-4 py-2 rounded"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            className="font-semibold text-base"
                            onClick={handleNextQuestion}
                        >
                            Next Question
                        </button>
                    )}
                </div>
            </div>
            <TotalQuestions
                    totalQuestions={dataQuiz.length}
                    answeredQuestions={selectedAnswer}
                />
        </div>
    );
}

export default Quiz;