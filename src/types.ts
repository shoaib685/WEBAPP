export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  likedSongs: string[];
  savedAlbums: string[];
  followedArtists: string[];
  isPublic: boolean;
  isAdmin: boolean;
  createdAt: string;
}

export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId?: string;
  albumName?: string;
  duration: number; // in seconds
  audioUrl: string;
  coverUrl: string;
  genre: string;
  plays: number;
  releaseDate: string;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  coverUrl: string;
  releaseDate: string;
  genres: string[];
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  genres: string[];
  monthlyListeners: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerName: string;
  coverUrl?: string;
  songIds: string[];
  isPublic: boolean;
  collaboratorIds: string[];
  createdAt: string;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  history: Song[];
  volume: number;
  progress: number;
}
