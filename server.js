// require('dotenv').config();

const express = require('express');
const path = require('path');
const { getMinSpRecommendation } = require('./recommendations');

const app = express();
const PORT = process.env.PORT || 3000;

// Startup log: Check if Gemini API key is detected
console.log('Clé détectée :', !!process.env.GEMINI_API_KEY);
console.log('Server starting on port:', PORT);

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(express.json());
app.use(express.static('.'));

// API endpoint for recommendations - MinSp Engine
app.post('/api/recommend', async (req, res) => {
  try {
    const { userProfile, miceData } = req.body;

    if (!userProfile || !miceData) {
      return res.status(400).json({ error: 'Missing required fields: userProfile and miceData' });
    }

    console.log('MinSp Engine: Analyzing user profile...');
    console.log('User profile:', JSON.stringify(userProfile));
    
    // Utiliser le MinSp Engine avec délai de 800ms
    const result = await getMinSpRecommendation(userProfile, miceData);
    
    console.log('MinSp Engine: Analysis complete. Best match:', result.bestChoice.name, '-', result.bestChoice.matchPercentage + '%');
    
    res.json(result);
  } catch (error) {
    console.error('MinSp Engine error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
