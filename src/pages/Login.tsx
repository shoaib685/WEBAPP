import React, { useState } from 'react';
import { motion } from 'motion/react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { Music2, Github, Loader2 } from 'lucide-react';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] size-[800px] bg-spotify/20 blur-[160px] rounded-full opacity-50" />
      <div className="absolute bottom-[-20%] right-[-20%] size-[800px] bg-purple-600/10 blur-[160px] rounded-full opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-10 rounded-[32px] relative z-10 shadow-2xl shadow-black"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.8, ease: "anticipate" }}
            className="size-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-white/5"
          >
            <Music2 className="text-black size-10" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tighter mb-2">SoundStream</h1>
          <p className="text-white/40 text-center text-sm font-medium">Experience music in its purest form.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] font-medium rounded-2xl mb-8">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-spotify/50 transition-all text-sm"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-spotify/50 transition-all text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="bg-white text-black font-black p-4 rounded-2xl mt-4 flex items-center justify-center gap-2 shadow-lg shadow-white/5 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin text-black" /> : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
          </motion.button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-[#050505]/0 backdrop-blur-md px-3 text-white/30 font-bold tracking-[0.2em]">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
          >
            <img src="https://www.google.com/favicon.ico" className="size-4" alt="Google" />
            <span className="text-sm font-bold tracking-tight">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
            <Github size={18} />
            <span className="text-sm font-bold tracking-tight">GitHub</span>
          </button>
        </div>

        <p className="text-center text-[13px] text-white/40 mt-10">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-white font-black hover:underline ml-1"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};
