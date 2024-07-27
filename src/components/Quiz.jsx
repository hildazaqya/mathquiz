import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

async function getData() {
    const apiUrl = await fetch("https://opentdb.com/api.php?amount=5&category=19&type=multiple");
    return apiUrl.json();
}

function Quiz() {
    const [dataQuiz, setDataQuiz] = useState([]);
    const { questionNumber } = useParams();
    const navigate = useNavigate();
    const questionIndex = parseInt(questionNumber);

    useEffect(() => {
        async function fetchData() {
            const quizData = await getData();
            setDataQuiz(quizData.results);
        } fetchData();
    }, []);

    const handleNextQuestion = () => {
        if (questionIndex < dataQuiz.length - 1) {
            navigate(`/quiz/${questionIndex + 2}`)
        }
    };

    const handlePreviousQuestion = () => {
        if (questionIndex > 0) {
            navigate(`/quiz/${questionIndex}`)
        }
    };

    if (!dataQuiz.length) {
        return <div>Loading....</div>;
    }

    const currentQuestion = dataQuiz[questionIndex];

    return (
        <div className="flex flex-row items-center h-screen mx-[50px]">
            <h3 className="font-semibold text-accent text-3xl">Questions {questionNumber} </h3>
            <p className="text-base mt-2 text-accent">
                {currentQuestion.question}
            </p>
            <div className="grid grid-cols-2 mt-3 gap-3">
                {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).sort().map((answer, index) => (
                    <div key={i} className="flex flex-row gap-3 items-center">
                        <div className="bg-primary py-2 px-3 rounded-md">{String.fromCharCode(65 + index)}</div>
                        <p className="text-base">{answer}</p>
                    </div>
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
    );
}

export default Quiz;