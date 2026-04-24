import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Volume2, VolumeX, ListMusic, Maximize2, Heart, ChevronDown, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useMusic } from '../contexts/MusicContext';
import { useAuth } from '../contexts/AuthContext';

export const Player = () => {
  const { 
    currentSong, isPlaying, progress, volume, history,
    togglePlay, nextSong, prevSong, setVolume, seek, playSong, clearHistory
  } = useMusic();
  const { profile, toggleLike } = useAuth();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  if (!currentSong) return null;

  const isLiked = profile?.likedSongs.includes(currentSong.id);

  return (
    <>
      {/* Expanded Player Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[60] flex flex-col p-8 bg-atmospheric"
          >
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setIsExpanded(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <ChevronDown size={24} />
              </button>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Now Playing</p>
                <p className="text-xs font-bold">{currentSong.albumName || 'Midnight Echo'}</p>
              </div>
              <button className="p-2 opacity-0 pointer-events-none"><ChevronDown size={24} /></button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto w-full">
              <motion.div 
                animate={{ 
                  scale: isPlaying ? [1, 1.02, 1] : 1,
                  rotate: isPlaying ? [0, 1, 0, -1, 0] : 0
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-square w-full max-w-[400px] shadow-[0_40px_100px_-20px_rgba(34,197,94,0.3)] rounded-3xl overflow-hidden"
              >
                <img src={currentSong.coverUrl} className="w-full h-full object-cover" alt={currentSong.title} />
              </motion.div>

              <div className="flex flex-col w-full max-w-[400px]">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-4xl font-black tracking-tighter mb-2">{currentSong.title}</h2>
                    <p className="text-xl text-white/40 font-bold">{currentSong.artistName}</p>
                  </div>
                  <button 
                    onClick={() => toggleLike(currentSong.id)}
                    className={`${isLiked ? 'text-spotify' : 'text-white/40'} hover:scale-110 transition-all`}
                  >
                    <Heart size={32} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Progress in Expanded */}
                <div className="space-y-4 mb-8">
                  <div 
                    className="relative w-full h-2 bg-white/10 rounded-full cursor-pointer group"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      seek((x / rect.width) * 100);
                    }}
                  >
                    <div className="absolute top-0 left-0 h-full bg-spotify rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between text-xs font-mono text-white/40">
                    <span>{formatTime((progress / 100) * currentSong.duration)}</span>
                    <span>{formatTime(currentSong.duration)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-around">
                  <Shuffle className="text-white/40" />
                  <SkipBack onClick={prevSong} size={32} fill="white" className="cursor-pointer" />
                  <button 
                    onClick={togglePlay}
                    className="size-20 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
                  </button>
                  <SkipForward onClick={nextSong} size={32} fill="white" className="cursor-pointer" />
                  <Repeat className="text-white/40" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="h-[90px] player-glass px-6 flex items-center justify-between gap-4 z-50 overflow-hidden"
      >
        {/* Song Info */}
        <div className="flex items-center gap-4 w-[30%]">
          <div className="size-14 bg-white/10 rounded-md overflow-hidden border border-white/10 shadow-lg group relative cursor-pointer" onClick={() => setIsExpanded(true)}>
            <img 
              src={currentSong.coverUrl} 
              alt={currentSong.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ChevronDown className="rotate-180" />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-bold text-sm text-white truncate hover:underline cursor-pointer tracking-tight">
              {currentSong.title}
            </h4>
            <p className="text-[11px] text-white/40 truncate hover:text-white cursor-pointer transition-colors font-medium">
              {currentSong.artistName}
            </p>
          </div>
          <button 
            onClick={() => toggleLike(currentSong.id)}
            className={`${isLiked ? 'text-spotify' : 'text-white/40'} hover:text-spotify transition-colors ml-2`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 w-[40%]">
          <div className="flex items-center gap-6">
            <button className="text-white/40 hover:text-white transition-colors">
              <Shuffle size={18} />
            </button>
            <button onClick={prevSong} className="text-2xl text-white/80 hover:text-white transition-colors">
              «
            </button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="size-9 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all shadow-lg"
            >
              {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
            </motion.button>
            <button onClick={nextSong} className="text-2xl text-white/80 hover:text-white transition-colors">
              »
            </button>
            <button className="text-white/40 hover:text-white transition-colors">
              <Repeat size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full max-w-md">
            <span className="text-[10px] text-white/40 font-mono w-10 text-right">
              {formatTime((progress / 100) * currentSong.duration)}
            </span>
            <div 
              className="group relative flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                seek((x / rect.width) * 100);
              }}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-spotify rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 size-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-xl"
                style={{ left: `${progress}%`, marginLeft: '-6px' }}
              />
            </div>
            <span className="text-[10px] text-white/40 font-mono w-10">
              {formatTime(currentSong.duration)}
            </span>
          </div>
        </div>

        {/* Volume & Extra */}
        <div className="flex items-center gap-4 w-[30%] justify-end relative">
          <div className="relative">
            <ListMusic 
              size={18} 
              className={`cursor-pointer transition-colors ${showHistory ? 'text-spotify' : 'text-white/60 hover:text-white'}`}
              onClick={() => setShowHistory(!showHistory)}
            />
            {/* History Dropdown */}
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-12 right-0 w-80 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Recent History</h3>
                    <button 
                      onClick={clearHistory}
                      className="text-[10px] font-bold text-red-400 hover:text-red-300 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <Trash2 size={12} />
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                    {history.length > 0 ? history.map((song, i) => (
                      <div 
                        key={`${song.id}-${i}`}
                        onClick={() => playSong(song)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors"
                      >
                        <img src={song.coverUrl} className="size-10 rounded object-cover" alt="" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold truncate group-hover:text-spotify">{song.title}</span>
                          <span className="text-[10px] text-white/40 truncate">{song.artistName}</span>
                        </div>
                      </div>
                    )) : (
                      <p className="text-center text-white/20 text-xs py-8">Your history is empty</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2 group w-32 ml-2">
            {volume === 0 ? <VolumeX size={18} className="text-white/60" /> : <Volume2 size={18} className="text-white/60" />}
            <div 
              className="relative flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setVolume(Math.max(0, Math.min(1, x / rect.width)));
              }}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-white/60 rounded-full"
                style={{ width: `${volume * 100}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 size-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-xl"
                style={{ left: `${volume * 100}%`, marginLeft: '-6px' }}
              />
            </div>
          </div>
          <Maximize2 
            size={18} 
            className="text-white/60 hover:text-white cursor-pointer" 
            onClick={() => setIsExpanded(true)}
          />
        </div>
      </motion.div>
    </>
  );
};

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
