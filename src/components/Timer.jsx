import React, { useState } from "react";

const Timer = () => 
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    
    const deadline = "00, 00, 00"
    
    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();
    
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / (1000 * 60 * 60)) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };


    useEffect(() => {
        const interval = setInterval(() => 
            getTime(deadline), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer" role="timer">
            box
        </div>
    )    
}