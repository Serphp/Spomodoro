import { useState, useEffect, useContext } from 'react';
import { TimerContext } from '../src/Context/TimerContex';

function Contador({ initialMinutes = 25, initialSeconds = 0, onComplete }) {
    const { timer, toggleTimer, StartPause, resetTimer, handleTimerChange, handlePersonalizable } = useContext(TimerContext);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('Por defecto');

    const sound = new Audio('https://www.soundjay.com/nature/campfire-1.mp3'); // Ruta al archivo de sonido
    const sound2 = new Audio('https://www.soundjay.com/buttons/button-20.mp3'); // Ruta al archivo de sonido


    //diccionario de sonidos para elegir uno aleatorio

    const reset = [sound, sound2];

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

        
    <div className=''>


    <section className="probootstrap-cover probootstrap-scene-0">
    <div className="container">
        <div className="row probootstrap-vh-75 align-items-center text-md-left text-sm-center text-center">
        <div className="col-md-6 order-md-2 order-1">
        <h1 className='text-3xl box2'>{mode}</h1>
            <div className='boxcontainer'>
                <h2 className='titulo'>
                {timer.isRunning ? 'Active' : 'Inactive'}
                </h2>    
            </div>
            <div className='box2' style={{ display: isRunning ? 'none' : 'block' }}>
            <button className='btnselect' onClick={handleTimerChange} value="default" >Por defecto</button>
            <button className='btnselect' onClick={handleTimerChange} value="shortBreak" >Short break</button>
            <button className='btnselect' onClick={handleTimerChange} value="longBreak">Long break</button>
            </div>

            <form onSubmit={handlePersonalizable}>
        <input type="number" name="minutes" placeholder="Minutes" />
        <input type="number" name="seconds" placeholder="Seconds" />
        <button type="submit">Personalizable</button>
      </form>
        </div>
        <div className="col-md-6 order-md-1 order-2">
            <div className="probootstrap-text">
            <h1 className="probootstrap-heading probootstrap-stagger text-white mb-2">Timer </h1>
            <p className="mb-5 probootstrap-stagger lead">
            <span className="probootstrap-animate">Timer</span>
            </p>
                <p className="probootstrap-stagger">
                    <button onClick={resetTimer} className="btn btn-primary mr-2 mb-2">
                        <span className="icon-ipad"></span> Reset</button>
                <button className='btn btn-primary btn-outline-white mb-2' onClick={() => toggleTimer()}>{StartPause}</button>
                </p>
            </div>
        </div>
        
        </div>
    </div>
    </section>

    </div>


    );
    }

export default Contador;