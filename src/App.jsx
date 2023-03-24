//import { useState } from 'react'
import '../src/styles/global.scss'
//import TaskList from '../components/Tasklist'
import Contador from '../components/Timer';
import { NavBar } from '../components/Main/Navbar';
import { Footer } from '../components/Main/Footer';
import '../src/styles/bootstrap.min.css'
//import Settings from '../components/Setting'
//import Duration from '../components/Duration'

function App() {

  function handleTimerComplete() {
    alert('Timer has completed!');
  }

  return (
    <div>

      <h1 className='text-5xl font-bold underline mb-10'> Timer </h1>
      {/* <Duration/> */}
      {/* <TaskList/> */}
      <Contador handleTimerComplete/>
      {/* <Settings/> */}
    </div>
  )
}

export default App
