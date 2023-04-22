
import { useContext } from 'react';
//import YouTube from 'react-youtube';
//import ReactPlayer from 'react-player/lazy';
import ReactPlayer from 'react-player';
//import { TimerContext } from './Context/TimerContex';
import { PlayerContext } from './Context/PlayerContext';

export function Music() {

    const {
      url,
      videoPlayer,
      setVideoPlayer,
      playing,
      Showvideo,
      played,
      volume,
      setShowVideo,
      handleMute,
      ShowPip,
      handleTogglePip, //Show counter
      muted,
      handlePlayPause,
      handleSaveUrl,
      handleSaveProgress,
      handleVolumeChange,
      //handleVolumen,
      handleProgress,
      handleDuration
    } = useContext(PlayerContext);
  
    const handleInputChange = (event) => {
      const newUrl = event.target.value;
      handleSaveUrl(newUrl);
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      handleSaveProgress();
    };

  
    return (
      <section className="probootstrap-cover probootstrap-scene-0">
        <div className="container">
        <div className="row probootstrap-vh-75 align-items-center text-sm-center text-center">
        <div className="col-md-5 order-md-2">

        <form onSubmit={handleFormSubmit}>
        <h1 className="display-4 lead mb-5">Music</h1>
        <p className="">Reproduce tu musica favorita</p>

        <input type="text" value={url} onChange={handleInputChange} />

        <button type="submit">Reproducir</button>

        </form>
        

        <input type="range" min={0} max={1} step="any" value={volume} onChange={handleVolumeChange} />
  

        <br/>
          {
          setShowVideo ? 
          <button className='btnselect' onClick={handlePlayPause}>Pausar</button>
          : 
          <button className='btnselect' onClick={handlePlayPause}>Reproducir</button>
          }

        <button onClick={handleMute}>Mute</button>
        </div>
        <div className="col-md-7">
            <div className="mb-5 probootstrap-stagger ">
            <div className="probootstrap-animate">

            <button className='btnselect' onClick={handleTogglePip}>
            {ShowPip && "Desplegar" }
            </button>
         
            <div className='box1' style={{ display: ReactPlayer ? 'none' : 'block' }}>

          </div>

          {
            Showvideo && 
            <h1> Hola </h1>
          }
            {ShowPip && (
                <>
                <div >
                <ReactPlayer
                url={url}
                playing={playing}
                played={played}
                playbackRate={1}
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                onProgress={handleProgress}
                onDuration={handleDuration}
                volume={volume}
                muted={muted}
                //onMute={handleMute}
                onSeek={handleSaveProgress}
                onEnded={handleSaveProgress}
                width="100%"
                height="350px"
                //style={{ resize: 'both', overflow: 'auto' }}
                className='contenedorplayer'
              />
                </div>
                </>
              )
              }
      
                </div>
            </div>
        </div>
        </div>
        </div>
      </section>
    );
  };
  