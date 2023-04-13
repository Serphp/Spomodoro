import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { TimerContext } from '../../src/Context/TimerContex';
import { AuthContext } from '../../src/Context/AuthContext';

export const NavBar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const { timer, toggleTimer } = useContext(TimerContext);
    const [isRunning, setIsRunning] = useState(false);
    const navigate = useNavigate();

    const formatNumber = (number) => {
        return number.toString().padStart(2, '0');
    };
    
    const handleSignOut = () => {
        if (currentUser) {
            logout();
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    const minutes = formatNumber(timer.minutes);
    const seconds = formatNumber(timer.seconds);
    //console.log(handleSP);
    return (
        <>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark probootstrap-navabr-dark">
        <div className="">
        <a className="navbar-brand">
        {timer.isRunning ? <h1>{`${minutes}:${seconds}`}</h1> : <h3>Timer <span className='beta'>beta</span></h3>}
        </a>
        <div className="navcenter">
            <button className='btn' onClick={toggleTimer}>{timer.isRunning ? 'Pausar' : 'Iniciar'}</button>
        </div>
        <div className='navbarconlist navcenter'>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item"><Link to="/" className="nav-link">Timer</Link></li>
            <li className="nav-item"><Link to="/Taskpage" className="nav-link">List</Link></li>
            <li className="nav-item">
                </li>
            </ul>
            </div>
        <div className="navbarlist" id="probootstrap-nav">
            <ul className="navline">
            <li className="">
                <Link to="/" className='navlink' > Home </Link>
            </li>
            {/* <li className="">
                <Link to="/Taskpage" className="navlink">List</Link>
            </li> */}
            {
                currentUser ? 
                <>
                <li className="nav-item"><Link to="/dashboard" className="navlink">Dashboard</Link></li>
                <li className="nav-item"><Link to="/Taskpage" className="navlink">List</Link></li>
                </>                
                : null
            }
            <li className="nav-item">
                <div className="nav-link">
                    <button className='btn' onClick={toggleTimer}>{timer.isRunning ? 'Pausar' : 'Iniciar'}</button>
                    <button className='btn ml-2' onClick={handleSignOut}>{currentUser ? 'Logout' : 'Login'}</button>
                    
                </div>
                </li>
            </ul>
        </div>
        </div>
    </nav>


        </>
    )
}