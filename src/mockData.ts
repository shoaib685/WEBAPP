import { Song, Album, Artist, Playlist } from './types';

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Midnight City',
    artistId: 'a1',
    artistName: 'M83',
    albumId: 'al1',
    albumName: 'Hurry Up, We\'re Dreaming',
    duration: 243,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
    genre: 'Electronic',
    plays: 1250000,
    releaseDate: '2011-10-18'
  },
  {
    id: '2',
    title: 'Starboy',
    artistId: 'a2',
    artistName: 'The Weeknd',
    albumId: 'al2',
    albumName: 'Starboy',
    duration: 230,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop',
    genre: 'R&B',
    plays: 2500000,
    releaseDate: '2016-11-25'
  },
  {
    id: '3',
    title: 'Blinding Lights',
    artistId: 'a2',
    artistName: 'The Weeknd',
    albumId: 'al3',
    albumName: 'After Hours',
    duration: 200,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    genre: 'Synthpop',
    plays: 3500000,
    releaseDate: '2019-11-29'
  },
  {
    id: '4',
    title: 'Heat Waves',
    artistId: 'a3',
    artistName: 'Glass Animals',
    albumId: 'al4',
    albumName: 'Dreamland',
    duration: 238,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1459749411177-042180ceea72?w=400&h=400&fit=crop',
    genre: 'Indie Pop',
    plays: 1800000,
    releaseDate: '2020-06-29'
  },
  {
    id: '5',
    title: 'Levitating',
    artistId: 'a4',
    artistName: 'Dua Lipa',
    albumId: 'al5',
    albumName: 'Future Nostalgia',
    duration: 203,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1514525253344-99142117d0ec?w=400&h=400&fit=crop',
    genre: 'Pop',
    plays: 2200000,
    releaseDate: '2020-03-27'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Today\'s Top Hits',
    description: 'The hottest tracks in the world right now.',
    ownerId: 'system',
    ownerName: 'Midnight Echo',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    songIds: ['1', '2', '3', '4', '5'],
    isPublic: true,
    collaboratorIds: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    name: 'Chill Vibes',
    description: 'Relax with these laid back tunes.',
    ownerId: 'system',
    ownerName: 'Midnight Echo',
    coverUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop',
    songIds: ['4', '1'],
    isPublic: true,
    collaboratorIds: [],
    createdAt: new Date().toISOString()
  }
];
