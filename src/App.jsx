//import { useState } from 'react'
import '../src/styles/global.scss'
//import TaskList from '../components/Tasklist'
import Contador from '../components/Timer'
import { NavBar } from '../components/Main/Navbar';
import { Footer } from '../components/Main/Footer';
//import Settings from '../components/Setting'
//import Duration from '../components/Duration'

function App() {

  function handleTimerComplete() {
    alert('Timer has completed!');
  }

  return (
    <div className="App">
      <NavBar />
      <h1 className='text-3xl font-bold underline'> Timer </h1>
      {/* <Duration/> */}
      {/* <TaskList/> */}
      <Contador />
      {/* <Settings/> */}
      <Footer/>
    </div>
  )
}

export default App
