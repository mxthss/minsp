const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API endpoint for recommendations
app.post('/api/recommend', async (req, res) => {
  try {
    const { userProfile, miceData } = req.body;

    if (!userProfile || !miceData) {
      return res.status(400).json({ error: 'Missing required fields: userProfile and miceData' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Tu es l'expert MinSp. Analyse ce profil utilisateur : ${JSON.stringify(userProfile)} 
    et ce catalogue de souris : ${JSON.stringify(miceData)}.
    Retourne EXCLUSIVEMENT un objet JSON avec cette structure :
    {
      "bestChoice": { "name": "Nom", "reason": "Explication courte", "matchPercentage": 95 },
      "alternatives": [ { "name": "Nom1", "price": "Prix1" }, { "name": "Nom2", "price": "Prix2" } ]
    }
    Interdiction de mettre du texte avant ou après le JSON.`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
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
