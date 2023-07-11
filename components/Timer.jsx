import { useState, useContext } from 'react';
import { TimerContext } from '../src/Context/TimerContex';
import {ResetIcon} from '../src/assets/reset.jsx';
import { UpIcon } from '../src/assets/up';
import { DownIcon } from '../src/assets/down';
import { EditIcon } from '../src/assets/edit';
import { ConfigIcon } from '../src/assets/config';
import { PauseIcon } from '../src/assets/pause';
import { Pending } from './Pending';
import { AuthContext } from '../src/Context/AuthContext';

function Contador() {
    const { currentUser } = useContext(AuthContext);
    const { timer, resetTimer, 
            handleTimerChange, 
            handlePersonalizable,
            increaseTextSize, 
            decreaseTextSize, 
            toggleTimerX, 
            //TecStatus,
            //toggleTimer, 
            showCode,
            ShowConfig,
            error,
            HandleHideTask } = useContext(TimerContext);

    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        return storedTasks || [];
      });

    const titleStatus = timer.TecStatus ? 'Break time' : 'Inactive';

    return (  
    <div className=''>
    <section className="probootstrap-cover probootstrap-scene-0">
    <div className="container">
        <div className="row probootstrap-vh-75 align-items-center text-sm-center text-center">
        <div className="col-md-7 order-md-2">

            <div for="dark-mode">
                { timer.seconds === 0 && timer.minutes === 0 && timer.TecStatus === true ? 
                <>
                    <h2 className='titulo'> Break time </h2>
                    <div className='box3'>
                    <button className='btnselect' onClick={handleTimerChange} value="shortBreak" >Short break</button>
                    <button className='btnselect' onClick={handleTimerChange} value="longBreak">Long break</button>
                    </div>
                </> :
                timer.isRunning ? <>
                <h2 className='titulo'>Active</h2>
                <h6> 
                {
                    currentUser && tasks.length > 0 ? 
                    <p>
                        {/* {tasks.length} Tareas pendientes 
                        <br/> */}
                        {tasks.filter(task => task.completed).length}
                        Tareas completadas
                    </p> 
                : null
                }
                </h6>
                {/* <button className='btnicon' onClick={resetTimer} title='Reset'>
                <div className="iconop"> 
                    <ResetIcon/>
                </div>
                </button>
                <button className='btnicon' onClick={toggleTimer} title='Pause'>
                <div className="iconop"> 
                    <PauseIcon/>
                </div>
                </button> */}
                </> : 
          
                <h2 className='titulo'>{titleStatus}</h2>

                }
            </div>


            <div className='box3' style={{ display: timer.isRunning ? 'none' : 'block' }}>

                {
                !timer.TecStatus && (
                    <>
                {
                        timer.seconds === 0 && timer.minutes === 25 ? null : 
                            (
                                <>
                                    <button className='btnselect' onClick={handleTimerChange} value="default" >Normal</button>
                                </>
                            )
                }

                {
                            timer.seconds === 0 && timer.minutes === 5 ? null : 
                            (
                                <>
                                <button className='btnselect' onClick={handleTimerChange} value="shortBreak" >Short break</button>
                                </>
                            )
                }

                {
                            timer.seconds === 0 && timer.minutes === 15 ? null : 
                                (
                                    <>            
                                        <button className='btnselect' onClick={handleTimerChange} value="longBreak">Long break</button>
                                    </>
                                )
                }

                        </>
                    )
                }
            
            
            {showCode === true && (
            <section className='pre'> 
                    {/* <form onSubmit={handlePersonalizable}> */}
                    <form onSubmit={handlePersonalizable}>
                        <div className='row mt-5 order-md-2'>
                            <div className="form-group col-md-6 ">
                            <div for="minutes">Minutes</div>
                            <input type="number" className="form-control" name="minutes" placeholder='0' maxLength="2" />
                            </div>
                            <div className="form-group col-md-6">
                            <div for="seconds">Seconds</div>
                            <input type="number" className="form-control" name="seconds" placeholder='0' maxLength="2" />
                            </div>
                            <div className="center">
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
                                <h1 className='horai' style={{ fontSize: `${timer.TextSize}px` }}>
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
                            {
                                currentUser && (
                                    <>
                                    <div className='config__menu'>
                                    <span>Tasks</span>
                                    <span className='menu' onClick={HandleHideTask}> 
                                    {timer.HideTask ? 'Show' : 'Hide'}	
                                    </span>
                                    </div>
                                    </>
                                )
                            }
                            {/* <div className='config__menu'>
                            <span>Hora</span>
                                <span className='menu'> 
                                {
                                    timer.minutes === 0 && timer.seconds === 0 ? 'OFF' : 'ON'
                                }
                                </span>
                            </div> */}
                            </section>
                        </>
                    )
                }
                </div>
                {
                    timer.HideTask < 1 && (
                        <>
                            <Pending/>
                        </>
                    )
                }
            </div>

            </div> 

        </div>
        

    </div>


    
    </section>

    </div>


    );
    }

export default Contador;