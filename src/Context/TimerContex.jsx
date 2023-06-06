    import React, { createContext, useState, useEffect } from 'react';
    import { auth } from "../firebase"

    export const TimerContext = createContext();

    export const TimerProvider = ({ children, initialMinutes = 25, initialSeconds = 0, TextSizelocal = 80}) => {
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

    //Config Component
    const [showCode, setShowCode] = useState(false);
    const [ShowConfig, setShowConfig] = useState(false);

    //Idle
    const [error, setError] = useState(null);

    //LocalStorage
    const [timer, setTimer] = useState(() => {
      const timerInLocalStorage = JSON.parse(localStorage.getItem('timer'));
      return timerInLocalStorage || {
          minutes: initialMinutes,
          seconds: initialSeconds,
          isRunning: false,
          TextSize: TextSizelocal,
          ChangeHour: true,
          HideTask: false,
          MuteSounds : false,
          //Update 1.2.5
          TecStatus: false,
    }
    });

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
        }

    const HandleHideTask = () => {
      setTimer((prevState) => ({
        ...prevState,
        HideTask: !prevState.HideTask,
        }));
      };

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
          if (newTextSize > 130) {
            return {
              ...prevState,
              TextSize: 130,
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

    const toggleTimer = () => {
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      randomSound.play();
      setTimer((prevState) => {
        return {
          ...prevState,
          isRunning: !prevState.isRunning,
        };
      });
    };

const toggleTimerX = () => {
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
          HideTask: timer.HideTask,
          MuteSounds : timer.MuteSounds,
          TecStatus: timer.TecStatus
        });
    };

    const handleReset = (newMinutes, newSeconds) => {
    setTimer({
      minutes: newMinutes,
      seconds: newSeconds,
      isRunning: timer.isRunning,
      TextSize: timer.TextSize,
      ChangeHour: timer.ChangeHour,
      HideTask: timer.HideTask,
      MuteSounds : timer.MuteSounds,
      TecStatus: timer.TecStatus
    });
    };

    const handlePersonalizable = (event) => {
      event.preventDefault();
      const newMinutes = event.target.minutes.value ? parseInt(event.target.minutes.value.slice(0, 2)) : 0;
      const newSeconds = event.target.seconds.value ? parseInt(event.target.seconds.value.slice(0, 2)) : 0;
      handleReset(newMinutes, newSeconds);
    };

    const TecOn = () => {
      setTimer((prevState) => ({
        ...prevState,
        TecStatus: true,
        }));
    };

    const TecOff = () => {
        // setTimer({ TecStatus: false });
        setTimer((prevState) => ({
          ...prevState,
          TecStatus: false,
          }));
    };

    console.log(timer.TecStatus);

    const handleTimerChange = (event) => {
        event.preventDefault();
        const timerType = event.target.value;
        //setMode(mode);
        switch (timerType) {        
            case 'shortBreak':
            handleReset(5, 0);
            //TecOff();
            break;
            case 'longBreak':
            handleReset(15, 0);
            //TecOff();
            break;
            default:
            handleReset(25, 0);
            //TecOff();
            break;
        }
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
          }} else {
          clearInterval(intervalId);
          console.log('end');
          const endSound = new Audio('https://www.soundjay.com/phone/telephone-ring-03a.mp3');
          endSound.play();
          TecOn();
          if (timer.TecStatus === true) {
            TecOff();
            pip.play();
            return {
              ...prevState,
              TecStatus: false,
              isRunning: false,
              minutes: 25,
              seconds: 0,
            };
          }
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
        error, setError,
        HandleHideTask,
        TecOn, TecOff,
        showCode, setShowCode,
        ShowConfig, setShowConfig,
         }}>
        {children}
        </TimerContext.Provider>
    );
    };