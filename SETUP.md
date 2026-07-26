# Quick Setup Guide

## Installation

```bash
npm install
cp .env.example .env
```

## Start Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Configuration

Edit `.env` file:

```
PORT=3000
NODE_ENV=development
YOUTUBE_API_KEY=your_key_here
SPOTIFY_CLIENT_ID=your_id_here
SPOTIFY_CLIENT_SECRET=your_secret_here
```

## Test the API

```bash
# Health check
curl http://localhost:3000/api/health

# Search for a song
curl 'http://localhost:3000/api/search/song?q=Bohemian%20Rhapsody'

# Get video info
curl 'http://localhost:3000/api/youtube/info?url=https://www.youtube.com/watch?v=fJ9rUzIMt7o'
```

## WhatsApp Bot Integration Example

### Using Baileys (WhatsApp Bot)

```javascript
import pkg from '@whiskeysockets/baileys';
const { default: makeWASocket } = pkg;

const client = makeWASocket();

// Song search command
client.on('messages.upsert', async (m) => {
  const msg = m.messages[0];
  if (!msg.message) return;
  
  const text = msg.message.conversation || '';

  if (text.startsWith('/song ')) {
    const query = text.replace('/song ', '');
    const response = await fetch(`http://localhost:3000/api/search/song?q=${query}&limit=5`);
    const data = await response.json();
    
    let reply = '🎵 Search Results:\n\n';
    data.data.forEach((song, i) => {
      reply += `${i+1}. ${song.title}\nArtist: ${song.artist}\n\n`;
    });
    
    await client.sendMessage(msg.key.remoteJid, { text: reply });
  }

  if (text.startsWith('/ytmp3 ')) {
    const url = text.replace('/ytmp3 ', '');
    const response = await fetch('http://localhost:3000/api/youtube/mp3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await response.json();
    
    await client.sendMessage(msg.key.remoteJid, { 
      text: `✅ Converting to MP3...\nTitle: ${data.data.title}\nDuration: ${data.data.duration}s` 
    });
  }

  if (text.startsWith('/ytmp4 ')) {
    const url = text.replace('/ytmp4 ', '');
    const response = await fetch('http://localhost:3000/api/youtube/mp4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, quality: 'high' })
    });
    const data = await response.json();
    
    await client.sendMessage(msg.key.remoteJid, { 
      text: `✅ Converting to MP4...\nTitle: ${data.data.title}\nQuality: ${data.data.quality}` 
    });
  }

  if (text.startsWith('/lyrics ')) {
    const song = text.replace('/lyrics ', '');
    const response = await fetch(`http://localhost:3000/api/playback/lyrics?q=${song}`);
    const data = await response.json();
    
    await client.sendMessage(msg.key.remoteJid, { 
      text: `📝 Lyrics for: ${data.query}\n\n${data.data.lyrics}` 
    });
  }

  if (text.startsWith('/similar ')) {
    const song = text.replace('/similar ', '');
    const response = await fetch(`http://localhost:3000/api/playback/recommendations?song=${song}&limit=5`);
    const data = await response.json();
    
    let reply = `🎶 Similar to ${song}:\n\n`;
    data.data.forEach((rec, i) => {
      reply += `${i+1}. ${rec.title} - ${rec.artist}\n`;
    });
    
    await client.sendMessage(msg.key.remoteJid, { text: reply });
  }
});
```

## Commands Reference

| Command | Usage | Example |
|---------|-------|---------|
| `/song` | Search songs | `/song Bohemian Rhapsody` |
| `/ytmp3` | Download YouTube as MP3 | `/ytmp3 https://youtube.com/watch?v=...` |
| `/ytmp4` | Download YouTube as MP4 | `/ytmp4 https://youtube.com/watch?v=...` |
| `/lyrics` | Get song lyrics | `/lyrics Bohemian Rhapsody` |
| `/similar` | Get similar songs | `/similar Bohemian Rhapsody` |

## Deployment

### Heroku

```bash
heroku create your-app-name
git push heroku main
heroku logs --tail
```

### Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src ./src
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t music-api .
docker run -p 3000:3000 --env-file .env music-api
```

## Troubleshooting

### Port already in use
```bash
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm start
```

### Missing dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### YouTube download fails
- Check if video is not age-restricted
- Verify URL is correct
- Update ytdl-core: `npm update ytdl-core`

---

For more details, see README.md
