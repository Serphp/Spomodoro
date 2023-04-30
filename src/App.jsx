import '../src/styles/global.scss'
import Contador from '../components/Timer';
import '../src/styles/bootstrap.min.css'
import
 { Analytics } 
from
 
'@vercel/analytics/react'
;

function App() {

  function handleTimerComplete() {
    alert('Timer has completed!');
  }

  return (
    <div>
      <Analytics/>
      <Contador handleTimerComplete/>

    </div>
  )
}

export default App
