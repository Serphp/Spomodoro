import { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(event) {
    event.preventDefault();
    const taskTitle = event.target.elements.taskTitle.value;
    const newTask = { id: Date.now(), title: taskTitle };
    setTasks([...tasks, newTask]);
    event.target.reset();
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter(task => task.id !== taskId));
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