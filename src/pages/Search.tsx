import React, { useState } from 'react';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_SONGS } from '../mockData';
import { SongCard } from '../components/SongCard';

export const Search = () => {
  const [query, setQuery] = useState('');
  
  const filteredSongs = MOCK_SONGS.filter(song => 
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artistName.toLowerCase().includes(query.toLowerCase()) ||
    song.genre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-atmospheric p-8 pb-32">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400 group-focus-within:text-spotify transition-colors" size={20} />
          </div>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full bg-white/10 border border-white/10 rounded-full py-4 pl-12 pr-12 focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all text-lg shadow-2xl"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {!query ? (
        <section>
          <h2 className="text-2xl font-bold mb-6">Browse All</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Electronic', 'R&B', 'Pop', 'Indie', 'Hip Hop', 'Rock', 'Jazz', 'Classical'].map((genre, i) => (
              <motion.div
                key={genre}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square rounded-xl p-4 cursor-pointer relative overflow-hidden shadow-lg`}
                style={{ backgroundColor: `hsl(${i * 45}, 60%, 40%)` }}
              >
                <h3 className="text-xl font-bold">{genre}</h3>
                <SearchIcon size={80} className="absolute -bottom-4 -right-4 opacity-10 rotate-12" />
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Search results for "{query}"</h2>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white bg-white/5 px-4 py-2 rounded-full border border-white/5 transition-colors">
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
          
          <AnimatePresence>
            {filteredSongs.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
              >
                {filteredSongs.map(song => (
                  <SongCard key={song.id} song={song} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="size-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <SearchIcon size={40} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">No results found for "{query}"</h3>
                <p className="text-gray-400">Please make sure your words are spelled correctly or use less or different keywords.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}
    </div>
  );
};
