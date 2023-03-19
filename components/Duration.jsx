import { useState, useEffect } from 'react';

function Duration({ workDuration = 25, breakDuration = 5, longBreakDuration = 15, cyclesBeforeLongBreak = 4 }) {
  const [timerState, setTimerState] = useState({
    timerType: 'work',
    timeRemaining: workDuration * 60,
    cyclesCompleted: 0,
    usingDefault: true,
  });

  function handleDefaultClick() {
    setTimerState({
      timerType: 'work',
      timeRemaining: workDuration * 60,
      cyclesCompleted: 0,
      usingDefault: true,
    });
  }

  function handleShortBreakClick() {
    setTimerState({
      timerType: 'break',
      timeRemaining: breakDuration * 60,
      cyclesCompleted: 0,
      usingDefault: false,
    });
  }

  function handleLongBreakClick() {
    setTimerState({
      timerType: 'break',
      timeRemaining: longBreakDuration * 60,
      cyclesCompleted: 0,
      usingDefault: false,
    });
  }

  useEffect(() => {
    let timer;
    if (timerState.timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimerState((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }));
      }, 1000);
    } else {
      const audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
      audio.play();

      if (timerState.timerType === 'work') {
        if (timerState.cyclesCompleted < cyclesBeforeLongBreak - 1) {
          setTimerState({
            timerType: 'break',
            timeRemaining: breakDuration * 60,
            cyclesCompleted: timerState.cyclesCompleted + 1,
            usingDefault: false,
          });
        } else {
          setTimerState({
            timerType: 'break',
            timeRemaining: longBreakDuration * 60,
            cyclesCompleted: 0,
            usingDefault: false,
          });
        }
      } else {
        setTimerState({
          timerType: 'work',
          timeRemaining: workDuration * 60,
          cyclesCompleted: timerState.cyclesCompleted,
          usingDefault: false,
        });
      }
    }

    return () => clearTimeout(timer);
  }, [timerState, workDuration, breakDuration, longBreakDuration, cyclesBeforeLongBreak]);

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div>
      <div>
        <h2>{timerState.timerType === 'work' ? 'Work' : 'Break'}</h2>
        <p>{formatTime(timerState.timeRemaining)}</p>
      </div>
      <div>
        <button onClick={handleDefaultClick}>Por defecto</button>
        <button onClick={handleShortBreakClick}>Short break</button>
        <button onClick={handleLongBreakClick}>Long break</button>
      </div>
    </div>
  );
}

export default Duration;