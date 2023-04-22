import { useState, useContext } from 'react';
import { TimerContext } from '../src/Context/TimerContex';
import {ResetIcon} from '../src/assets/reset.jsx';
import { UpIcon } from '../src/assets/up';
import { DownIcon } from '../src/assets/down';
import { EditIcon } from '../src/assets/edit';
import { ConfigIcon } from '../src/assets/config';
import { PauseIcon } from '../src/assets/pause';

function Contador() {
    const { timer, resetTimer, handleTimerChange, 
        handlePersonalizable, increaseTextSize, decreaseTextSize, toggleTimerX, toggleTimer, error } = useContext(TimerContext);
    const [showCode, setShowCode] = useState(false);
    const [ShowConfig, setShowConfig] = useState(false);
    const [PositionHour, setPositionHour] = useState(false);

    //const [isRunning, setIsRunning] = useState(false);

    const handleShowCode = () => {
        setShowCode(!showCode);
    };

    const handleShowConfig = () => {
        setShowConfig(!ShowConfig);
    };

    return (  
    <div className=''>
    <section className="probootstrap-cover probootstrap-scene-0">
    <div className="container">
        <div className="row probootstrap-vh-75 align-items-center text-sm-center text-center">
        <div className="col-md-7 order-md-2">

            <div for="dark-mode">
                {timer.isRunning ? <>
                <h2 className='titulo'>Active</h2>
                <h6> ... </h6>
                <button className='btnicon' onClick={resetTimer} title='reset'>
                <div className="iconop"> 
                    <ResetIcon/>
                </div>
                </button>
                <button className='btnicon' onClick={toggleTimer} title='reset'>
                <div className="iconop"> 
                    <PauseIcon/>
                </div>
                </button>


                {/* <br/>
                <button className='btnicon' onClick={handlesound} title='sound' />
                         */}
                </> : 
                <>
                <h2 className='titulo'>Inactive</h2>
                </>}
            </div>


            <div className='box2' style={{ display: timer.isRunning ? 'none' : 'block' }}>
            <button className='btnselect' onClick={handleTimerChange} value="default" >Por defecto</button>
            <button className='btnselect' onClick={handleTimerChange} value="shortBreak" >Short break</button>
            <button className='btnselect' onClick={handleTimerChange} value="longBreak">Long break</button>

            <button onClick={resetTimer} className="btnicon" title='reset'>
            <div className="iconop"> 
            <ResetIcon/>
            </div>
            </button>
            <button className='btnicon' onClick={handleShowCode} title='edit time'> 
            <div className="iconop">
            <EditIcon/>
            </div>
            </button>

            <button className='btnicon' onClick={handleShowConfig} title='increase font size'>
            <div className="iconop">
            <ConfigIcon/>
            </div>
            </button>

            
            
            {showCode && (
            <section className='pre'> 
                    <form onSubmit={handlePersonalizable}>
                        <div className='row mt-5'>
                            <div class="form-group col-md-6 flex">
                                    <div for="minutes">Minutes</div>
                                    <input type="number" class="form-control" name="minutes" placeholder='0'  />
                                    </div>
                                <div class="form-group col-md-6">
                                <div for="seconds">Seconds</div>
                            <input type="number" class="form-control" name="seconds" placeholder='0'  />
                            </div>
                            <div class="center">
                            <button className='btn btn-primary btn-outline-white' type="submit"> New valor </button>
                            </div>
                        </div>
                    </form>
            </section>
    )}
            </div>
            </div>
        <div className="col-md-5">
            <div className="mb-5 probootstrap-stagger ">

                <div className='box1' style={{ display: timer.isRunning ? 'none' : 'block' }}>
                    {/* Hidden */}

                    {
                        timer.ChangeHour && (
                            <div className='box3'>
                                <h1 className='hora' style={{ fontSize: `${timer.TextSize}px` }}>
                                    {timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
                                </h1>
                            </div>
                        )
                    }

                    {/* <h1 className='hora' style={{ fontSize: `${timer.TextSize}px` }}>
                        {timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
                    </h1> */}

                    {
                    ShowConfig && (
                        <>
                        <section className='configspace'> 
                            <div className='config__menu'>
                            <span>Tamaño</span>

                                <div className='cardmenu'>
                                    <button className='menu' onClick={increaseTextSize}> 
                                        <UpIcon/>
                                    </button>

                                    <button className='menu' onClick={decreaseTextSize}>
                                        <DownIcon/>
                                    </button>
                                </div>
                            </div>
                            <div className='config__menu'>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <span>Zoom</span>
                                <span className='menu' onClick={toggleTimerX}> 
                                {timer.ChangeHour ? 'Top' : 'Normal'}
                                </span>
                            </div>
                            <div className='config__menu'>
                            <span>Sonidos</span>
                                <span className='menu'> OFF</span>
                            </div>
                            <div className='config__menu'>
                            <span>Hora</span>
                                <span className='menu'> 
                                {
                                    timer.minutes === 0 && timer.seconds === 0 ? 'OFF' : 'ON'
                                }
                                </span>
                            </div>
                            </section>
                        </>
                    )
                }
                </div>
            </div>
            </div> 
        </div>
    </div>
    </section>

    </div>


    );
    }

export default Contador;