/**
 * MinSp Keyboard Recommendation Engine - ALGORITHMIC VERSION
 * Uses scoring system (not AI) to find best keyboard matches
 */
(function() {
  'use strict';

  // DOM Elements
  const form = document.getElementById('ai-form');
  const formSection = document.getElementById('ai-form-section');
  const resultSection = document.getElementById('ai-result-section');
  const resultContent = document.getElementById('ai-result-content');
  const resetBtn = document.getElementById('ai-reset-btn');
  const progressFill = document.getElementById('ai-progress-fill');
  const progressText = document.getElementById('ai-progress-text');
  const submitBtn = document.getElementById('ai-submit-btn');

  // Progress bar update
  function updateProgress() {
    const requiredFields = form.querySelectorAll('[required]');
    let filledCount = 0;
    requiredFields.forEach(field => {
      if (field.value && field.value !== '') {
        filledCount++;
      }
    });
    const progress = Math.round((filledCount / requiredFields.length) * 100);
    if (progressFill) progressFill.style.width = progress + '%';
    if (progressText) progressText.textContent = progress + '% completed';
  }

  // Add event listeners for progress tracking
  if (form) {
    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);
  }

  // Build keyboards data from the database
  function buildKeyboardsData() {
    var data = [];
    
    if (typeof keyboardGroups !== 'undefined') {
      keyboardGroups.forEach(function(group) {
        if (group.items && Array.isArray(group.items)) {
          group.items.forEach(function(itemName) {
            var entry = (typeof keyboardEntries !== 'undefined' && keyboardEntries[itemName]) ? keyboardEntries[itemName] : null;
            
            var keyboard = {
              name: itemName,
              brand: group.brand,
              segment: group.segment,
              price: extractPrice(entry),
              specs: extractSpecs(entry),
              entry: entry
            };
            data.push(keyboard);
          });
        }
      });
    }
    
    return data;
  }

  // Extract price from keyboard entry
  function extractPrice(entry) {
    if (!entry || !entry.specs) return 0;
    var priceSpec = entry.specs.find(function(s) { 
      return s.label.toLowerCase().includes('price') || s.label.toLowerCase().includes('prix'); 
    });
    if (priceSpec) {
      var match = priceSpec.value.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    }
    return 0;
  }

  // Extract specs from keyboard entry
  function extractSpecs(entry) {
    if (!entry || !entry.specs) return {};
    var specs = {};
    entry.specs.forEach(function(spec) {
      var label = spec.label.toLowerCase();
      if (label.includes('switch')) specs.switch = spec.value.toLowerCase();
      if (label.includes('format') || label.includes('size')) specs.size = spec.value.toLowerCase();
      if (label.includes('connect')) specs.connection = spec.value.toLowerCase();
      if (label.includes('rgb')) specs.rgb = spec.value.toLowerCase();
      if (label.includes('hot') && label.includes('swap')) specs.hotSwap = spec.value.toLowerCase();
    });
    return specs;
  }

  // SCORING ALGORITHM - Calculate match score for a keyboard
  function calculateScore(keyboard, preferences) {
    let score = 0;
    let maxScore = 0;
    let reasons = [];

    // Budget match (40 points max)
    maxScore += 40;
    const budget = parseInt(preferences.budget) || 200;
    const price = keyboard.price || 0;
    
    if (price > 0 && price <= budget) {
      score += 40;
      reasons.push('Within budget ($' + price + ')');
    } else if (price > 0 && price <= budget * 1.15) {
      score += 25;
      reasons.push('Slightly over budget');
    } else if (price > 0 && price <= budget * 1.3) {
      score += 10;
    }

    // Usage type match (20 points max)
    maxScore += 20;
    const usage = preferences.usage;
    const specs = keyboard.specs || {};
    
    if (usage === 'gaming') {
      if (specs.switch && specs.switch.includes('linear')) {
        score += 15;
        reasons.push('Linear switches for gaming');
      }
      if (specs.rgb && specs.rgb.includes('yes')) {
        score += 5;
        reasons.push('RGB lighting');
      }
    } else if (usage === 'typing') {
      if (specs.switch && (specs.switch.includes('tactile') || specs.switch.includes('clicky'))) {
        score += 20;
        reasons.push('Tactile/Clicky switches for typing');
      }
    } else if (usage === 'programming') {
      if (specs.hotSwap && specs.hotSwap.includes('yes')) {
        score += 15;
        reasons.push('Hot-swap for customization');
      }
      score += 5;
    } else if (usage === 'mixed') {
      score += 15;
      reasons.push('Good for mixed usage');
    }

    // Switch preference match (20 points max)
    maxScore += 20;
    const switchPref = preferences.switch;
    if (!switchPref || switchPref === 'no-preference') {
      score += 20;
    } else if (specs.switch && specs.switch.includes(switchPref)) {
      score += 20;
      reasons.push('Preferred switch type (' + switchPref + ')');
    } else if (switchPref === 'silent' && specs.switch && specs.switch.includes('linear')) {
      score += 15;
      reasons.push('Silent (linear) switches');
    }

    // Size/Format match (10 points max)
    maxScore += 10;
    const sizePref = preferences.size;
    if (!sizePref || !specs.size) {
      score += 5;
    } else if (specs.size.includes(sizePref)) {
      score += 10;
      reasons.push('Preferred size (' + sizePref + ')');
    }

    // Connection type match (5 points max)
    maxScore += 5;
    const connPref = preferences.connection;
    if (!connPref || !specs.connection) {
      score += 5;
    } else if (specs.connection.includes(connPref) || specs.connection.includes('hybrid')) {
      score += 5;
      reasons.push('Preferred connection (' + connPref + ')');
    }

    // RGB preference (5 points max)
    maxScore += 5;
    const rgbPref = preferences.rgb;
    if (!rgbPref || rgbPref === 'no-preference') {
      score += 5;
    } else if (specs.rgb && specs.rgb.includes(rgbPref)) {
      score += 5;
      if (rgbPref === 'yes') reasons.push('Has RGB');
    }

    // Calculate percentage
    const percentage = Math.round((score / maxScore) * 100);
    
    return {
      score: score,
      maxScore: maxScore,
      percentage: percentage,
      reasons: reasons
    };
  }

  // Find best matches using algorithm
  function findBestMatches(preferences) {
    const keyboards = buildKeyboardsData();
    
    if (keyboards.length === 0) {
      return { best: null, alternatives: [], all: [] };
    }

    // Calculate scores for all keyboards
    const scoredKeyboards = keyboards.map(function(kb) {
      const scoring = calculateScore(kb, preferences);
      return {
        keyboard: kb,
        score: scoring.score,
        percentage: scoring.percentage,
        reasons: scoring.reasons
      };
    });

    // Sort by score (highest first)
    scoredKeyboards.sort(function(a, b) {
      return b.score - a.score;
    });

    return {
      best: scoredKeyboards[0],
      alternatives: scoredKeyboards.slice(1, 4),
      all: scoredKeyboards
    };
  }

  // Display recommendation results
  function displayResults(results) {
    if (!resultContent) return;
    
    if (!results.best) {
      resultContent.innerHTML = '<div class="ai-error">No keyboards found in database. Please try again later.</div>';
      return;
    }

    const best = results.best;
    const alternatives = results.alternatives || [];
    
    let html = '<div class="ai-result-main">';
    
    // Best choice
    html += '<div class="ai-result-best">';
    html += '<div class="ai-result-badge">Best Match (' + best.percentage + '%)</div>';
    html += '<h3>' + escapeHtml(best.keyboard.name) + '</h3>';
    html += '<div class="ai-result-brand">' + escapeHtml(best.keyboard.brand) + '</div>';
    if (best.keyboard.price > 0) {
      html += '<div class="ai-result-price">$' + best.keyboard.price + '</div>';
    }
    
    // Reasons
    if (best.reasons.length > 0) {
      html += '<div class="ai-result-reasons">';
      html += '<strong>Why this match:</strong><ul>';
      best.reasons.forEach(function(reason) {
        html += '<li>' + escapeHtml(reason) + '</li>';
      });
      html += '</ul></div>';
    }
    
    // Specs
    if (best.keyboard.entry && best.keyboard.entry.specs) {
      html += '<div class="ai-result-specs">';
      best.keyboard.entry.specs.slice(0, 4).forEach(function(spec) {
        html += '<span class="ai-spec">' + escapeHtml(spec.label) + ': ' + escapeHtml(spec.value) + '</span>';
      });
      html += '</div>';
    }
    
    html += '</div>';
    
    // Alternatives
    if (alternatives.length > 0) {
      html += '<div class="ai-result-alternatives">';
      html += '<h4>Alternative Options</h4>';
      html += '<div class="ai-alternatives-list">';
      alternatives.forEach(function(alt) {
        html += '<div class="ai-alternative-item">';
        html += '<div class="ai-alt-header">';
        html += '<span class="ai-alt-name">' + escapeHtml(alt.keyboard.name) + '</span>';
        html += '<span class="ai-alt-score">' + alt.percentage + '% match</span>';
        html += '</div>';
        if (alt.keyboard.price > 0) {
          html += '<span class="ai-alt-price">$' + alt.keyboard.price + '</span>';
        }
        html += '</div>';
      });
      html += '</div></div>';
    }
    
    html += '</div>';
    
    resultContent.innerHTML = html;
  }

  // Escape HTML
  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Form submission handler
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Show loading state
      if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'flex';
        submitBtn.disabled = true;
      }

      // Gather form data
      const formData = new FormData(form);
      const preferences = {
        budget: formData.get('budget'),
        usage: formData.get('usage'),
        switch: formData.get('switch'),
        size: formData.get('size'),
        connection: formData.get('connection'),
        rgb: formData.get('rgb')
      };

      // Simulate processing delay (for UX)
      setTimeout(function() {
        // Run algorithm
        const results = findBestMatches(preferences);
        
        // Hide form, show results
        if (formSection) formSection.style.display = 'none';
        if (resultSection) resultSection.style.display = 'block';
        
        displayResults(results);

        // Reset button state
        if (submitBtn) {
          const btnText = submitBtn.querySelector('.btn-text');
          const btnLoader = submitBtn.querySelector('.btn-loader');
          if (btnText) btnText.style.display = 'block';
          if (btnLoader) btnLoader.style.display = 'none';
          submitBtn.disabled = false;
        }

        // Scroll to results
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 800);
    });
  }

  // Reset button handler
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (form) form.reset();
      if (formSection) formSection.style.display = 'block';
      if (resultSection) resultSection.style.display = 'none';
      if (resultContent) resultContent.innerHTML = '';
      updateProgress();
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Initialize progress
  updateProgress();
})();
