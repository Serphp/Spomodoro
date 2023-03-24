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
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddTask}>
        <input type="text" name="taskTitle" placeholder="Enter task title" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskList;