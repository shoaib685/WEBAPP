import React from 'react';
import { motion } from 'motion/react';
import { SongCard } from '../components/SongCard';
import { MOCK_SONGS, MOCK_PLAYLISTS } from '../mockData';
import { useAuth } from '../contexts/AuthContext';
import { Play, Heart, Clock, TrendingUp } from 'lucide-react';

const Greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const Home = () => {
  const { profile } = useAuth();

  return (
    <div className="flex-1 overflow-y-auto bg-atmospheric p-8 pb-32 z-10">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black mb-1 tracking-tight"
          >
            {Greeting()}, {profile?.username || 'Echo'}
          </motion.h1>
          <p className="text-white/40 text-sm font-medium tracking-wide">Your personalized feed for tonight.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/5 cursor-pointer hover:bg-white/15 transition-colors">
            <span className="text-xs font-bold uppercase tracking-wider">Premium Plan</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-64 w-full rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10 group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1024" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s]"
        />
        <div className="relative z-20 p-10 h-full flex flex-col justify-center max-w-lg">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-white/80">Featured Playlist</p>
          <h2 className="text-5xl font-black mb-6 tracking-tighter leading-none">Retro Wave Dreams</h2>
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-spotify text-black font-extrabold px-8 py-3 rounded-full shadow-lg shadow-spotify/20 hover:bg-green-400 transition-colors"
            >
              LISTEN NOW
            </motion.button>
            <button className="border border-white/30 backdrop-blur-md px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
              FOLLOW
            </button>
          </div>
        </div>
      </motion.div>

      {/* Jump Back In */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">Jump back in</h2>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">Show all</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PLAYLISTS.slice(0, 6).map((playlist) => (
            <motion.div 
              key={playlist.id}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              className="flex items-center gap-4 bg-white/5 rounded-xl overflow-hidden cursor-pointer group transition-all border border-white/5"
            >
              <img src={playlist.coverUrl} alt={playlist.name} className="size-20 object-cover shadow-lg" />
              <span className="font-bold pr-4 flex-1 tracking-tight truncate">{playlist.name}</span>
              <div className="size-11 bg-spotify rounded-full flex items-center justify-center mr-4 shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <Play size={20} fill="black" className="ml-0.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-spotify" />
            <h2 className="text-xl font-bold tracking-tight">Midnight Recommendations</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {MOCK_SONGS.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </div>
  );
};
