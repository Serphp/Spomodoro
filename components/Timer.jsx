import { useState, useEffect } from 'react';
import Work from './Main/Reloj/Work';

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
    const sound2 = new Audio('https://www.soundjay.com/buttons/button-20.mp3'); // Ruta al archivo de sonido
    const pip = new Audio('https://www.soundjay.com/buttons/beep-07a.mp3'); // Ruta al archivo de sonido
    const pip2 = new Audio('https://www.soundjay.com/buttons/beep-08b.mp3'); // Ruta al archivo de sonido

    //diccionario de sonidos para elegir uno aleatorio
    const sounds = [pip, pip2];
    const reset = [sound, sound2];

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
        //play random sound reset
        const randomSound = reset[Math.floor(Math.random() * reset.length)];
        randomSound.play();
    }

    function handleStartPause() {
        setIsRunning(!isRunning);
        //play random sound pip and pip2
        if (!isRunning) {
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            randomSound.play();
        }
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
    // ESTRUCTURA DEBAJO
    return (

        
        <div className='boxcontainer box'>
        <h1 className='text-3xl'>{mode}</h1>
        <div className='' style={{ display: isRunning ? 'none' : 'block' }}>
        <button className='button' onClick={() => handleModeChange('Por defecto')}>Por defecto</button>
        <button className='button' onClick={() => handleModeChange('Short break')}>Short break</button>
        <button className='button' onClick={() => handleModeChange('Long break')}>Long break</button>
        </div>
        
        <h2 className='titulo'>
            {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
        </h2>

        <div className=' buttons'>
        <button className='button' onClick={handleStartPause}>{buttonText}</button>
        {minutes === 0 && seconds === 0 && <audio autoPlay><source src="https://www.soundjay.com/nature/campfire-1.mp3" type="audio/mpeg" /></audio>}
        <button className='button' onClick={handleReset}>Reset</button>
        </div> 
        <div>
        
        {/* <input type="number" value={minutes} onChange={handleMinutesChange} />:{' '}
        <input type="number" value={seconds} onChange={handleSecondsChange} /> */}

    </div>
    </div>

    );
    }

export default Contador;