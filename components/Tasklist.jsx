import { useState, useEffect } from 'react';

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
    const newTask = { id: Date.now(), title: taskTitle };
    setTasks(prevTasks => [...prevTasks, newTask]);
    event.target.reset();
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  }


  function handleDeleteTask(taskId) {
    setTasks(tasks.filter(task => task.id !== taskId));
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = storedTasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  return (
    <div>
      <section className="probootstrap-section probootstrap-bg-dark">
      <div className="container">
        <div className="row mb-5 justify-content-center text-center">
          <div className="col-md-8">
            <h2 className="probootstrap-heading">Agregar tarea</h2>
            <form onSubmit={handleAddTask}>
          <input type="text" name="taskTitle" placeholder="Enter task title" />
          <button type="submit">Add Task</button>
          </form>
          </div>
        </div>
        <div className="row">
        {tasks.map(task => (
          <div className="col-md-3">
            <div className="media d-block mb-4">
              <img src="images/person_1.jpg" alt="" className="img-fluid mb-3 rounded"/>
              
              <div className="media-body p-3" key={task.id}>
                
            <h5 className="mt-0"> {task.title}</h5>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>

              </div>
              
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
    
    </div>
  );
}

export default TaskList;