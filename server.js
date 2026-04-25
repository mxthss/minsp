const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

    // Debug: Check if API key is present (without exposing it)
    const rawApiKey = process.env.GEMINI_API_KEY;
    console.log('Clé présente ?', !!rawApiKey);
    console.log('Clé length:', rawApiKey ? rawApiKey.length : 0);
    
    // Trim API key to remove any hidden spaces
    const apiKey = rawApiKey ? rawApiKey.trim() : null;
    
    if (!apiKey) {
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
    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };
    console.log('Request body format:', JSON.stringify(requestBody).substring(0, 100) + '...');
    
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
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return res.status(500).json({ error: 'Gemini API error', details: errorText });
    }

    const data = await response.json();
    let responseText = data.candidates[0].content.parts[0].text;
    
    // Nettoyage des balises markdown si présentes
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    res.json(JSON.parse(cleanJson));
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ error: error.message });
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
