// MinSp Engine v2.0 - Système de recommandation propriétaire
// Utilise les données globales (window.MOUSE_DATA, KEYBOARD_DATA, PC_COMPONENT_DATA)
// Plus de base de données interne : une seule source de vérité

/**
 * Extrait un poids en grammes depuis une chaîne (ex: "63 g", "moins de 63 g", "89 g")
 */
function extractWeightGrams(weightStr) {
  if (!weightStr || typeof weightStr !== 'string') return null;
  var match = weightStr.match(/(\d+(?:[.,]\d+)?)/);
  return match ? parseFloat(match[1].replace(',', '.')) : null;
}

/**
 * Extrait un DPI max depuis une chaîne (ex: "100 - 25 600", "25600", "8 000")
 */
function extractDpiMax(dpiStr) {
  if (!dpiStr || typeof dpiStr !== 'string') return null;
  var numbers = dpiStr.replace(/\s/g, '').match(/(\d+)/g);
  if (!numbers || numbers.length === 0) return null;
  return Math.max.apply(null, numbers.map(Number));
}

/**
 * Extrait un polling rate en Hz depuis une chaîne (ex: "1000 Hz", "8000")
 */
function extractPollingHz(pollingStr) {
  if (!pollingStr || typeof pollingStr !== 'string') return null;
  var match = pollingStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Détermine si le produit est sans fil à partir de typeValue ou specMap.Type
 */
function isWirelessProduct(product) {
  var typeValue = product.typeValue || '';
  var specType = (product.specMap && product.specMap.Type) || '';
  var combined = (typeValue + ' ' + specType).toLowerCase();
  return /sans.?fil|wireless|lightspeed|bluetooth|2\.4\s*ghz|logi.?bolt|rf/i.test(combined);
}

/**
 * Classe le poids en catégorie
 */
function weightCategory(weightG) {
  if (weightG === null) return 'unknown';
  if (weightG < 70) return 'ultralight';
  if (weightG < 85) return 'light';
  if (weightG <= 105) return 'medium';
  return 'heavy';
}

/**
 * Détermine le profil d'usage principal d'un produit à partir de segment / specMap
 */
function getUsageCategory(product) {
  var segment = (product.segment || '').toLowerCase();
  var name = (product.name || '').toLowerCase();
  var combined = segment + ' ' + name;

  if (/gaming|esport|fps|mmo|moba|competitive|g pro|g502|viper|deathadder|basilisk|superlight|model [od]|ec[123]|fk|za|xm[12]|scimitar|naga/i.test(combined)) {
    return 'gaming';
  }
  if (/bureautique|office|productivit|mx master|mx anywhere|signature|pebble|m[123]\d|m705|lift|vertical|ergo|triathlon/i.test(combined)) {
    return 'office';
  }
  return 'versatile';
}

/**
 * Charge dynamiquement les produits depuis les données globales
 * Fonctionne côté navigateur (window) et côté serveur (données passées en argument)
 */
function loadProductData(externalData) {
  if (Array.isArray(externalData) && externalData.length > 0) {
    return externalData;
  }
  if (typeof window !== 'undefined') {
    var mice = Array.isArray(window.MOUSE_DATA) ? window.MOUSE_DATA : [];
    var keyboards = Array.isArray(window.KEYBOARD_DATA) ? window.KEYBOARD_DATA : [];
    var pcComponents = Array.isArray(window.PC_COMPONENT_DATA) ? window.PC_COMPONENT_DATA : [];
    return mice.concat(keyboards).concat(pcComponents);
  }
  return [];
}

/**
 * Système de scoring dynamique MinSp Engine v2.0
 * S'adapte aux propriétés réellement présentes dans les données (specMap)
 */
function calculateMatch(userProfile, product) {
  var score = 0;
  var maxScore = 0;
  var details = [];

  var specMap = product.specMap || {};
  var weightG = extractWeightGrams(specMap.Poids);
  var dpiMax = extractDpiMax(specMap.DPI);
  var pollingHz = extractPollingHz(specMap['Polling Rate']);
  var wireless = isWirelessProduct(product);
  var usageCat = getUsageCategory(product);
  var shapeValue = (product.shapeValue || specMap.Forme || '').toLowerCase();
  var wCat = weightCategory(weightG);

  // 1. Usage / Segment matching (0-30 pts)
  maxScore += 30;
  var usage = (userProfile.usage || '').toLowerCase();
  if (usage.includes('gaming') || usage.includes('fps') || usage.includes('esport')) {
    if (usageCat === 'gaming') {
      score += 30;
      details.push('✅ Gaming: parfait pour compétition');
    } else if (usageCat === 'versatile') {
      score += 15;
      details.push('⚠️ Gaming: polyvalent, utilisable');
    } else {
      details.push('❌ Gaming: souris bureautique non adaptée');
    }
  } else if (usage.includes('bureau') || usage.includes('office') || usage.includes('travail')) {
    if (usageCat === 'office') {
      score += 30;
      details.push('✅ Bureautique: optimisée productivité');
    } else if (usageCat === 'versatile') {
      score += 20;
      details.push('✅ Bureautique: polyvalent, compatible');
    } else {
      score += 12;
      details.push('⚠️ Bureautique: gaming utilisable mais pas optimal');
    }
  } else if (usage.includes('mixte') || usage.includes('polyvalent')) {
    score += usageCat === 'versatile' ? 28 : usageCat === 'gaming' ? 22 : 20;
    details.push('✅ Mixte: adaptée aux deux usages');
  } else {
    score += 20;
    details.push('✅ Usage: compatible');
  }

  // 2. Wireless preference (0-15 pts)
  maxScore += 15;
  var wirelessPref = (userProfile.wireless || '').toLowerCase();
  if (wirelessPref === 'yes' || wirelessPref === 'oui' || wirelessPref === 'true') {
    if (wireless) {
      score += 15;
      details.push('✅ Sans fil: correspond à votre préférence');
    } else {
      details.push('❌ Sans fil: filaire non souhaité');
    }
  } else if (wirelessPref === 'no' || wirelessPref === 'non' || wirelessPref === 'false') {
    if (!wireless) {
      score += 15;
      details.push('✅ Filaire: correspond à votre préférence');
    } else {
      score += 5;
      details.push('⚠️ Sans fil: mais peut fonctionner en filaire');
    }
  } else {
    score += 10;
    details.push('✅ Connectivité: indifférent');
  }

  // 3. Shape / Grip matching (0-15 pts)
  maxScore += 15;
  var gripStyle = (userProfile.gripStyle || '').toLowerCase();
  if (gripStyle && gripStyle !== 'any') {
    if (gripStyle === 'palm' && shapeValue.includes('ergonomique')) {
      score += 15;
      details.push('✅ Prise palm: ergonomique idéale');
    } else if (gripStyle === 'claw' && (wCat === 'ultralight' || wCat === 'light')) {
      score += 15;
      details.push('✅ Prise claw: léger et réactif');
    } else if (gripStyle === 'fingertip' && (shapeValue.includes('symétrique') || wCat === 'ultralight')) {
      score += 15;
      details.push('✅ Prise fingertip: symétrique et léger');
    } else if (gripStyle === 'palm' && shapeValue.includes('symétrique')) {
      score += 8;
      details.push('⚠️ Prise palm: symétrique acceptable');
    } else if (gripStyle === 'claw') {
      score += 8;
      details.push('⚠️ Prise claw: compatible');
    } else {
      score += 4;
      details.push('⚠️ Prise: pas optimal pour ' + gripStyle);
    }
  } else {
    score += 10;
    details.push('✅ Prise: adaptable');
  }

  // 4. Weight matching (0-15 pts)
  maxScore += 15;
  var weightPref = (userProfile.weight || '').toLowerCase();
  if (weightPref && weightPref !== 'any') {
    var weightMatchMap = {
      'ultralight': ['ultralight'],
      'light': ['light', 'ultralight'],
      'medium': ['medium', 'light'],
      'heavy': ['heavy', 'medium']
    };
    if (weightMatchMap[weightPref] && weightMatchMap[weightPref].indexOf(wCat) !== -1) {
      score += 15;
      details.push('✅ Poids: ' + (specMap.Poids || wCat) + ' correspond');
    } else if (wCat !== 'unknown') {
      score += 5;
      details.push('⚠️ Poids: ' + (specMap.Poids || wCat) + ' vs ' + weightPref);
    } else {
      score += 5;
      details.push('⚠️ Poids: non spécifié');
    }
  } else {
    score += 10;
    details.push('✅ Poids: indifférent');
  }

  // 5. DPI / Precision matching (0-10 pts)
  maxScore += 10;
  var usageForDpi = (userProfile.usage || '').toLowerCase();
  if (dpiMax !== null) {
    if (usageForDpi.includes('fps') || usageForDpi.includes('esport')) {
      if (dpiMax >= 16000) {
        score += 10;
        details.push('✅ DPI: ' + specMap.DPI + ' (haute précision FPS)');
      } else if (dpiMax >= 8000) {
        score += 7;
        details.push('✅ DPI: ' + specMap.DPI + ' (suffisant pour FPS)');
      } else {
        score += 3;
        details.push('⚠️ DPI: ' + specMap.DPI + ' (bas pour FPS)');
      }
    } else if (usageForDpi.includes('design') || usageForDpi.includes('créatif')) {
      if (dpiMax >= 8000) {
        score += 10;
        details.push('✅ DPI: ' + specMap.DPI + ' (précision design)');
      } else {
        score += 5;
        details.push('⚠️ DPI: ' + specMap.DPI);
      }
    } else {
      score += 7;
      details.push('✅ DPI: ' + specMap.DPI);
    }
  } else {
    score += 5;
    details.push('✅ DPI: non spécifié');
  }

  // 6. Brand matching (0-10 pts)
  maxScore += 10;
  var brand = (userProfile.brand || '').toLowerCase();
  if (brand && brand !== 'any') {
    if (product.brand && product.brand.toLowerCase().includes(brand)) {
      score += 10;
      details.push('✅ Marque: ' + product.brand + ' préférée');
    } else {
      details.push('⚠️ Marque: ' + (product.brand || '?') + ' (préf: ' + brand + ')');
    }
  } else {
    score += 5;
    details.push('✅ Marque: indifférent');
  }

  // 7. Polling rate matching (0-5 pts)
  maxScore += 5;
  if (pollingHz !== null) {
    if (usageForDpi.includes('fps') || usageForDpi.includes('esport')) {
      if (pollingHz >= 4000) {
        score += 5;
        details.push('✅ Polling: ' + pollingHz + ' Hz (compétitif)');
      } else if (pollingHz >= 1000) {
        score += 4;
        details.push('✅ Polling: ' + pollingHz + ' Hz (standard gaming)');
      } else {
        score += 2;
        details.push('⚠️ Polling: ' + pollingHz + ' Hz (bas pour gaming)');
      }
    } else {
      score += 3;
      details.push('✅ Polling: ' + pollingHz + ' Hz');
    }
  } else {
    score += 3;
    details.push('✅ Polling: non spécifié');
  }

  var rawPercentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  var finalScore = Math.min(rawPercentage, 100);

  return {
    score: finalScore,
    details: details,
    matchLevel: finalScore >= 90 ? 'Excellent' :
                finalScore >= 75 ? 'Très bon' :
                finalScore >= 60 ? 'Bon' :
                finalScore >= 40 ? 'Moyen' : 'Faible'
  };
}

/**
 * Fonction principale du MinSp Engine v2.0
 * @param {Object} userProfile - Profil utilisateur
 * @param {Array} externalData - Données produits (optionnel, sinon utilise window global data)
 */
async function getMinSpRecommendation(userProfile, externalData) {
  await new Promise(function(resolve) { setTimeout(resolve, 800); });

  var allProducts = loadProductData(externalData);

  if (allProducts.length === 0) {
    return {
      bestChoice: null,
      alternatives: [],
      engine: 'MinSp Engine v2.0',
      analysisTime: '800ms',
      userProfile: userProfile,
      error: 'Aucune donnée produit disponible'
    };
  }

  var scoredProducts = allProducts.map(function(product) {
    var match = calculateMatch(userProfile, product);
    return {
      product: product,
      matchScore: match.score,
      matchDetails: match.details,
      matchLevel: match.matchLevel
    };
  });

  scoredProducts.sort(function(a, b) { return b.matchScore - a.matchScore; });

  var best = scoredProducts[0];
  if (!best) {
    return {
      bestChoice: null,
      alternatives: [],
      engine: 'MinSp Engine v2.0',
      analysisTime: '800ms',
      userProfile: userProfile,
      error: 'Aucun produit compatible trouvé'
    };
  }

  var bestProduct = best.product;
  var review = bestProduct.review || {};
  var buyReasons = review.buyReasons || [];

  var alternatives = scoredProducts.slice(1, 4).map(function(s) {
    return {
      name: s.product.name,
      brand: s.product.brand,
      matchScore: s.matchScore,
      matchLevel: s.matchLevel,
      image: s.product.image || '',
      typeValue: s.product.typeValue || '',
      shapeValue: s.product.shapeValue || ''
    };
  });

  return {
    bestChoice: {
      name: bestProduct.name,
      brand: bestProduct.brand,
      reason: best.matchDetails.slice(0, 3).join('. ') + ' (' + best.matchScore + '% compatibilité - ' + best.matchLevel + ')',
      matchPercentage: best.matchScore,
      matchLevel: best.matchLevel,
      details: best.matchDetails,
      image: bestProduct.image || '',
      segment: bestProduct.segment || '',
      typeValue: bestProduct.typeValue || '',
      shapeValue: bestProduct.shapeValue || '',
      wireless: isWirelessProduct(bestProduct),
      buyReasons: buyReasons,
      summary: bestProduct.summary || ''
    },
    alternatives: alternatives,
    engine: 'MinSp Engine v2.0',
    analysisTime: '800ms',
    userProfile: userProfile
  };
}

module.exports = {
  calculateMatch,
  getMinSpRecommendation
};
