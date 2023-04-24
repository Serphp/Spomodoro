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
      playing: false,
      played: 0,
      duration: 0,
      volume: 0.5,
      muted: false,
      showVideo: false,
      SavePip: false,
    }
    });

  // const [videoPlayer, setVideoPlayer] = useState({
  //   const savedData = JSON.parse(localStorage.getItem('videoPlayer'));
  //   return savedData || {
  //   url: '',
  //   playing: false,
  //   played: 0,
  //   duration: 0,
  //   volume: 0.5,
  //   muted: false,
  //   showVideo: false,
  //   SavePip: false,
  //   }
  // });

  useEffect(() => {
    const savedData = localStorage.getItem('videoPlayer');
    if (savedData) {
      setVideoPlayer(JSON.parse(savedData));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('videoPlayer', JSON.stringify(videoPlayer));
    const savedUrl = localStorage.getItem('url');
    if (savedUrl) {
      setUrl(savedUrl);
    }
  }, [videoPlayer]);

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

  const handlePlayPause = () => {
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      playing: !prevPlayer.playing,
    }));
    //setPlaying(!playing);
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
  
  // const handleVolumeChange = (value) => {
  //   setVideoPlayer((prevPlayer) => ({
  //     ...prevPlayer,
  //     volume: value,
  //   }));
  //   setVolume(value);
  // };
  
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
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
    localStorage.setItem('url', newUrl);
  };

  const handleTogglePip = () => {
    setShowPip(!ShowPip);
    setShowVideo(!Showvideo);
    setVideoPlayer((prevPlayer) => ({
      ...prevPlayer,
      SavePip: !prevPlayer.SavePip,
    }));
    setShowPip(!ShowPip);
    localStorage.setItem('videoPlayer', JSON.stringify(videoPlayer));
  };


  // const handleProgress = (progress) => {
  //   setPlayed(progress.played);
  // };

  // const handleDuration = (duration) => {
  //   setDuration(duration);
  // };

  // const handleVolumeChange = (value) => {
  //   setVolume(value);
  // };


  // const handleSaveProgress = () => {
  //   const currentTime = localStorage.getItem('time');

  //   if (currentTime !== played.toString()) {
  //     localStorage.setItem('time', played.toString());
  //   }
  // };

  // const handleSaveUrl = (newUrl) => {
  //   localStorage.setItem('url', newUrl);
  //   setUrl(newUrl);
  // };


  return (
    <PlayerContext.Provider
      value={{
        videoPlayer,
        ShowPip, setShowPip, Showvideo, setShowVideo,
        url,
        playing,
        played,
        duration,
        volume,
        muted,
        handleTogglePip, //Show counter
        handlePlayPause,
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
          url={url}
          playing={true}
          played={played}
          //onPlay={handlePlayPause}
          //onPause={handlePlayPause}
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
