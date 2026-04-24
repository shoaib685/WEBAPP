import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { Song } from '../types';
import { useMusic } from '../contexts/MusicContext';

export const SongCard = ({ song }: { song: Song }) => {
  const { playSong, currentSong, isPlaying } = useMusic();
  const isCurrent = currentSong?.id === song.id;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group cursor-pointer border border-white/5 shadow-lg hover:shadow-black/40"
      onClick={() => playSong(song)}
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg shadow-xl shadow-black/40">
        <img 
          src={song.coverUrl} 
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${isCurrent && isPlaying ? 'opacity-100' : ''}`}>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="size-11 bg-spotify rounded-full flex items-center justify-center shadow-2xl"
          >
            <Play size={20} fill="black" className="ml-1" />
          </motion.div>
        </div>
      </div>
      <div>
        <h3 className={`font-bold truncate text-[13px] mb-1 tracking-tight ${isCurrent ? 'text-spotify' : 'text-white'}`}>
          {song.title}
        </h3>
        <p className="text-[11px] text-white/40 truncate hover:text-white transition-colors">
          {song.artistName}
        </p>
      </div>
    </motion.div>
  );
};
