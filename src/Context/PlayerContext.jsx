import React, { createContext, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [url, setUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem('url');
    const savedTime = localStorage.getItem('time');

    if (savedUrl) {
      setUrl(savedUrl);
    }

    if (savedTime) {
      setPlayed(parseFloat(savedTime));
    }
  }, []);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleSaveProgress = () => {
    const currentTime = localStorage.getItem('time');

    if (currentTime !== played.toString()) {
      localStorage.setItem('time', played.toString());
    }
  };

  const handleSaveUrl = (newUrl) => {
    localStorage.setItem('url', newUrl);
    setUrl(newUrl);
  };

  return (
    <PlayerContext.Provider
      value={{
        url,
        playing,
        played,
        duration,
        volume,
        muted,
        handlePlayPause,
        handleProgress,
        handleDuration,
        handleVolumeChange,
        handleMute,
        handleSaveProgress,
        handleSaveUrl,
      }}
    >
      <ReactPlayer
        url={url}
        playing={playing}
        played={played}
        onPlay={handlePlayPause}
        onPause={handlePlayPause}
        onProgress={handleProgress}
        onDuration={handleDuration}
        volume={volume}
        muted={muted}
        onMute={handleMute}
        onSeek={handleSaveProgress}
        onEnded={handleSaveProgress}
        width="100%"
        height="100%"
      />
      {children}
    </PlayerContext.Provider>
  );
};
