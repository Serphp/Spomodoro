
import { useContext, useState } from 'react';
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

    const [videoPlayerx, setVideoPlayerx] = useState(() => {
      const storedPlayer = JSON.parse(localStorage.getItem('videoPlayer'));
      return storedPlayer || [];
  });

    console.log(videoPlayerx.ShowPip);
  
    return (
      <section className="probootstrap-cover probootstrap-scene-0">
        <div className="container">
        <div className="row probootstrap-vh-75 align-items-center text-sm-center text-center">
        <div className="col-md-5 order-md-2">
        
        {ShowPip ?  (<>
        <form onSubmit={handleFormSubmit}>
        <h1 className="display-4 lead mb-5">Music</h1>
        <div className='inputplayer'>
        <input type="text" value={videoPlayer.url} onChange={handleInputChange} />
        <button type="submit">Reproducir</button>
        </div>
        </form>
        <button onClick={handleTogglePip}>Desplegar</button>
        </>) : null }
        
        <br/>
          {/* {
          setShowVideo ? 
          <button className='btnselect' onClick={handlePlayPause}>Pausar</button>
          : 
          <button className='btnselect' onClick={handlePlayPause}>Reproducir</button>
          } */}

        </div>
        <div className="col-md-7">
            <div className="mb-5 probootstrap-stagger ">
            <div className="probootstrap-animate">
            <div className='box1' style={{ display: ReactPlayer ? 'none' : 'block' }}>

          </div>

          {
            Showvideo && 
            <h1> Pop UP active </h1>
          }
            {videoPlayer.ShowPip && (
                <>
                <div >
                <ReactPlayer
                url={videoPlayer.url}
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
                
              <div class="slider">
                <input type="range" min={0} max={1} step="any" value={videoPlayerx.volume} onChange={handleVolumeChange} />
                <p id="rangeValue">100</p>   
              </div>   

                {/* <input className='volume' type="range" min={0} max={1} step="any" value={volume} onChange={handleVolumeChange} /> */}
  
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
  