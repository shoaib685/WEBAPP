import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  toggleLike: (songId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          // Create basic profile
          const newProfile: UserProfile = {
            uid: user.uid,
            username: user.displayName || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            avatarUrl: user.photoURL || '',
            bio: '',
            followersCount: 0,
            followingCount: 0,
            likedSongs: [],
            savedAlbums: [],
            followedArtists: [],
            isPublic: true,
            isAdmin: false,
            createdAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'users', user.uid), newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOut = () => auth.signOut();

  const toggleLike = async (songId: string) => {
    if (!user || !profile) return;

    const isLiked = profile.likedSongs.includes(songId);
    const userRef = doc(db, 'users', user.uid);

    try {
      await updateDoc(userRef, {
        likedSongs: isLiked ? arrayRemove(songId) : arrayUnion(songId)
      });
      
      // Update local state
      setProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          likedSongs: isLiked 
            ? prev.likedSongs.filter(id => id !== songId) 
            : [...prev.likedSongs, songId]
        };
      });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, toggleLike }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
