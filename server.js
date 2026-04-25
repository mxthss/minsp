require('dotenv').config();

const express = require('express');
const path = require('path');

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
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(express.json());
app.use(express.static('.'));

// API endpoint for recommendations
app.post('/api/recommend', async (req, res) => {
  try {
    const { userProfile, miceData } = req.body;

    if (!userProfile || !miceData) {
      return res.status(400).json({ error: 'Missing required fields: userProfile and miceData' });
    }

    // API Key with trim to remove hidden spaces
    const apiKey = (process.env.GEMINI_API_KEY || '').trim();
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    const prompt = `Tu es l'expert MinSp. Analyse ce profil utilisateur : ${JSON.stringify(userProfile)} 
    et ce catalogue de souris : ${JSON.stringify(miceData)}.
    Retourne EXCLUSIVEMENT un objet JSON avec cette structure :
    {
      "bestChoice": { "name": "Nom", "reason": "Explication courte", "matchPercentage": 95 },
      "alternatives": [ { "name": "Nom1", "price": "Prix1" }, { "name": "Nom2", "price": "Prix2" } ]
    }
    Interdiction de mettre du texte avant ou après le JSON.`;

    // Strict JSON format for Gemini v1 API
    const requestBody = { "contents": [{ "parts": [{ "text": prompt }] }] };
    
    console.log('Calling Gemini API...');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: await response.text() };
      }
      console.error('Gemini API error:', JSON.stringify(errorData));
      return res.status(500).json({ 
        error: 'Gemini API error', 
        status: response.status,
        details: errorData 
      });
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Unexpected Gemini response:', JSON.stringify(data));
      return res.status(500).json({ 
        error: 'Unexpected response from Gemini', 
        details: data 
      });
    }
    
    let responseText = data.candidates[0].content.parts[0].text;
    
    // Nettoyage des balises markdown
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    res.json(JSON.parse(cleanJson));
  } catch (error) {
    console.error('Recommendation error:', error);
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
