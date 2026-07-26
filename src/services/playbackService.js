import axios from 'axios';
import { ApiError } from '../middleware/errorHandler.js';

export const getPlaybackInfo = async (urlOrId) => {
  try {
    return {
      id: urlOrId,
      title: 'Sample Song Title',
      artist: 'Sample Artist',
      album: 'Sample Album',
      duration: 240,
      format: 'mp3',
      bitrate: '320kbps',
      codec: 'AAC',
      thumbnail: 'https://via.placeholder.com/300',
      url: `https://example.com/stream/${urlOrId}`
    };
  } catch (error) {
    throw new ApiError(`Failed to get playback info: ${error.message}`, 500);
  }
};

export const getLyrics = async (song, artist = '') => {
  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist || 'artist'}/${song}`, {
      timeout: 5000
    }).catch(() => ({ data: { lyrics: 'Lyrics not found for this song. Please try another search.' } }));
    return {
      song,
      artist,
      lyrics: response.data.lyrics || 'Lyrics not available',
      source: 'lyrics.ovh'
    };
  } catch (error) {
    return { song, artist, lyrics: 'Unable to fetch lyrics. Please try again later.', error: error.message };
  }
};

export const getRecommendations = async (song, artist = '', limit = 5) => {
  try {
    const recommendations = [
      { title: `Similar Song 1 to ${song}`, artist: artist || 'Artist 1', similarity: '95%', url: 'https://example.com/song1' },
      { title: `Similar Song 2 to ${song}`, artist: artist || 'Artist 2', similarity: '90%', url: 'https://example.com/song2' },
      { title: `Similar Song 3 to ${song}`, artist: artist || 'Artist 3', similarity: '88%', url: 'https://example.com/song3' },
      { title: `Similar Song 4 to ${song}`, artist: artist || 'Artist 4', similarity: '85%', url: 'https://example.com/song4' },
      { title: `Similar Song 5 to ${song}`, artist: artist || 'Artist 5', similarity: '82%', url: 'https://example.com/song5' }
    ];
    return recommendations.slice(0, limit);
  } catch (error) {
    throw new ApiError(`Failed to get recommendations: ${error.message}`, 500);
  }
};
