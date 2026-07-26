# 🎵 Music API - WhatsApp Bot Integration

A comprehensive REST API for music streaming, downloading, and searching. Designed to integrate seamlessly with WhatsApp bots and other applications.

## Features

✅ **YouTube Integration**
- Download videos as MP3
- Download videos as MP4
- Get video information and metadata

✅ **Search Capabilities**
- Search across multiple music sources
- YouTube search
- Spotify search (with credentials)
- Song search with aggregated results

✅ **Playback & Lyrics**
- Get playback information
- Fetch song lyrics
- Get song recommendations

✅ **Security & Performance**
- Rate limiting (100 requests per 15 minutes)
- Error handling
- CORS enabled
- Morgan logging

## Installation

```bash
git clone https://github.com/WOLVAREX/music-api.git
cd music-api
npm install
cp .env.example .env
```

Edit `.env` with your configuration.

## Quick Start

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /api/health
```

### YouTube
```
POST /api/youtube/mp3
POST /api/youtube/mp4
GET /api/youtube/info?url=<url>
```

### Search
```
GET /api/search/song?q=<query>&limit=10
GET /api/search/youtube?q=<query>&limit=10
GET /api/search/spotify?q=<query>&limit=10
```

### Playback
```
GET /api/playback/play?url=<url>
GET /api/playback/lyrics?q=<song>&artist=<artist>
GET /api/playback/recommendations?song=<song>&limit=5
```

## WhatsApp Bot Integration

### Song Search
```javascript
const response = await fetch('http://localhost:3000/api/search/song?q=Bohemian%20Rhapsody');
const data = await response.json();
```

### YouTube MP3 Download
```javascript
const response = await fetch('http://localhost:3000/api/youtube/mp3', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://youtube.com/watch?v=...' })
});
const data = await response.json();
```

### YouTube MP4 Download
```javascript
const response = await fetch('http://localhost:3000/api/youtube/mp4', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://youtube.com/watch?v=...', quality: 'high' })
});
const data = await response.json();
```

### Get Lyrics
```javascript
const response = await fetch('http://localhost:3000/api/playback/lyrics?q=Song%20Name');
const data = await response.json();
```

### Get Recommendations
```javascript
const response = await fetch('http://localhost:3000/api/playback/recommendations?song=Song%20Name&limit=5');
const data = await response.json();
```

## Project Structure

```
music-api/
├── src/
│   ├── index.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── routes/
│   │   ├── health.js
│   │   ├── youtube.js
│   │   ├── search.js
│   │   └── playback.js
│   └── services/
│       ├── youtubeService.js
│       ├── searchService.js
│       └── playbackService.js
├── .env.example
├── .gitignore
├── package.json
├── SETUP.md
└── README.md
```

## Dependencies

- **express**: Web framework
- **axios**: HTTP client
- **cors**: CORS middleware
- **morgan**: HTTP logging
- **dotenv**: Environment variables
- **ytdl-core**: YouTube downloader

## Rate Limiting

- **Window**: 15 minutes (configurable)
- **Max Requests**: 100 per window (configurable)
- Response code: 429 Too Many Requests

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |
| `YOUTUBE_API_KEY` | YouTube API key | - |
| `SPOTIFY_CLIENT_ID` | Spotify API ID | - |
| `SPOTIFY_CLIENT_SECRET` | Spotify API Secret | - |
| `RATE_LIMIT_WINDOW` | Rate limit window (minutes) | 15 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## Testing with cURL

```bash
# Health check
curl http://localhost:3000/api/health

# Search for a song
curl 'http://localhost:3000/api/search/song?q=Bohemian%20Rhapsody'

# Get video info
curl 'http://localhost:3000/api/youtube/info?url=https://www.youtube.com/watch?v=fJ9rUzIMt7o'

# Download MP3
curl -X POST http://localhost:3000/api/youtube/mp3 \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://www.youtube.com/watch?v=fJ9rUzIMt7o"}'
```

## License

MIT

## Support

For issues: Open an issue on GitHub

---

**Made with ❤️ by WOLVAREX**
