import React from 'react';
import { Library as LibraryIcon, Play, Heart, Clock, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_SONGS, MOCK_PLAYLISTS } from '../mockData';
import { SongCard } from '../components/SongCard';
import { useAuth } from '../contexts/AuthContext';

export const Library = () => {
  const { profile } = useAuth();

  return (
    <div className="flex-1 overflow-y-auto bg-atmospheric p-8 pb-32">
      <header className="flex items-end gap-6 mb-12">
        <div className="size-52 bg-gradient-to-br from-indigo-700 to-purple-900 rounded-2xl flex items-center justify-center shadow-2xl relative group overflow-hidden">
          <Heart size={100} fill="white" className="group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Public Playlist</span>
          <h1 className="text-7xl font-black tracking-tighter">Your Library</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">{profile?.username}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{MOCK_SONGS.length} songs</span>
          </div>
        </div>
      </header>

      <div className="flex items-center gap-8 mb-8 border-b border-white/5 pb-2">
        <button className="text-sm font-bold border-b-2 border-spotify pb-2 px-1">Playlists</button>
        <button className="text-sm font-bold text-gray-500 hover:text-white pb-2 px-1 transition-colors">Artists</button>
        <button className="text-sm font-bold text-gray-500 hover:text-white pb-2 px-1 transition-colors">Albums</button>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Additions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {MOCK_SONGS.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Followed Artists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[1,2,3].map(i => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center group cursor-pointer"
            >
              <img 
                src={`https://i.pravatar.cc/150?u=artist${i}`} 
                className="size-32 rounded-full mb-4 object-cover shadow-2xl group-hover:shadow-spotify/20 transition-all"
                alt="Artist"
              />
              <span className="font-bold">Artist Name</span>
              <span className="text-xs text-gray-500">Artist</span>
            </motion.div>
          ))}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-white/20 transition-all opacity-50 hover:opacity-100"
          >
            <div className="size-32 rounded-full mb-4 bg-white/5 flex items-center justify-center">
              <UserPlus size={40} className="text-gray-400" />
            </div>
            <span className="font-bold">Find More</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
