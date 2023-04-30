import '../src/styles/global.scss'
import Contador from '../components/Timer';
import '../src/styles/bootstrap.min.css'

function App() {

  function handleTimerComplete() {
    alert('Timer has completed!');
  }

  return (
    <div>
      <Contador handleTimerComplete/>

    </div>
  )
}

export default App
