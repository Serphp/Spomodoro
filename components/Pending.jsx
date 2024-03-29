import React, { useState, useContext } from 'react';
import { TimerContext } from '../src/Context/TimerContex';
import { TrashIcon } from '../src/assets/List/Trash';
import { PendingIcon } from '../src/assets/List/Pending';
import { CompletedIcon } from '../src/assets/List/Completed';
import { Link } from 'react-router-dom';
//import { AuthContext } from '../src/Context/AuthContext';

export const Pending = () => {
    const { handleReset, TecOff, timer } = useContext(TimerContext);
    //const { currentUser } = useContext(AuthContext);



    // const [timer, setTimer] = useState(() => {
    //     const storedTimer = JSON.parse(localStorage.getItem('timer'));
    //     return storedTimer || [];
    //     });
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        return storedTasks || [];
});


    //elimina una task del array
    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        const updatedTasks = storedTasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        const audio = new Audio('https://www.soundjay.com/buttons/beep-24.mp3');
        audio.play();
    }

    //handle para cambiar el estado de la task
    const handleTaskChange = (taskId) => {
        const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
            const audio = new Audio('https://www.soundjay.com/buttons/beep-23.mp3');
            audio.play();
        }
        return task;
        });
        
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }


    const handleSetTimer = (index) => {
    //const newTimer = [...tasks];
    //console.log(newTimer[index]);
    const currentTaskMinutes = tasks[index].minutes;
    const currentTaskSeconds = tasks[index].seconds;
    handleReset(currentTaskMinutes, currentTaskSeconds);
    TecOff();
    }

    return (
        <>
        <section className='taskcontenedor'>
        {// currentUser &&
        tasks.length === 0 ?
        <div className="notask"><Link to="/taskpage">Create task </Link></div> : null
        }

        { //currentUser &&
                tasks.filter(task => !task.completed)
                .slice(0, 1) // Solo se mostrará el primer elemento
                .map((task, index) => {
                
                return (
                    <div className="task" key={index}>
                        <Link to="/taskpage"><div className="task-header">
                            <div>{task.title ? (<>{task.title}</>) : ('No title')}</div>
                            <div>{task.minutes}:{task.seconds}</div>
                        </div></Link>

{
    !timer.isRunning && (
        <>
                                    <div className='task-body'>
                            {task.body.length > 20 ? task.title.slice(0, 20) + '...' : task.body}
                            </div>
                            
                            <div className="task-buttons">
                            {/* <div><a href='/tasklist'> Tasks </a></div> */}
                            <button className="buttont" onClick={() => removeTask(task.id)} title='Delete'>
                            <TrashIcon/>
                            </button>
                            <button className="buttont" onClick={() => handleTaskChange(task.id)} title='Complete?'>
                            {task.completed ? 
                            <CompletedIcon/>
                            : 
                            <PendingIcon/>
                            }
                            </button>
                            <button className="buttont" onClick={() => handleSetTimer(index)} title='Set time'>
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
                            <path d="M12 7v5l3 3"></path>
                            </svg>
                            </button>
                            </div>
        </>
    )
}


                    </div>
                    )
                }
            )
        }
        </section>
        </>
    )
}