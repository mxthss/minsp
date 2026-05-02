/**
 * MinSp PC Components Recommendation Engine - ALGORITHMIC VERSION
 * Uses scoring system (not AI) to find best component matches
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

  // Build components data from the database
  function buildComponentsData() {
    const components = [];
    
    if (typeof pcComponentGroups !== 'undefined') {
      pcComponentGroups.forEach(group => {
        if (group.items && Array.isArray(group.items)) {
          group.items.forEach(itemName => {
            const entry = (typeof pcComponentEntries !== 'undefined' && pcComponentEntries[itemName]) ? pcComponentEntries[itemName] : null;
            
            components.push({
              name: itemName,
              brand: group.brand,
              category: group.category || group.segment,
              price: extractPrice(entry),
              segment: group.segment,
              entry: entry
            });
          });
        }
      });
    }
    
    return components;
  }

  // Extract price from component entry
  function extractPrice(entry) {
    if (!entry || !entry.specs) return 0;
    const priceSpec = entry.specs.find(s => s.label.toLowerCase().includes('price') || s.label.toLowerCase().includes('prix'));
    if (priceSpec) {
      const match = priceSpec.value.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    }
    return 0;
  }

  // SCORING ALGORITHM - Calculate match score for a component
  function calculateScore(component, preferences) {
    let score = 0;
    let maxScore = 0;
    let reasons = [];

    // Budget match (50 points max)
    maxScore += 50;
    const budget = parseInt(preferences.budget) || 500;
    const price = component.price || 0;
    
    if (price > 0 && price <= budget) {
      score += 50;
      reasons.push('Within budget ($' + price + ')');
    } else if (price > 0 && price <= budget * 1.1) {
      score += 35;
      reasons.push('Slightly over budget (+10%)');
    } else if (price > 0 && price <= budget * 1.25) {
      score += 15;
    }

    // Component type match (30 points max)
    maxScore += 30;
    const typePref = preferences.componentType;
    if (!typePref || typePref === '') {
      score += 20;
    } else if (component.category && component.category.toLowerCase() === typePref.toLowerCase()) {
      score += 30;
      reasons.push('Exact category match (' + component.category + ')');
    } else if (component.category && component.category.toLowerCase().includes(typePref.toLowerCase())) {
      score += 20;
      reasons.push('Category match');
    }

    // Usage/Performance match (15 points max)
    maxScore += 15;
    const usage = preferences.usage;
    const performance = preferences.performance;
    
    if (usage === 'gaming') {
      if (component.category === 'gpu' || component.category === 'cpu') {
        score += 10;
        reasons.push('Good for gaming');
      }
      if (performance === 'high' && (component.category === 'gpu' || component.category === 'cpu')) {
        score += 5;
      }
    } else if (usage === 'workstation') {
      if (component.category === 'cpu' || component.category === 'ram') {
        score += 10;
        reasons.push('Good for workstation');
      }
    } else if (usage === 'budget') {
      if (price > 0 && price <= budget * 0.8) {
        score += 15;
        reasons.push('Great value for money');
      }
    } else {
      score += 10;
    }

    // Brand preference (5 points max)
    maxScore += 5;
    const brandPref = preferences.brand;
    if (!brandPref || brandPref === '') {
      score += 5;
    } else if (component.brand && component.brand.toLowerCase().includes(brandPref.toLowerCase())) {
      score += 5;
      reasons.push('Preferred brand (' + component.brand + ')');
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
    const components = buildComponentsData();
    
    if (components.length === 0) {
      return { best: null, alternatives: [], all: [] };
    }

    // Calculate scores for all components
    const scoredComponents = components.map(function(comp) {
      const scoring = calculateScore(comp, preferences);
      return {
        component: comp,
        score: scoring.score,
        percentage: scoring.percentage,
        reasons: scoring.reasons
      };
    });

    // Sort by score (highest first)
    scoredComponents.sort(function(a, b) {
      return b.score - a.score;
    });

    return {
      best: scoredComponents[0],
      alternatives: scoredComponents.slice(1, 4),
      all: scoredComponents
    };
  }

  // Display recommendation results
  function displayResults(results) {
    if (!resultContent) return;
    
    if (!results.best) {
      resultContent.innerHTML = '<div class="ai-error">No components found in database. Please try again later.</div>';
      return;
    }

    const best = results.best;
    const alternatives = results.alternatives || [];
    
    let html = '<div class="ai-result-main">';
    
    // Best choice
    html += '<div class="ai-result-best">';
    html += '<div class="ai-result-badge">Best Match (' + best.percentage + '%)</div>';
    html += '<h3>' + escapeHtml(best.component.name) + '</h3>';
    html += '<div class="ai-result-brand">' + escapeHtml(best.component.brand) + '</div>';
    html += '<div class="ai-result-category">' + escapeHtml(best.component.category) + '</div>';
    if (best.component.price > 0) {
      html += '<div class="ai-result-price">$' + best.component.price + '</div>';
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
    
    // Specs if available
    if (best.component.entry && best.component.entry.specs) {
      html += '<div class="ai-result-specs">';
      best.component.entry.specs.slice(0, 4).forEach(function(spec) {
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
        html += '<span class="ai-alt-name">' + escapeHtml(alt.component.name) + '</span>';
        html += '<span class="ai-alt-score">' + alt.percentage + '% match</span>';
        html += '</div>';
        if (alt.component.price > 0) {
          html += '<span class="ai-alt-price">$' + alt.component.price + '</span>';
        }
        html += '</div>';
      });
      html += '</div></div>';
    }
    
    html += '</div>';
    
    resultContent.innerHTML = html;
    
    // Show result section, hide form
    if (formSection) formSection.style.display = 'none';
    if (resultSection) {
      resultSection.style.display = 'block';
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      
      if (!submitBtn) return;
      
      // Show loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      if (btnText) btnText.style.display = 'none';
      if (btnLoader) btnLoader.style.display = 'inline-flex';
      submitBtn.disabled = true;
      
      // Get form data
      const preferences = {
        budget: document.getElementById('ai-budget')?.value || '500',
        usage: document.getElementById('ai-usage')?.value || 'gaming',
        componentType: document.getElementById('ai-component-type')?.value || '',
        performance: document.getElementById('ai-performance')?.value || 'balanced',
        brand: document.getElementById('ai-brand')?.value || ''
      };
      
      // Simulate processing delay (for UX)
      setTimeout(function() {
        // Run algorithm
        const results = findBestMatches(preferences);
        displayResults(results);
        
        // Reset button state
        if (btnText) btnText.style.display = 'inline';
        if (btnLoader) btnLoader.style.display = 'none';
        submitBtn.disabled = false;
      }, 800);
    });
  }

  // Reset button handler
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (form) form.reset();
      if (formSection) formSection.style.display = 'block';
      if (resultSection) resultSection.style.display = 'none';
      if (progressFill) progressFill.style.width = '0%';
      if (progressText) progressText.textContent = '0% completed';
      updateProgress();
    });
  }

  // Initialize progress
  updateProgress();
})();
