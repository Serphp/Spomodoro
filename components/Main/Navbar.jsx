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
        <span className='navline2'>
        <Link to="/" className='navlinkx'>
            <svg width="36" height="36" fill="none" stroke="currentColor" 
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 10.182V22h18V10.182L12 2l-9 8.182Z"></path>
            </svg>
        </Link>
        {currentUser ? 
                <>
                <li className="">
                    <Link to="/dashboard" className="navlink">Dashboard</Link>
                </li>
                <li className="">
                    <Link to="/Taskpage" className="navlink">List</Link>
                </li>
                </>                
                : null}
        </span>

    <nav className="navbar">
        
        {timer.isRunning ? <h1>{`${minutes}:${seconds}`}</h1> : <h3>Timer <span className='beta'>beta</span></h3>}

            {/* <div className="navbarlist2">
                <span className='navline'> 
                v1.0.2
                <Link to="/" className='navlink'> Home </Link>
                {
                currentUser ? 
                <>
                    <Link to="/dashboard" className="">Dashboard</Link>
                    <Link to="/Taskpage" className="">List</Link>
                </>                
                : null
            }
                </span>
                </div> */}
                <div className="navbarlist">
            {
                currentUser ? 
                <>
                <li className="nav-item">
                    <Link to="/dashboard" className="navlink">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Taskpage" className="navlink">List</Link>
                </li>
                </>                
                : null
            }
            
                <button className='btn' onClick={toggleTimer}>{timer.isRunning ? 'Pausar' : 'Iniciar'}</button>
                <button className='btn ml-2' onClick={handleSignOut}>{currentUser ? 'Logout' : 'Login'}</button>
                </div>
                
            </nav>
        </>
    )
}