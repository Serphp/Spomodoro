import { useState, useEffect } from 'react';
import moment from 'moment';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  
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
            <form onSubmit={handleAddTask}>
          <input type="text" name="taskTitle" className='imput' placeholder="Enter task title" />
          <br/>
          <input type="text" name="TaskBody" className='imput' placeholder="Descripcion" />
          <br/>
          <button type="submit">Add Task</button>
          </form>
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
                <div className='cardtask__actions'>
                  <button className='cardtask__actions__button' onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  <button className='cardtask__actions__button' onClick={() => handleCompleteTask(task.id)}>
                    {task.completed ? 'Completado' : 'Completar'}
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
            <p className='cardtask__elapsed-time'>{`Completado hace ${elapsedTime}`}</p>
            <div className='cardtask__actions'>
              <button className='cardtask__actions__button' onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <button className='cardtask__actions__button' onClick={() => handleCompleteTask(task.id)}>
                {task.completed ? 'Completado' : 'Completar'}
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