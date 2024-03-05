import React, { createContext, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [url, setUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [Showvideo, setShowVideo] = useState(false);
  const [ShowPip, setShowPip] = useState(true);


  const [videoPlayer, setVideoPlayer] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem('videoPlayer'));
    return savedData || {
      url: '',
      playing: true,
      played: 0,
      duration: 0,
      volume: 0.5,
      muted: false,
      showVideo: false,
      ShowPip: false,
    }
  });

  //LOAD
  useEffect(() => {
    const savedData = localStorage.getItem('videoPlayer');
    const savedVolume = localStorage.getItem('volume');
    if (savedData) {
      setVideoPlayer(JSON.parse(savedData));
      setVolume(parseFloat(savedVolume));
    }
  }, []);
  
  //SAVE
  useEffect(() => {
    localStorage.setItem('videoPlayer', JSON.stringify(videoPlayer));
    localStorage.setItem('volume', JSON.stringify(volume));
    localStorage.setItem('url', url);
  }, [videoPlayer, volume, url]);

  // useEffect(() => {
  //   const savedData = localStorage.getItem('videoPlayer');
  //   if (savedData) {
  //     setVideoPlayer(JSON.parse(savedData));
  //   }
  // }, []);

  // useEffect(() => {
  //   const savedUrl = localStorage.getItem('url');
  //   const savedTime = localStorage.getItem('time');
  //   if (savedUrl) {
  //     setUrl(savedUrl);
  //   }
  //   if (savedTime) {
  //     setPlayed(parseFloat(savedTime));
  //   }
  // }, []);

  //Show Video on Top o Normal

  const handlePause = () => {
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      playing: false,
    }));
    setPlaying(true);
  };

  const handlePlay = () => {
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      playing: true,
    }));
    setPlaying(false);
  };

  
  const handleProgress = (progress) => {
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      played: progress.played,
    }));
  };
  
  const handleDuration = (duration) => {
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      duration,
    }));
  };
  
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      volume: newVolume // Guardar el volumen en el objeto videoPlayer
    }));
  };

  const handleMute = () => {
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      muted: !prevPlayer.muted,
    })
  );
  setMuted(!muted);
  };

  const handleSaveProgress = () => {
    const currentTime = localStorage.getItem('time');
  
    if (currentTime !== videoPlayer.played.toString()) {
      setVideoPlayer((prevPlayer) => ({
        ...prevPlayer,
        played: parseFloat(currentTime),
      }));
    }
  };
  
  const handleSaveUrl = (newUrl) => {
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      url: newUrl,
    }));
    //localStorage.setItem('url', newUrl);
  };

  const handleTogglePip = () => {
    setShowPip(!ShowPip);
    setShowVideo(!Showvideo);
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      SavePip: !prevPlayer.SavePip,
    }));
    setShowPip(!ShowPip);
  };


  const handleInputChange = (event) => {
    const newUrl = event.target.value;
    handleSaveUrl(newUrl);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSaveProgress();
  };


  return (
    <PlayerContext.Provider
      value={{
        videoPlayer,
        ShowPip, setShowPip, Showvideo, setShowVideo,
        handlePause, handlePlay,
        url,
        playing,
        played,
        duration,
        volume,
        muted,
        handleTogglePip, //Show counter
        handleProgress,
        handleDuration,
        handleVolumeChange,
        //handleVolumen,
        handleMute,
        handleSaveProgress,
        handleSaveUrl,
      }}
    >

      {
        Showvideo ? 
        <>
        <section>
        <div className=''> 
          <ReactPlayer

          url={videoPlayer.url}
          playing={playing}
          played={played}
          playbackRate={1}
          onPlay={true}
          onPause={false}
          onProgress={handleProgress}
          onDuration={handleDuration}
          volume={volume}
          muted={muted}
          //onMute={handleMute}
          onSeek={handleSaveProgress}
          onEnded={handleSaveProgress}
          width="100%"
          height="350px"
          style={{ 
          resize: 'both', 
          overflow: 'hidden',

          minWidth: '100%',
          maxWidth: '500px',
          minHeight: '100px',
          maxHeight: '400px',
          }}
            className="buttonpip-content contenedorplayer"
          /> 
        </div>

        <article className='musiccontenedor'> 
            <form onSubmit={handleFormSubmit}>
            <div className='inputplayer'>
            <input type="text" value={videoPlayer.url} onChange={handleInputChange} />
            <button type="submit">Reproducir</button>
            </div>
            </form>
        </article>

        <div class="slider">
                <input type="range" min={0} max={1} step="any" value={volume} onChange={handleVolumeChange} />
                <p className='slider-title'> volume </p>
        </div>   

          <div className='buttonpip-close'>
          <button onClick={handleTogglePip}>X</button>
          </div>

        </section>
        
        </>
        :
        null
      }


      {children}
    </PlayerContext.Provider>
  );
};
