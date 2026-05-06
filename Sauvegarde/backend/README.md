# MinSp Backend

Backend proxy server to securely handle AI recommendations without exposing API keys to the client.

## 🔒 Security Features

- **API Key Protection**: Gemini API key is stored server-side only
- **Rate Limiting**: 10 requests per minute per IP
- **CORS Protection**: Accepts requests from any origin (configurable)
- **Input Validation**: Validates request body structure
- **Error Handling**: Sanitized error messages (no sensitive info leaked)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

The `.env` file is already created with the API key. Make sure it's not committed to git:

```bash
# .env file should contain:
GEMINI_API_KEY=your_api_key_here
PORT=3001
```

### 3. Start the Server

```bash
npm start
```

Server will run on `http://localhost:3001`

## 📡 API Endpoints

### POST `/api/recommend`

Get AI-powered mouse recommendations.

**Request Body:**
```json
{
  "userProfile": {
    "budget": 100,
    "usage": "gaming",
    "wireless": "true",
    "handSize": "medium",
    "gripStyle": "palm"
  },
  "miceData": [
    {
      "name": "Logitech G Pro X",
      "brand": "Logitech",
      "price": 129,
      "dpi": 25600,
      "wireless": true,
      "weight": 63
    }
  ]
}
```

**Response:**
```json
{
  "bestChoice": {
    "name": "Logitech G Pro X",
    "price": 129,
    "reason": "This mouse matches your gaming usage with high DPI sensor and wireless capability."
  },
  "alternatives": [
    {"name": "Razer Viper V2 Pro", "price": 149},
    {"name": "Zowie EC2-C", "price": 69}
  ]
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🛡️ Production Deployment

### Option 1: Deploy with Frontend (Recommended)

For a simple deployment, you can use a serverless function:

#### Netlify Functions

Create `netlify/functions/recommend.js`:

```javascript
exports.handler = async (event, context) => {
  // Same logic as server.js but adapted for Netlify
};
```

#### Vercel Serverless Functions

Create `api/recommend.js`:

```javascript
export default async function handler(req, res) {
  // Same logic as server.js
}
```

### Option 2: Separate Server Deployment

Deploy to Heroku, Railway, Render, or any Node.js hosting:

```bash
# Example for Railway
railway login
railway up
```

### Option 3: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

## ⚠️ Important Security Notes

1. **Never commit `.env` file** - It's in `.gitignore` for a reason
2. **Rotate API keys regularly** - Change your Gemini API key every few months
3. **Monitor usage** - Check Gemini API dashboard for unexpected spikes
4. **Add authentication** - For production, add user authentication before `/api/recommend`
5. **HTTPS only** - Always use HTTPS in production (handled automatically by most platforms)

## 🔧 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | - | Google Gemini API key |
| `PORT` | No | 3001 | Server port |

## 🐛 Troubleshooting

**Problem:** `Error: Cannot find module 'express'`
**Solution:** Run `npm install` in the backend folder

**Problem:** `GEMINI_API_KEY not set`
**Solution:** Check that `.env` file exists and contains the key

**Problem:** CORS errors in browser
**Solution:** Backend CORS is set to allow all origins. Check that backend is running on correct port.

**Problem:** Rate limit errors
**Solution:** Wait 1 minute. For development, you can increase `RATE_LIMIT` in server.js.
