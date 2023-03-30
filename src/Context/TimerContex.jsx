    import React, { createContext, useState, useEffect } from 'react';

    export const TimerContext = createContext();

    export const TimerProvider = ({ children, initialMinutes = 25, initialSeconds = 0 }) => {
    const pip = new Audio('https://www.soundjay.com/buttons/beep-07a.mp3'); // Ruta al archivo de sonido
    const pip2 = new Audio('https://www.soundjay.com/buttons/beep-08b.mp3'); // Ruta al archivo de sonido
    const resetaudio = new Audio('https://www.soundjay.com/nature/campfire-1.mp3');
    const sounds = [pip, pip2];
    const [timer, setTimer] = useState({
        minutes: initialMinutes,
        seconds: initialSeconds,
        isRunning: false,
    });

useEffect(() => {
    let intervalId;

    if (timer.isRunning) {
        intervalId = setInterval(() => {
        setTimer((prevState) => {
            const totalSeconds = prevState.minutes * 60 + prevState.seconds;
            if (totalSeconds > 0) {
            return {
                ...prevState,
                minutes: Math.floor((totalSeconds - 1) / 60),
                seconds: (totalSeconds - 1) % 60,
            };
            } else {
            clearInterval(intervalId);
            return {
                ...prevState,
                isRunning: false,
            };
            }
        });
        }, 1000);
    }

    return () => clearInterval(intervalId);
    }, [timer.isRunning]);

    
const toggleTimer = () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.play();
    setTimer((prevState) => ({
    ...prevState,
    isRunning: !prevState.isRunning,
    }));
};
    

    const StartPause = timer.isRunning ? 'Pause' : timer.minutes === 0 && timer.seconds === 0 ? 'Reset' : 'Start';

    const resetTimer = () => {
        resetaudio.play();
        setTimer({
        minutes: initialMinutes,
        seconds: initialSeconds,
        isRunning: false,
        });
    };

const handleReset = (newMinutes, newSeconds) => {
    setTimer({
        minutes: newMinutes,
        seconds: newSeconds,
        isRunning: false,
    });
    };

const handlePersonalizable = (event) => {
    event.preventDefault();
    const newMinutes = parseInt(event.target.minutes.value);
    const newSeconds = parseInt(event.target.seconds.value);
    handleReset(newMinutes, newSeconds);
    };

const handleTimerChange = (event) => {
    event.preventDefault();
    const timerType = event.target.value;

    switch (timerType) {
        case 'shortBreak':
        handleReset(5, 0);
        break;
        case 'longBreak':
        handleReset(15, 0);
        break;
        default:
        handleReset(25, 0);
        break;
    }
};
    
    return (
        <TimerContext.Provider value={{ timer, toggleTimer, resetTimer, handleReset, handleTimerChange, handlePersonalizable, StartPause }}>
        {children}
        </TimerContext.Provider>
    );
    };