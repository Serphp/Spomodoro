import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { TimerContext } from '../../src/Context/TimerContex';
import { AuthContext } from '../../src/Context/AuthContext';
import { PauseIcon } from '../../src/assets/pause';
import { PlayIcon } from '../../src/assets/play';
import { LogoutIcon } from '../../src/assets/logout';
import { SigninIcon } from '../../src/assets/signin';
import { PlayerContext } from '../../src/Context/PlayerContext';
import { MuteIcon } from '../../src/assets/mute';
import { NomuteIcon } from '../../src/assets/nomute';
import { NavbarMIcon } from '../../src/assets/Mobile/Nhome';
import { NavbarMProfile } from '../../src/assets/Mobile/NProfile';
import { NavbarMList } from '../../src/assets/Mobile/NList';
//import { LogoIcon } from '../../src/assets/logo';

export const NavBar = () => {
    const Serphp = "1.2.1";
    const { currentUser, logout } = useContext(AuthContext);
    const { timer, toggleTimer } = useContext(TimerContext);
    const { videoPlayer, handleMute, handlePause, handlePlay, ShowPip } = useContext(PlayerContext);
    const [isRunning, setIsRunning] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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

    return (
        <>
        <span className='navline2'>
        <Link to="/" className='navlinkx'>
            <NavbarMIcon/>
        </Link>
        {currentUser ? 
                <>
                    <Link to="/dashboard" className="navlinkx" title='Profile'>
                    <NavbarMProfile/>
                    </Link>
                    <Link to="/Taskpage" className="navlinkx" title='List'>
                    <NavbarMList/>
                    </Link>
                </>                
                : null}
        </span>

    <nav className="navbar mt-4">


        {/* <h1 className='hora' style={{ fontSize: `${timer.TextSize}px` }}>
            {timer.isRunning ? <h1>{`${minutes}:${seconds}`}</h1> : <h3>Timer</h3>}
            </h1> */}

                <span className='navline'> 
                {Serphp}
                <Link to="/" className={`navlink ${location.pathname === '/' ? 'active' : ''}`}> Home </Link>
                <Link to="/Taskpage" className="navlink">List</Link>
                {
                currentUser ? 
                <>
                    <Link to="/dashboard" className="navlink">Dashboard</Link>
                    {/* <Link to="/Taskpage" className="navlink">List</Link> */}
                    {/* <Link to="/Music" className="navlink">Music</Link> */}
                </>                
                : null
            }
                </span>
            

                {        
        timer.ChangeHour ?
        <div className='hora' style={{ fontSize: `${timer.TextSize}px` }}>
            {timer.isRunning ? <h1>{`${minutes}:${seconds}`}</h1> : 
            <>
            <span className='logotitle'>
                SP 
                <p><br/> Technique Pomodoro </p>
            </span>
            </>
            }
            </div>
        :
            <h1 className='hora' style={{ fontSize: `${timer.TextSize}px` }}>
                {timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
            </h1>
    }


    <div className=''>
    {
        ShowPip === false && (
        <>
            <button className='navicon' onClick={handleMute}>
                <div className="nicon"> 
                {videoPlayer.muted ? 
                <MuteIcon/>
                : 
                <NomuteIcon/>
                }
                </div>
                </button>

                {/* BUTTON MUTE / PLAY */}

                <button className='navicon ml-2'>
                <div className="nicon"> 
                {videoPlayer.playing ? 
                <span onClick={handlePause}>
                <PauseIcon/>
                </span>
                : 
                <span className='' onClick={handlePlay}>
                <PlayIcon/>
                </span>
                }
                </div>
                </button>
        </>
        )
    }
                
                <button className='navicon' onClick={toggleTimer}>
                <div className="nicon"> 
                    {timer.isRunning ? 
                    <PauseIcon/>
                    : 
                    <PlayIcon/>
                    }
                </div>
                </button>
                <button className='navicon ml-2' onClick={handleSignOut}>
                <div className="nicon"> 
                    {currentUser ? 
                    <LogoutIcon/>
                    :
                     <SigninIcon/>
                     }
                     </div>
                </button>
                </div>
                
            </nav>
            <style jsx>{`
            .active {
                display: none;
              }
            }`}</style>
        </>
    )
}