import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from '../components/Tasklist'
import Timer from '../components/timer'

function App() {
  const [count, setCount] = useState(0)

  function handleTimerComplete() {
    alert('Timer has completed!');
  }

  return (
    <div className="App">
      <h1> Hola </h1>
      {/* <TaskList/> */}
      <Timer onComplete={handleTimerComplete} />
    </div>
  )
}

export default App
