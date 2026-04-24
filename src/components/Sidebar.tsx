import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, Music2, Users, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const SidebarItem = ({ icon, label, onClick, active }: SidebarItemProps) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-4 w-full p-3 rounded-lg transition-colors ${
      active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </motion.button>
);

export const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const { profile } = useAuth();

  return (
    <div className="w-64 h-full flex flex-col sidebar-glass p-6 gap-8 z-20">
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 bg-spotify rounded-full flex items-center justify-center shadow-lg shadow-spotify/20">
          <Music2 className="text-black size-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">SoundStream</h1>
      </div>

      <nav className="flex flex-col gap-1">
        <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-semibold px-2 mb-2">Menu</h3>
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')}
        />
        <SidebarItem 
          icon={<Search size={20} />} 
          label="Search" 
          active={activeTab === 'search'}
          onClick={() => setActiveTab('search')}
        />
        <SidebarItem 
          icon={<Library size={20} />} 
          label="Library" 
          active={activeTab === 'library'}
          onClick={() => setActiveTab('library')}
        />
      </nav>

      <div className="flex flex-col gap-1">
        <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-semibold px-2 mb-2">Playlists</h3>
        <SidebarItem icon={<PlusSquare size={20} />} label="Create New" />
        <SidebarItem icon={<Heart size={20} />} label="Liked Songs" active={activeTab === 'liked'} onClick={() => setActiveTab('liked')} />
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-[10px] text-white/40 mb-2 uppercase tracking-tight">Connect status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-spotify rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            <span className="text-[11px] font-mono uppercase text-white/80">Lavalink: Online</span>
          </div>
        </div>

        {profile && (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
            <img 
              src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username}`} 
              alt={profile.username}
              className="size-9 rounded-full object-cover border border-white/20 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate text-white">{profile.username}</span>
              <span className="text-[10px] text-white/40 font-medium">Premium User</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
