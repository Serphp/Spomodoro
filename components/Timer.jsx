import { useState, useEffect } from 'react';

function Contador({ initialMinutes = 25, initialSeconds = 0, onComplete }) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('Por defecto');
    const [selectedSound, setSelectedSound] = useState(null);

    const soundOptions = [
        { label: "Sound 1", value: "https://www.soundjay.com/nature/campfire-1.mp3" },
        { label: "Sound 2", value: "sound2.mp3" },
        { label: "Sound 3", value: "sound3.mp3" }
    ];
    
    const sound = new Audio('https://www.soundjay.com/nature/campfire-1.mp3'); // Ruta al archivo de sonido

    useEffect(() => {
        let intervalId;

        if (isRunning) {
        intervalId = setInterval(() => {
            if (seconds > 0) {
            setSeconds(seconds - 1);
            } else if (minutes > 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
            } else {
            clearInterval(intervalId);
            setIsRunning(false);
            onComplete();
            }
        }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [minutes, seconds, isRunning, onComplete, sound, selectedSound]);

    function handleReset() {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    }

    function handleStartPause() {
        setIsRunning(!isRunning);
        //reproducir o pausar el sonido

    
    }

    function handleMinutesChange(e) {
        setMinutes(parseInt(e.target.value));
    }

    function handleSecondsChange(e) {
        setSeconds(parseInt(e.target.value));
    }

    function handleModeChange(mode) {
        setMode(mode);
        switch (mode) {
        case 'Por defecto':
            setMinutes(25);
            setSeconds(0);
            break;
        case 'Short break':
            setMinutes(5);
            setSeconds(0);
            break;
        case 'Long break':
            setMinutes(15);
            setSeconds(0);
            break;
        }
    }

    const buttonText = isRunning ? 'Pause' : minutes === 0 && seconds === 0 ? 'Reset' : 'Start';

    return (
        <div className=' container-md caret-red-700'>
        <h1 className='text-3xl'>{mode}</h1>
        <div>
        <button className='button' onClick={() => handleModeChange('Por defecto')}>Por defecto2</button>
        <button className='button' onClick={() => handleModeChange('Short break')}>Short break</button>
        <button className='button' onClick={() => handleModeChange('Long break')}>Long break</button>

        </div>
        <h2>
            {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
        </h2>
        <button className='button' onClick={handleStartPause}>{buttonText}</button>

        {minutes === 0 && seconds === 0 && <audio autoPlay><source src="https://www.soundjay.com/nature/campfire-1.mp3" type="audio/mpeg" /></audio>}
        <button className='button' onClick={handleReset}>Reset</button>
        <div>
        
        <input type="number" value={minutes} onChange={handleMinutesChange} />:{' '}
        <input type="number" value={seconds} onChange={handleSecondsChange} />

        <label htmlFor="sound">Select sound:</label>
        <select id="sound" onChange={(e) => {
        setSelectedSound(e.target.value);
        onSoundChange(e.target.value);
        }}>
        {soundOptions.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </select>
    </div>
    </div>

    );
    }

export default Contador;