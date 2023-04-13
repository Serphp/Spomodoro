import '../src/styles/global.scss'
import Contador from '../components/Timer';
import '../src/styles/bootstrap.min.css'
import User from '../components/Login';

function App() {

  function handleTimerComplete() {
    alert('Timer has completed!');
  }

  return (
    <div>
      {/* <Duration/> */}
      {/* <TaskList/> */}
      <Contador handleTimerComplete/>
      {/* <Settings/> */}

      <User/>
      
      {/* <section className="probootstrap-section probootstrap-scene-1 probootstrap-bg-dark">
      <div className="container ">
        <div className="row mb-5 justify-content-center text-center">
          <div className="col-lg-8">
            <h2 className="probootstrap-heading">Serphp</h2>
            <p className="mb-5 lead">
              Socials
            </p>
          </div>  
        </div>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="probootstrap-devices">
              
              <img src="" className="probootstrap-device-left img-fluid" />
              <img src="" className="probootstrap-device-right img-fluid" />
              <img src="" className="probootstrap-device-center img-fluid"/>
            </div>
          </div>
        </div>
      </div>
    </section> */}

    </div>
  )
}

export default App
