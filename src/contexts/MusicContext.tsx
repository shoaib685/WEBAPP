import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song, PlayerState } from '../types';

interface MusicContextType extends PlayerState {
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (volume: number) => void;
  seek: (progress: number) => void;
  addToQueue: (song: Song) => void;
  clearHistory: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    queue: [],
    history: [],
    volume: 0.7,
    progress: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = state.volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setState(prev => ({ ...prev, progress: (audio.currentTime / audio.duration) * 100 }));
      }
    };

    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  useEffect(() => {
    if (state.currentSong && audioRef.current) {
      if (audioRef.current.src !== state.currentSong.audioUrl) {
        audioRef.current.src = state.currentSong.audioUrl;
      }
      if (state.isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.currentSong, state.isPlaying]);

  const playSong = (song: Song) => {
    setState(prev => {
      // If the song is already current, just toggle play
      if (prev.currentSong?.id === song.id) {
        return { ...prev, isPlaying: true };
      }
      // Add previous song to history if it exists
      const history = prev.currentSong ? [prev.currentSong, ...prev.history].slice(0, 50) : prev.history;
      return {
        ...prev,
        currentSong: song,
        isPlaying: true,
        progress: 0,
        history
      };
    });
  };

  const togglePlay = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const nextSong = () => {
    setState(prev => {
      if (prev.queue.length > 0) {
        const [next, ...rest] = prev.queue;
        return {
          ...prev,
          currentSong: next,
          queue: rest,
          isPlaying: true,
          progress: 0,
          history: prev.currentSong ? [prev.currentSong, ...prev.history] : prev.history
        };
      }
      return { ...prev, isPlaying: false };
    });
  };

  const prevSong = () => {
    setState(prev => {
      if (prev.history.length > 0) {
        const [prevSong, ...rest] = prev.history;
        return {
          ...prev,
          currentSong: prevSong,
          history: rest,
          queue: prev.currentSong ? [prev.currentSong, ...prev.queue] : prev.queue,
          isPlaying: true,
          progress: 0
        };
      }
      return prev;
    });
  };

  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume }));
  };

  const seek = (progress: number) => {
    if (audioRef.current && audioRef.current.duration) {
      const time = (progress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, progress }));
    }
  };

  const addToQueue = (song: Song) => {
    setState(prev => ({ ...prev, queue: [...prev.queue, song] }));
  };

  const clearHistory = () => {
    setState(prev => ({ ...prev, history: [] }));
  };

  return (
    <MusicContext.Provider value={{
      ...state,
      playSong,
      togglePlay,
      nextSong,
      prevSong,
      setVolume,
      seek,
      addToQueue,
      clearHistory
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
