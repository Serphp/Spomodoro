import { useState, useEffect } from 'react';
import moment from 'moment';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [isPlus, setIsPlus] = useState(true);
  
  const handleShowCode = () => { 
    setShowCode(!showCode);
    setIsPlus((prevIsPlus) => !prevIsPlus);
  };

  useEffect(() => {
    
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      setTasks(tasks);
    }
    
  }, []);

  function handleAddTask(event) {
    event.preventDefault();
    const taskTitle = event.target.elements.taskTitle.value;
    const TaskBody = event.target.elements.TaskBody.value;
    const newTask = { 
      id: Date.now(), 
      title: taskTitle,
      body: TaskBody,
      completed: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    event.target.reset();
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  }


  function handleCompleteTask(taskId) {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }


  function handleDeleteTask(taskId) {
    setTasks(tasks.filter(task => task.id !== taskId));
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = storedTasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  //show title of completed tasks
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>



      <section className="probootstrap-section probootstrap-cover probootstrap-scene-0">
      <div className="container">
        <div className="row mb-5 justify-content-center text-center">
          <div className="col-md-8">
            <h2 className="probootstrap-heading">Agregar tarea</h2>
            <button className='buttonplus' onClick={handleShowCode}> 
            <span className='buttonptext'>
            {isPlus ? '+' : '-'}
            </span>
            </button>

            {showCode && (
            <form className='boxplus' onSubmit={handleAddTask}>
            <input type="text" name="taskTitle" className='imput' placeholder="Enter task title" />
            <br/>
            <textarea type="text" name="TaskBody" className='imput' placeholder="Descripcion" />
            <br/>
            <button type="submit" className='btnselect'>Add Task</button>
            </form>
            
          
    )}
</div>
  </div>

        <div className="row">
        {tasks.map((task) => {
          if (!task.completed) {
            return (
            <div className="col-md-4">
            <div className="media d-block mb-4">
              <img src="" alt="" className="img-fluid mb-3 rounded"/>
              <div className="cardtask media-body p-3" key={task.id}>
                <h5 className="cardtask__title mt-0">{task.title}</h5>
                <p className='cardtask__description'>{task.body}</p>
                <div className='cardtask__contenedor'>
                <p className='cardtask__status'>{task.completed ? 'Completed' : 'Pending'}</p>
                <span className='cardtask__date'>{moment(task.id).fromNow()}</span>
                </div>
                <div className='cardtask__actions'>
                  <button className='cardtask__actions__button' onClick={() => handleDeleteTask(task.id)}>
                      <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 7h16"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                      <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                      </svg>
                    </button>
                  <button className='cardtask__actions__button' onClick={() => handleCompleteTask(task.id)}>
                    {task.completed ? <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m7 12 5 5L22 7"></path>
                    <path d="m12 12 5-5M2 12l5 5-5-5Z"></path>
                    </svg>
                    : 
                    <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m5 12 5 5L20 7"></path>
                    </svg>}
                  </button>
                </div>
              </div>
            </div>
            </div>
            )
            }
        })}
        </div>

      </div>
    </section>
    
    <section className="">
      <div className="container">
        <div className="row mb-5 justify-content-center text-center">
          <div className="col-md-8">
          {completedTasks.length > 0 && <h2 className="probootstrap-heading">Tareas completadas</h2>}

          </div>
        </div>

        <div className="row">
        {tasks.map((task) => {
    if (task.completed) {
      const completedAt = moment(task.completedAt + "Z", 'YYYY-MM-DDTHH:mm:ssZ');
      if (!completedAt.isValid()) {
        return "Fecha inválida";
      }
      const elapsedTime = moment.duration(moment().diff(completedAt)).humanize();
    return (
      <div className="col-md-4">
        <div className="media d-block mb-4">
          <img src="" alt="" className="img-fluid mb-3 rounded"/>
          <div className="cardtask media-body p-3" key={task.id}>
            <h5 className="cardtask__title mt-0">{task.title}</h5>
            <p className='cardtask__description'>{task.body}</p>
            <p className='cardtask__status'>{task.completed ? 'Completed' : 'Pending'}</p>
            <span className='cardtask__date'>{moment(task.id).format('MMMM Do YYYY, h:mm:ss a')}</span>
            <div className='cardtask__actions'>
            <button className='cardtask__actions__button' onClick={() => handleDeleteTask(task.id)}>
                      <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 7h16"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                      <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                      </svg>
                    </button>
                  <button className='cardtask__actions__button' onClick={() => handleCompleteTask(task.id)}>
                    {task.completed ? <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m7 12 5 5L22 7"></path>
                    <path d="m12 12 5-5M2 12l5 5-5-5Z"></path>
                    </svg>
                    : 
                    <svg width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m5 12 5 5L20 7"></path>
                    </svg>}
                  </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})}
        </div>

      </div>
    </section>
    </div>
  );
}

export default TaskList;