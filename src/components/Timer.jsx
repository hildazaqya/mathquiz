import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
   const timerRef = useRef(null);
   const [timer, setTimer] = useState("00:00:00");

   const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total/1000) % 60);
    const minutes = Math.floor((total/1000/60) % 60);
    const hours = Math.floor((total/1000/60/60) % 24); 
    return {
        total, hours, minutes, seconds
    };
   };

   const startTimer = (endTime) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0 ) {
        setTimer (
            (hours > 9 ? hours : "0" + hours) + ":" +
            (minutes > 9 ? minutes : "0" + minutes) + ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
    } else {
        if (timerRef.current) clearInterval(timerRef.current);
        handleTimeUp();
    }
   };

   const clearTime = (endTime) => {
    setTimer("00:10:00");

    if (timerRef.current) clearInterval(timerRef.current);
    const id = setInterval(() => {
        startTimer(endTime);
    }, 1000);
    timerRef.current = id;
   };

   const getDeadTime = () => {
    let deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 10);
    return deadline;
   };

   useEffect(() => {
    clearTime(getDeadTime());
    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };
   }, []);
    return (
        <div className="w-full flex justify-end">
            <div className="timer bg-[#4A4A4A] p-3 text-base text-neutral flex flex-row gap-1 font-bold rounded-lg mt-[20px]" role="timer">
                <div className="Hours">{timer.split(':')[0]} . </div>
                <div className="Minutes">{timer.split(':')[1]} . </div>
                <div className="Seconds">{timer.split(':')[2]} </div>
            </div>
        </div>
    )
}

export default Timer;