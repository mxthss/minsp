// MinSp Engine - Système de recommandation propriétaire
// Base de données de solutions (souris) avec scoring intelligent

const mouseDatabase = [
  {
    id: 'logitech-gpro-x',
    name: 'Logitech G Pro X Superlight',
    brand: 'Logitech',
    price: 149,
    category: 'gaming',
    weight: 'light',
    wireless: true,
    handSize: 'medium',
    gripStyle: ['claw', 'fingertip'],
    dpi: 25600,
    pollingRate: 1000,
    rgb: false,
    buttons: 5,
    description: 'Souris gaming ultra-légère sans fil pour e-sports.',
    actionPlan: 'Parfaite pour FPS compétitifs. Batterie 70h. Capteur HERO 25K.',
    whyForYou: 'Légèreté extrême + performance pro sans fil.',
    tags: ['fps', 'competitive', 'wireless', 'lightweight']
  },
  {
    id: 'razer-deathadder-v3',
    name: 'Razer DeathAdder V3 Pro',
    brand: 'Razer',
    price: 159,
    category: 'gaming',
    weight: 'medium',
    wireless: true,
    handSize: 'large',
    gripStyle: ['palm', 'claw'],
    dpi: 30000,
    pollingRate: 1000,
    description: 'Souris ergonomique sans fil pour gaming.',
    actionPlan: 'Confort maximal pour sessions longues. Capteur Focus Pro 30K.',
    whyForYou: 'Ergonomie premium + capteur ultra-précis.',
    tags: ['ergonomic', 'moba', 'wireless', 'palm-grip']
  },
  {
    id: 'logitech-g502',
    name: 'Logitech G502 HERO',
    brand: 'Logitech',
    price: 79,
    category: 'gaming',
    weight: 'heavy',
    wireless: false,
    handSize: 'large',
    gripStyle: ['palm'],
    dpi: 25600,
    pollingRate: 1000,
    description: 'Souris gaming filaire avec 11 boutons programmables.',
    actionPlan: 'MMO/MOBA avec macros. Poids ajustable.',
    whyForYou: 'Polyvalence extrême + personnalisation totale.',
    tags: ['mmo', 'moba', 'wired', 'heavy', 'many-buttons']
  },
  {
    id: 'steelseries-rival-3',
    name: 'SteelSeries Rival 3',
    brand: 'SteelSeries',
    price: 29,
    category: 'gaming',
    weight: 'light',
    wireless: false,
    handSize: 'small',
    gripStyle: ['claw', 'fingertip'],
    dpi: 8500,
    pollingRate: 1000,
    description: 'Souris gaming abordable et légère.',
    actionPlan: 'Entrée de gamme performante. Capteur TrueMove Core.',
    whyForYou: 'Rapport qualité/prix imbattable pour débuter.',
    tags: ['budget', 'fps', 'wired', 'starter']
  },
  {
    id: 'glorious-model-o',
    name: 'Glorious Model O',
    brand: 'Glorious',
    price: 59,
    category: 'gaming',
    weight: 'light',
    wireless: false,
    handSize: 'medium',
    gripStyle: ['palm', 'claw', 'fingertip'],
    dpi: 12000,
    pollingRate: 1000,
    description: 'Souris honeycomb ultra-légère pour gaming.',
    actionPlan: 'Design perforé pour ventilation. Câble paracorde.',
    whyForYou: 'Légèreté + style unique honeycomb.',
    tags: ['fps', 'lightweight', 'wired', 'rgb']
  },
  {
    id: 'logitech-mx-master-3s',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    price: 99,
    category: 'office',
    weight: 'heavy',
    wireless: true,
    handSize: 'large',
    gripStyle: ['palm'],
    dpi: 8000,
    pollingRate: 125,
    description: 'Souris bureautique premium pour productivité.',
    actionPlan: 'Scroll magnétique, boutons programmables, multi-device.',
    whyForYou: 'Productivité maximale + confort bureautique.',
    tags: ['office', 'productivity', 'wireless', 'ergonomic', 'professional']
  },
  {
    id: 'microsoft-sculpt',
    name: 'Microsoft Sculpt Ergonomic',
    brand: 'Microsoft',
    price: 59,
    category: 'office',
    weight: 'medium',
    wireless: true,
    handSize: 'medium',
    gripStyle: ['palm'],
    dpi: 1000,
    pollingRate: 125,
    description: 'Souris ergonomique en forme de galet.',
    actionPlan: 'Réduit la tension du poignet. Design vertical.',
    whyForYou: 'Confort ergonomique pour longues journées de travail.',
    tags: ['office', 'ergonomic', 'wireless', 'health', 'comfort']
  },
  {
    id: 'logitech-pebble',
    name: 'Logitech Pebble M350',
    brand: 'Logitech',
    price: 29,
    category: 'office',
    weight: 'light',
    wireless: true,
    handSize: 'small',
    gripStyle: ['claw', 'fingertip'],
    dpi: 1000,
    pollingRate: 125,
    description: 'Souris portable silencieuse et design.',
    actionPlan: 'Clics silencieux, forme plate pour transport.',
    whyForYou: 'Style minimaliste + portabilité maximale.',
    tags: ['office', 'portable', 'wireless', 'silent', 'travel']
  },
  {
    id: 'razer-viper-v2',
    name: 'Razer Viper V2 Pro',
    brand: 'Razer',
    price: 149,
    category: 'gaming',
    weight: 'light',
    wireless: true,
    handSize: 'medium',
    gripStyle: ['claw', 'fingertip'],
    dpi: 30000,
    pollingRate: 1000,
    description: 'Souris esports sans fil la plus légère.',
    actionPlan: '58g seulement. Capteur Focus Pro 30K. 80h batterie.',
    whyForYou: 'Performance extrême + légèreté record.',
    tags: ['fps', 'esports', 'wireless', 'ultralight', 'competitive']
  },
  {
    id: 'zowie-ec2-c',
    name: 'Zowie EC2-C',
    brand: 'Zowie',
    price: 69,
    category: 'gaming',
    weight: 'medium',
    wireless: false,
    handSize: 'medium',
    gripStyle: ['palm', 'claw'],
    dpi: 3200,
    pollingRate: 1000,
    description: 'Souris FPS professionnelle plug-and-play.',
    actionPlan: 'Aucun software nécessaire. Forme ergonomique pro.',
    whyForYou: 'Simplicité pro + forme éprouvée par les pros.',
    tags: ['fps', 'professional', 'wired', 'no-software', 'esports']
  },
  {
    id: 'logitech-g305',
    name: 'Logitech G305 Lightspeed',
    brand: 'Logitech',
    price: 49,
    category: 'gaming',
    weight: 'light',
    wireless: true,
    handSize: 'small',
    gripStyle: ['claw', 'fingertip'],
    dpi: 12000,
    pollingRate: 1000,
    description: 'Souris gaming sans fil abordable.',
    actionPlan: '250h batterie. Capteur HERO. Récepteur USB.',
    whyForYou: 'Sans fil accessible + autonomie record.',
    tags: ['budget', 'wireless', 'fps', 'long-battery']
  },
  {
    id: 'apple-magic-mouse',
    name: 'Apple Magic Mouse',
    brand: 'Apple',
    price: 79,
    category: 'office',
    weight: 'light',
    wireless: true,
    handSize: 'small',
    gripStyle: ['fingertip'],
    dpi: 1300,
    pollingRate: 125,
    description: 'Souris multi-touch design pour Mac.',
    actionPlan: 'Gestes tactiles, design minimaliste, intégration macOS.',
    whyForYou: 'Intégration parfaite avec écosystème Apple.',
    tags: ['office', 'mac', 'wireless', 'touch', 'design']
  }
];

// Système de scoring MinSp Engine
function calculateMatch(userProfile, mouse) {
  let score = 0;
  const maxScore = 100;
  const details = [];

  // 1. Budget matching (0-25 pts)
  const userBudget = parseInt(userProfile.budget) || 100;
  const priceDiff = userBudget - mouse.price;
  
  if (priceDiff >= 0) {
    // Dans le budget
    const budgetScore = Math.min(25, 15 + (priceDiff / userBudget) * 10);
    score += budgetScore;
    details.push(`✅ Budget: ${mouse.price}$ (dans limite ${userBudget}$)`);
  } else {
    // Hors budget
    const overBudget = Math.abs(priceDiff) / userBudget;
    if (overBudget <= 0.1) {
      score += 15; // 10% au-dessus toléré
      details.push(`⚠️ Budget: +10% (${mouse.price}$ vs ${userBudget}$)`);
    } else if (overBudget <= 0.2) {
      score += 8; // 20% au-dessus
      details.push(`⚠️ Budget: +20% (${mouse.price}$ vs ${userBudget}$)`);
    } else {
      details.push(`❌ Budget: trop cher (${mouse.price}$ vs ${userBudget}$)`);
    }
  }

  // 2. Usage/Category matching (0-30 pts)
  const usage = (userProfile.usage || '').toLowerCase();
  const isGaming = mouse.category === 'gaming';
  const isOffice = mouse.category === 'office';
  
  if (usage.includes('gaming') || usage.includes('fps') || usage.includes('esport')) {
    if (isGaming) {
      score += 30;
      details.push('✅ Gaming: parfait pour compétition');
    } else {
      details.push('❌ Gaming: souris bureautique non adaptée');
    }
  } else if (usage.includes('bureau') || usage.includes('office') || usage.includes('travail')) {
    if (isOffice) {
      score += 30;
      details.push('✅ Bureautique: optimisée productivité');
    } else {
      score += 15; // Gaming peut faire office
      details.push('⚠️ Bureautique: gaming utilisable');
    }
  } else if (usage.includes('mixte') || usage.includes('polyvalent')) {
    score += isGaming ? 25 : 20;
    details.push('✅ Mixte: adaptée aux deux usages');
  } else {
    score += 20; // Default
    details.push('✅ Usage: compatible');
  }

  // 3. Wireless preference (0-15 pts)
  const wirelessPref = (userProfile.wireless || '').toLowerCase();
  
  if (wirelessPref === 'yes' || wirelessPref === 'oui' || wirelessPref === 'true') {
    if (mouse.wireless) {
      score += 15;
      details.push('✅ Sans fil: correspond à votre préférence');
    } else {
      details.push('❌ Sans fil: filaire non souhaité');
    }
  } else if (wirelessPref === 'no' || wirelessPref === 'non' || wirelessPref === 'false') {
    if (!mouse.wireless) {
      score += 15;
      details.push('✅ Filaire: correspond à votre préférence');
    } else {
      score += 5; // Sans fil peut être utilisé filaire
      details.push('⚠️ Sans fil: mais fonctionne en filaire');
    }
  } else {
    // Pas de préférence
    score += 10;
    details.push('✅ Connectivité: indifférent');
  }

  // 4. Hand size matching (0-15 pts)
  const handSize = (userProfile.handSize || '').toLowerCase();
  
  if (handSize && handSize !== 'any') {
    if (mouse.handSize === handSize) {
      score += 15;
      details.push(`✅ Taille main: ${handSize} correspond`);
    } else if (
      (handSize === 'medium' && mouse.handSize === 'large') ||
      (handSize === 'small' && mouse.handSize === 'medium')
    ) {
      score += 8; // Taille proche
      details.push(`⚠️ Taille main: proche (${mouse.handSize})`);
    } else {
      details.push(`❌ Taille main: mismatch (${handSize} vs ${mouse.handSize})`);
    }
  } else {
    score += 10;
    details.push('✅ Taille: universelle');
  }

  // 5. Grip style matching (0-15 pts)
  const gripStyle = (userProfile.gripStyle || '').toLowerCase();
  
  if (gripStyle && gripStyle !== 'any') {
    if (mouse.gripStyle.includes(gripStyle)) {
      score += 15;
      details.push(`✅ Prise en main: ${gripStyle} supportée`);
    } else if (mouse.gripStyle.length >= 2) {
      score += 8; // Polyvalent
      details.push(`⚠️ Prise: ${gripStyle} possible mais pas optimal`);
    } else {
      details.push(`❌ Prise: ${gripStyle} non supportée`);
    }
  } else {
    score += 10;
    details.push('✅ Prise: adaptable');
  }

  // 6. Weight matching (0-10 pts)
  const weight = (userProfile.weight || '').toLowerCase();
  if (weight && weight !== 'any') {
    const mouseWeight = mouse.weight.toLowerCase();
    const weightMap = {
      'ultralight': ['ultralight'],
      'light': ['light', 'ultralight'],
      'medium': ['medium', 'light'],
      'heavy': ['heavy', 'medium']
    };
    
    if (weightMap[weight] && weightMap[weight].includes(mouseWeight)) {
      score += 10;
      details.push(`✅ Poids: ${mouse.weight} correspond`);
    } else {
      details.push(`⚠️ Poids: ${mouse.weight} vs ${weight}`);
    }
  } else {
    score += 5;
    details.push('✅ Poids: indifférent');
  }

  // 7. Brand matching (0-15 pts)
  const brand = (userProfile.brand || '').toLowerCase();
  if (brand && brand !== 'any') {
    if (mouse.brand.toLowerCase() === brand) {
      score += 15;
      details.push(`✅ Marque: ${mouse.brand} préférée`);
    } else {
      details.push(`⚠️ Marque: ${mouse.brand} (préf: ${brand})`);
    }
  } else {
    score += 5;
    details.push('✅ Marque: indifférent');
  }

  // 8. RGB matching (0-10 pts)
  const rgb = (userProfile.rgb || '').toLowerCase();
  if (rgb && rgb !== 'any') {
    const hasRgb = mouse.tags && mouse.tags.includes('rgb');
    if (rgb === 'yes' && hasRgb) {
      score += 10;
      details.push('✅ RGB: présent');
    } else if (rgb === 'no' && !hasRgb) {
      score += 10;
      details.push('✅ Sans RGB: design simple');
    } else {
      details.push(`⚠️ RGB: mismatch (préf: ${rgb})`);
    }
  } else {
    score += 5;
    details.push('✅ RGB: indifférent');
  }

  // 9. Buttons matching (0-10 pts)
  const buttons = parseInt(userProfile.buttons) || 0;
  if (buttons > 0) {
    if (mouse.buttons >= buttons) {
      score += 10;
      details.push(`✅ Boutons: ${mouse.buttons} ≥ ${buttons}`);
    } else if (mouse.buttons >= buttons - 2) {
      score += 5;
      details.push(`⚠️ Boutons: ${mouse.buttons} proche de ${buttons}`);
    } else {
      details.push(`❌ Boutons: ${mouse.buttons} < ${buttons}`);
    }
  } else {
    score += 5;
    details.push('✅ Boutons: indifférent');
  }

  // Normaliser le score
  const finalScore = Math.min(Math.round(score), 100);
  
  return {
    score: finalScore,
    details: details,
    matchLevel: finalScore >= 90 ? 'Excellent' : 
                finalScore >= 75 ? 'Très bon' : 
                finalScore >= 60 ? 'Bon' : 
                finalScore >= 40 ? 'Moyen' : 'Faible'
  };
}

// Fonction principale du MinSp Engine
async function getMinSpRecommendation(userProfile, miceData) {
  // Simuler un temps d'analyse (800ms)
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Calculer les scores pour toutes les souris
  const scoredMice = mouseDatabase.map(mouse => {
    const match = calculateMatch(userProfile, mouse);
    return {
      ...mouse,
      matchScore: match.score,
      matchDetails: match.details,
      matchLevel: match.matchLevel
    };
  });
  
  // Trier par score décroissant
  scoredMice.sort((a, b) => b.matchScore - a.matchScore);
  
  // Meilleur choix
  const bestChoice = scoredMice[0];
  
  // Alternatives (2ème et 3ème)
  const alternatives = scoredMice.slice(1, 3).map(m => ({
    name: m.name,
    price: `$${m.price}`,
    matchScore: m.matchScore,
    matchLevel: m.matchLevel
  }));
  
  return {
    bestChoice: {
      name: bestChoice.name,
      price: bestChoice.price,
      reason: `${bestChoice.whyForYou} (${bestChoice.matchScore}% compatibilité - ${bestChoice.matchLevel})`,
      matchPercentage: bestChoice.matchScore,
      matchLevel: bestChoice.matchLevel,
      actionPlan: bestChoice.actionPlan,
      details: bestChoice.matchDetails,
      brand: bestChoice.brand,
      category: bestChoice.category,
      wireless: bestChoice.wireless
    },
    alternatives: alternatives,
    engine: 'MinSp Engine v1.0',
    analysisTime: '800ms'
  };
}

module.exports = {
  mouseDatabase,
  calculateMatch,
  getMinSpRecommendation
};
