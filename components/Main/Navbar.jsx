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
import { NavbarMVer } from '../../src/assets/Mobile/Nver';
//import { LogoIcon } from '../../src/assets/logo';

export const NavBar = () => {
    const Serphp = "1.2.5";
    const { currentUser, logout } = useContext(AuthContext);
    const { timer, toggleTimer } = useContext(TimerContext);
    const { videoPlayer, handleMute, handlePause, handlePlay, ShowPip } = useContext(PlayerContext);
    const [isRunning, setIsRunning] = useState(false);
    const [buttonMove, setButtonMove] = useState(false);

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

            <div>
                <Link to="/" className='navlinkx'>
                <NavbarMIcon/>
                </Link>
            </div>

            <div>
                <Link to="/Taskpage" className="navlinkx" title='List'>
                <NavbarMList/>
                </Link>
                <Link to='/version' className='navlinkx' title='Version'>
                <NavbarMVer/>
                </Link>
                {
                currentUser &&
                (
                    <>
                    <Link to="/dashboard" className="navlinkx" title='Profile'>
                    <NavbarMProfile/>
                    </Link>
                    </>
                )
                }
            </div>

        </span>

    <nav className="navbar2 mt-4">


        {/* <h1 className='hora' style={{ fontSize: `${timer.TextSize}px` }}>
            {timer.isRunning ? <h1>{`${minutes}:${seconds}`}</h1> : <h3>Timer</h3>}
            </h1> */}

                <span className='navline'> 
                <Link to='/version' className='navlink' >{Serphp}</Link>
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


    <div className='space'>
    {
        ShowPip === false && (
        <>
            <button className='navicon' onClick={handleMute}>
                <div className="nicon"> 
                {videoPlayer.muted ? 
                <>
                <MuteIcon/>
                <h2></h2>
                </>
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
                {/* Principal interface */}
                <button className='navicon' onClick={toggleTimer}>
                <div className={`nicon ${buttonMove ? 'active' : ''}`}> 
                    <div className='conticon'>
                    {timer.isRunning ? 
                    <>
                    <PauseIcon/>
                    <p className='dep'>PAUSE</p>
                    </>
                    : 
                    <>
                    <PlayIcon/>
                    <p className='dep'>START</p>
                    </>
                    }
                    </div>
                </div>
                </button>
                <button className='navicon ml-2' onClick={handleSignOut}>
                <div className="nicon"> 
                    <div className='conticon'>
                    {currentUser ? 
                    <LogoutIcon/>
                    :
                     <>
                    <SigninIcon/>
                     <p className='dep'> Login </p>
                     </>
                     }
                     </div>
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