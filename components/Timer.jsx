import { useState, useContext } from 'react';
import { TimerContext } from '../src/Context/TimerContex';
import {ResetIcon} from '../src/assets/reset.jsx';

function Contador() {
    const { timer, resetTimer, handleTimerChange, handlePersonalizable } = useContext(TimerContext);
    const [showCode, setShowCode] = useState(false);
    const [ShowConfig, setShowConfig] = useState(false);
    const [TextSize, setTextSize] = useState(0);
    //const [isRunning, setIsRunning] = useState(false);

    let textSize = 0;
    const TextSizeChange = () => {
      const hora = document.getElementsByClassName("hora")[0];
      switch (textSize) {
        case 0:
          hora.style.fontSize = "75px";
          textSize++;
          break;
        case 1:
          hora.style.fontSize = "80px";
          textSize++;
          break;
        case 2:
          hora.style.fontSize = "90px";
          textSize++;
          break;
        default:
          hora.style.fontSize = "100px";
          textSize = 0;
          break;
      }
      console.log(textSize);
    };



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
                <h6> in Proceses... </h6>
                <button className='btnicon' onClick={resetTimer} title='reset'>
                <span className="icon-ipad"> 
                        <ResetIcon/>
                        </span>
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
                        <span className="icon-ipad"> 
                        <ResetIcon/>
                        </span>
                        </button>
            <button className='btnicon' onClick={handleShowCode} title='edit time'> 
            <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3"></path>
            <path d="M9 14.996h3l8.5-8.5a2.121 2.121 0 0 0-3-3l-8.5 8.5v3Z"></path>
            <path d="m16 5 3 3"></path>
            </svg>
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

                    <div className='config'> 
                        <svg width="39" height="30" onClick={handleShowConfig} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.8a1.2 1.2 0 0 0-2.4 0v8.722a2.4 2.4 0 0 0 0 4.156V19.2a1.2 1.2 0 1 0 2.4 0v-1.522a2.4 2.4 0 0 0 0-4.156V4.8Zm7.2 0a1.2 1.2 0 1 0-2.4 0v1.522a2.4 2.4 0 0 0 0 4.156V19.2a1.2 1.2 0 1 0 2.4 0v-8.722a2.4 2.4 0 0 0 0-4.156V4.8Zm6-1.2a1.2 1.2 0 0 1 1.2 1.2v8.722a2.4 2.4 0 0 1 0 4.156V19.2a1.2 1.2 0 1 1-2.4 0v-1.522a2.4 2.4 0 0 1 0-4.156V4.8a1.2 1.2 0 0 1 1.2-1.2Z"></path>
                        </svg>    
                    </div>

                    <h1 className='hora'>{timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</h1>

                    {
                    ShowConfig && (
                        <>
                        <section className='configspace'> 
                            <div className='config__menu'>
                            <span>Tamaño</span>
                                <button className='menu' onClick={TextSizeChange}> 
                                    <svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.3 13.427a1 1 0 0 0-1.25.65 7.14 7.14 0 0 1-6.87 4.92 7.1 7.1 0 0 1-7.18-7 7.1 7.1 0 0 1 7.18-7 7.26 7.26 0 0 1 4.65 1.67l-2.17-.36a1 1 0 0 0-1.137 1.221 1 1 0 0 0 .817.759l4.24.7h.17a1 1 0 0 0 .34-.06.33.33 0 0 0 .1-.06.78.78 0 0 0 .2-.11l.09-.11c0-.05.09-.09.13-.15.04-.06 0-.1.05-.14.028-.059.051-.119.07-.18l.75-4a1.017 1.017 0 1 0-2-.38l-.27 1.45a9.21 9.21 0 0 0-6.03-2.25 9.1 9.1 0 0 0-9.18 9 9.1 9.1 0 0 0 9.18 9 9.12 9.12 0 0 0 8.82-6.32 1 1 0 0 0-.7-1.25Z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className='config__menu'>
                            <span>Sonidos</span>
                                <span className='menu'> OFF </span>
                            </div>
                            <div className='config__menu'>
                            <span>Tareas</span>
                                <span className='menu'> OFF</span>
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