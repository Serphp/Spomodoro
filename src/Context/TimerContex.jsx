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
    const [error, setError] = useState(null);

const [timer, setTimer] = useState(() => {
    const timerInLocalStorage = JSON.parse(localStorage.getItem('timer'));
    return timerInLocalStorage || {
        minutes: initialMinutes,
        seconds: initialSeconds,
        isRunning: false,
        TextSize: TextSizelocal,
        ChangeHour: true,
        MuteSounds : false
    }
    });

const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
    }

    const MuteSounds = () => {
        setTimer((prevState) => {
          return {
            ...prevState,
            MuteSounds: !prevState.MuteSounds,
          };
        });
        localStorage.setItem('timer', JSON.stringify(timer));
    };

    const increaseTextSize = () => {
        setTimer((prevState) => {
          const newTextSize = prevState.TextSize + 10;
          if (newTextSize > 150) {
            return {
              ...prevState,
              TextSize: 150,
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
          if (newTextSize < 80) {
            return {
              ...prevState,
              TextSize: 80,
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
      setTimer((prevState) => {
        // if (prevState.ChangeHour == true) {
        //   return {
        //     ...prevState,
        //     isRunning: false,
        //   };
        // }
        return {
          ...prevState,
          isRunning: !prevState.isRunning,
        };
      });
    };

const toggleTimerX = () => {
  //const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
  //randomSound.play();
  setTimer((prevState) => ({
  ...prevState,
  ChangeHour: !prevState.ChangeHour,
  }));
};

const StartPause = timer.isRunning ? 'Pause' : timer.minutes === 0 && timer.seconds === 0 ? 'Reset' : 'Start';

    const resetTimer = () => {
        setTimer({
          minutes: initialMinutes,
          seconds: initialSeconds,
          isRunning: timer.isRunning,
          TextSize: timer.TextSize,
          ChangeHour: timer.ChangeHour,
          MuteSounds : timer.MuteSounds
        });
    };

    const handleReset = (newMinutes, newSeconds) => {
    setTimer({
      minutes: newMinutes,
      seconds: newSeconds,
      isRunning: timer.isRunning,
      TextSize: timer.TextSize,
      ChangeHour: timer.ChangeHour,
      MuteSounds : timer.MuteSounds
    });
    };

    const handlePersonalizable = (event) => {
      event.preventDefault();
      const newMinutes = event.target.minutes.value ? parseInt(event.target.minutes.value.slice(0, 2)) : 0;
      const newSeconds = event.target.seconds.value ? parseInt(event.target.seconds.value.slice(0, 2)) : 0;
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
        timer, toggleTimer, resetTimer, handleReset, handleTimerChange, handlePersonalizable, StartPause, toggleTimerX,
        increaseTextSize, decreaseTextSize,
        login, 
        videoUrl, setVideoUrl, MuteSounds,
        showPlayer, setShowPlayer,
        playing, setPlaying,
        audioOnly, setAudioOnly,
        playedSeconds, setPlayedSeconds,
        error, setError
         }}>
        {children}
        </TimerContext.Provider>
    );
    };