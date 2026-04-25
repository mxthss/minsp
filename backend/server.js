const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Security: Rate limiting middleware (simple in-memory)
const requestCounts = new Map();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return next();
  }
  
  const record = requestCounts.get(ip);
  
  if (now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return next();
  }
  
  if (record.count >= RATE_LIMIT) {
    return res.status(429).json({ 
      error: 'Too many requests. Please wait a minute before trying again.' 
    });
  }
  
  record.count++;
  next();
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of requestCounts.entries()) {
    if (now > record.resetTime) {
      requestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// API endpoint for AI recommendations
app.post('/api/recommend', rateLimit, async (req, res) => {
  try {
    const { userProfile, miceData } = req.body;
    
    if (!userProfile || !miceData) {
      return res.status(400).json({ 
        error: 'Missing required fields: userProfile and miceData' 
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY not set in environment');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    const prompt = {
      contents: [{
        parts: [{
          text: `You are an AI mouse recommendation assistant for MinSp, a mouse comparison website.

USER PROFILE:
- Budget: $${userProfile.budget}
- Usage: ${userProfile.usage}
- Wireless preference: ${userProfile.wireless}
- Hand size: ${userProfile.handSize}
- Grip style: ${userProfile.gripStyle || 'Any'}

AVAILABLE MICE (from database):
${JSON.stringify(miceData, null, 2)}

TASK: Analyze the user profile and available mice. Return ONLY a JSON object in this exact format:
{
  "bestChoice": {
    "name": "Exact product name from database",
    "price": price_number,
    "reason": "2-3 sentences explaining why this is the best match for the user's profile"
  },
  "alternatives": [
    {"name": "Alternative 1 name", "price": price_number},
    {"name": "Alternative 2 name", "price": price_number}
  ]
}

RULES:
1. ONLY recommend mice from the provided database
2. Best choice must fit within budget (or close to it)
3. Consider usage type, wireless preference, and hand size
4. If no mouse matches well, say "No perfect match found" in the reason
5. Return ONLY valid JSON, no markdown, no explanation`
        }]
      }]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prompt)
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return res.status(502).json({ 
        error: 'AI service temporarily unavailable. Please try again later.' 
      });
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Invalid response format from AI:', text);
      return res.status(502).json({ 
        error: 'Invalid response from AI service' 
      });
    }

    const recommendation = JSON.parse(jsonMatch[0]);
    
    // Validate response structure
    if (!recommendation.bestChoice || !recommendation.bestChoice.name) {
      return res.status(502).json({ 
        error: 'Invalid recommendation format' 
      });
    }

    res.json(recommendation);
    
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendation. Please try again.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`MinSp Backend running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  - POST http://localhost:${PORT}/api/recommend`);
  console.log(`  - GET  http://localhost:${PORT}/api/health`);
});
