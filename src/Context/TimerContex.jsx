    import React, { createContext, useState, useEffect } from 'react';
    import { auth } from "../firebase"

    export const TimerContext = createContext();

    export const TimerProvider = ({ children, initialMinutes = 25, initialSeconds = 0, TextSizelocal = 80 }) => {
    const pip = new Audio('https://www.soundjay.com/buttons/beep-07a.mp3'); // Ruta al archivo de sonido
    const pip2 = new Audio('https://www.soundjay.com/buttons/beep-08b.mp3'); // Ruta al archivo de sonido
    //const resetaudio = new Audio('https://www.soundjay.com/nature/campfire-1.mp3');
    const sounds = [pip, pip2];

    //Music Page
    const [videoUrl, setVideoUrl] = useState('');
    const [showPlayer, setShowPlayer] = useState(false);
    const [playing, setPlaying] = useState(true);
    const [audioOnly, setAudioOnly] = useState(false);
    const [playedSeconds, setPlayedSeconds] = useState(0);

const [timer, setTimer] = useState(() => {
    const timerInLocalStorage = JSON.parse(localStorage.getItem('timer'));
    return timerInLocalStorage || {
        minutes: initialMinutes,
        seconds: initialSeconds,
        isRunning: false,
        TextSize: TextSizelocal,
    }
    });

const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
    }

    const increaseTextSize = () => {
        setTimer((prevState) => {
          const newTextSize = prevState.TextSize + 10;
          if (newTextSize > 200) {
            return {
              ...prevState,
              TextSize: 200,
            };
          } else {
            return {
              ...prevState,
              TextSize: newTextSize,
            };
          }
        });
        localStorage.setItem('timer', JSON.stringify(timer));
    };

    const decreaseTextSize = () => {
        setTimer((prevState) => {
          const newTextSize = prevState.TextSize - 10;
          if (newTextSize < 100) {
            return {
              ...prevState,
              TextSize: 100,
            };
          } else {
            return {
              ...prevState,
              TextSize: newTextSize,
            };
          }
        });
        localStorage.setItem('timer', JSON.stringify(timer));
    };
    


useEffect(() => {
    const timerString = JSON.stringify(timer);
    localStorage.setItem('timer', timerString);
}, [timer]);

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
            const endSound = new Audio('https://www.soundjay.com/phone/telephone-ring-03a.mp3');
            endSound.play();
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
        //resetaudio.play();
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
        const newMinutes = event.target.minutes.value ? parseInt(event.target.minutes.value) : 0;
        const newSeconds = event.target.seconds.value ? parseInt(event.target.seconds.value) : 0;
        handleReset(newMinutes, newSeconds);
        };

    const handleTimerChange = (event) => {
        event.preventDefault();
        const timerType = event.target.value;
        //setMode(mode);
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
        <TimerContext.Provider value={{ 
        timer, toggleTimer, resetTimer, handleReset, handleTimerChange, handlePersonalizable, StartPause, 
        increaseTextSize, decreaseTextSize,
        login, 
        videoUrl, setVideoUrl, 
        showPlayer, setShowPlayer,
        playing, setPlaying,
        audioOnly, setAudioOnly,
        playedSeconds, setPlayedSeconds

         }}>
        {children}
        </TimerContext.Provider>
    );
    };