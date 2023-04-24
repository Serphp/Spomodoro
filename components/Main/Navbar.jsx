import { Link, useNavigate } from 'react-router-dom';
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
//import { LogoIcon } from '../../src/assets/logo';

export const NavBar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const { timer, toggleTimer } = useContext(TimerContext);
    const { videoPlayer, handleMute, handlePause, handlePlay, ShowPip } = useContext(PlayerContext);
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

    // const decreaseTextSize = () => {
    //     setTimer((prevState) => ({
    //       ...prevState,
    //       TextSize: prevState.TextSize - 20
    //     }));
    //   };

    //console.log(handleSP);
    return (
        <>
        <span className='navline2'>
        <Link to="/" className='navlinkx'>
            <svg width="36" height="36" fill="none" stroke="currentColor" 
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 10.182V22h18V10.182L12 2l-9 8.182Z"></path>
            </svg>
        </Link>
        {currentUser ? 
                <>
                    <Link to="/dashboard" className="navlinkx" title='Profile'>
                        <svg width="36" height="36" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                        </svg>
                    </Link>
                    <Link to="/Taskpage" className="navlinkx" title='List'>
                        <svg width="36" height="36" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 5.5 5 7l2.5-2.5"></path>
                        <path d="M3.5 11.5 5 13l2.5-2.5"></path>
                        <path d="M3.5 17.5 5 19l2.5-2.5"></path>
                        <path d="M11 6h9"></path>
                        <path d="M11 12h9"></path>
                        <path d="M11 18h9"></path>
                        </svg>
                    </Link>
                </>                
                : null}
        </span>

    <nav className="navbar">
    {/* <span className='beta'>beta</span> */}
    {
        
        timer.ChangeHour ?
        <div className='hora' style={{ fontSize: `${timer.TextSize}px` }}>
            {timer.isRunning ? <h1>{`${minutes}:${seconds}`}</h1> : 
            <>
            <span className='logotitle'>
                SP 
                <p><br/> Technique Pomodoro </p>
            </span>
            </>}
            </div>
        :
            <h1 className='hora' style={{ fontSize: `${timer.TextSize}px` }}>
                {timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
            </h1>
    }


        {/* <h1 className='hora' style={{ fontSize: `${timer.TextSize}px` }}>
            {timer.isRunning ? <h1>{`${minutes}:${seconds}`}</h1> : <h3>Timer</h3>}
            </h1> */}

                <span className='navline'> 
                v1.1.1
                <Link to="/" className='navlink'> Home </Link>
                {
                currentUser ? 
                <>
                    <Link to="/dashboard" className="navlink">Dashboard</Link>
                    <Link to="/Taskpage" className="navlink">List</Link>
                    {/* <Link to="/Music" className="navlink">Music</Link> */}
                </>                
                : null
            }
                </span>
            

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
        </>
    )
}