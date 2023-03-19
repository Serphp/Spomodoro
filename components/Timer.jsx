import { useState, useEffect } from 'react';

function Timer({ initialMinutes = 25, initialSeconds = 0, onComplete }) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);


  const sound = new Audio('.'); // Ruta al archivo de sonido

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      } else {
        clearInterval(intervalId);
        onComplete();
        sound.play(); // Reproducir sonido
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes, seconds, onComplete]);

  function handleReset() {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  }

  function handleMinutesChange(e) {
    setMinutes(parseInt(e.target.value));
  }

  function handleSecondsChange(e) {
    setSeconds(parseInt(e.target.value));
  }

  return (
    <div>
      <div>
        <h1> Timer </h1>
        <input type="number" value={minutes} onChange={handleMinutesChange} />:{' '}
        <input type="number" value={seconds} onChange={handleSecondsChange} />
      </div>
      <div>
        {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;