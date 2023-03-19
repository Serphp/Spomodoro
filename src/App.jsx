import { useState } from 'react'
import './App.css'
import TaskList from '../components/Tasklist'
import Contador from '../components/Timer'
import Settings from '../components/Setting'
import Duration from '../components/Duration'

function App() {

  function handleTimerComplete() {
    alert('Timer has completed!');
  }

  return (
    <div className="App">
      <h1 className='text-3xl font-bold underline'> Timer </h1>
      {/* <Duration/> */}
      {/* <TaskList/> */}
      <Contador />
      {/* <Settings/> */}
    </div>
  )
}

export default App
