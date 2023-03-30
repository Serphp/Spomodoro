import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
//import { TimerProvider } from '../../src/Context/TimerContex';
import { TimerContext } from '../../src/Context/TimerContex';

export const NavBar = () => {
    const { timer } = useContext(TimerContext);

    const formatNumber = (number) => {
        return number.toString().padStart(2, '0');
    };
    
    const minutes = formatNumber(timer.minutes);
    const seconds = formatNumber(timer.seconds);
    //console.log(handleSP);
    return (
        <>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark probootstrap-navabr-dark">
        <div className="container">
        <a className="navbar-brand">
        <h1>{`${minutes}:${seconds}`} </h1>
        {/* <p>{timer.isRunning ? 'Active' : 'Inactive'}</p>  */}
        {/* <button className='btnselect' onClick={() => toggleTimer()}>{StartPause}</button> */}
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#probootstrap-nav" aria-controls="probootstrap-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="probootstrap-nav">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/Taskpage" className="nav-link">About</Link></li>
            <li className="nav-item">
                <a href="#" className="nav-link">
                    <button className='btn'>login</button>
                </a>
                </li>
            </ul>
        </div>
        </div>
    </nav>


        </>
    )
}