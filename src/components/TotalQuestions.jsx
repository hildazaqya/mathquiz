import React from 'react';
import { Link } from 'react-router-dom';

function TotalQuestions({totalQuestions, answeredQuestions}) {
    return (
        <div className='w-full flex flex-col justify-start gap-y-2 mt-6'>
            <div className='flex flex-row gap-2 items-center'>
                {Array.from({ length: totalQuestions }, (_, index) => (
                    <Link
                    key={index}
                    to={`/quiz/${index}`}
                    className={`p-3 w-1/3 text-center text-base text-neutral gap-1 font-bold rounded-lg
                    ${answeredQuestions[index] !== undefined
                        ? "bg-success"
                        : "bg-secondary"
                    }`}>
                        {index + 1}
                    </Link>
                ))}
            </div>
            <div className='flex flex-row items-center gap-2 text-sm'>
                <span className='bg-success p-2 text-neutral flex flex-row gap-1 font-bold rounded-full'>
                </span>
                Soal sudah terjawab
            </div>
            <div className='flex flex-row items-center gap-2 text-sm'>
                <span className='bg-secondary p-2 text-neutral flex flex-row gap-1 font-bold rounded-full'>
                </span>
                Soal belum terjawab
            </div>
        </div>
    )
}

export default TotalQuestions;