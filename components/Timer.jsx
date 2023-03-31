import { useState, useContext } from 'react';
import { TimerContext } from '../src/Context/TimerContex';

function Contador() {
    const { timer, toggleTimer, StartPause, resetTimer, handleTimerChange, handlePersonalizable } = useContext(TimerContext);
    const [showCode, setShowCode] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const sound = new Audio('https://www.soundjay.com/nature/campfire-1.mp3'); // Ruta al archivo de sonido
    const sound2 = new Audio('https://www.soundjay.com/buttons/button-20.mp3'); // Ruta al archivo de sonido

    const handleShowCode = () => {
        setShowCode(!showCode);
    };

    return (  
    <div className=''>
    <section className="probootstrap-cover probootstrap-scene-0">
    <div className="container">
        <div className="row probootstrap-vh-75 align-items-center text-md-left text-sm-center text-center">
        <div className="col-md-6 order-md-2 order-1">

            <div for="dark-mode">
            <h2 className='titulo'>
                {timer.isRunning ? 'Active' : 'Inactive'}
            </h2>   
            </div>


            <div className='box2' style={{ display: timer.isRunning ? 'none' : 'block' }}>
            <button className='btnselect' onClick={handleTimerChange} value="default" >Por defecto</button>
            <button className='btnselect' onClick={handleTimerChange} value="shortBreak" >Short break</button>
            <button className='btnselect' onClick={handleTimerChange} value="longBreak">Long break</button>
            <button className='btnselect' onClick={handleShowCode}> Personalizar </button>
            
            {showCode && (
            <section className='pre'> 
                    <form onSubmit={handlePersonalizable}>
                        <div className='row mt-5'>
                            <div class="form-group col-md-6">
                                    <div for="minutes">Minutes</div>
                                    <input type="number" class="form-control" name="minutes" />
                                    </div>
                                <div class="form-group col-md-6">
                                <div for="seconds">Seconds</div>
                            <input type="number" class="form-control" name="seconds"/>
                            </div>
                        <button className='btn btn-primary btn-outline-white mt-3 mb-5' type="submit">Nuevo valor</button>
                        </div>
                    </form>
            </section>
    )}
            </div>
            </div>
        <div className="col-md-5 order-md-1 order-2">
            <div className="probootstrap-text">

            <p className="mb-5 probootstrap-stagger lead">
            <div className='box1' style={{ display: timer.isRunning ? 'none' : 'block' }}>
            <h1 className='titulo'>{timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</h1>
            </div>
            </p>
                <p className="probootstrap-stagger box2">
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