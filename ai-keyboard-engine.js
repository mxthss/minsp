/**
 * MinSp AI Keyboard Recommendation Engine
 * Handles form submission, keyboard matching logic, and results display
 */
(function() {
  'use strict';

  // Sample keyboard database (in production, this would come from an API)
  const KEYBOARD_DATA = [
    { name: 'Keychron K2', brand: 'Keychron', price: 89, switch: 'tactile', size: '75', connection: 'wireless', rgb: 'yes', hotSwap: true },
    { name: 'Keychron K8', brand: 'Keychron', price: 99, switch: 'linear', size: 'tkl', connection: 'wireless', rgb: 'yes', hotSwap: true },
    { name: 'Logitech G Pro X', brand: 'Logitech', price: 149, switch: 'clicky', size: 'tkl', connection: 'wired', rgb: 'yes', hotSwap: false },
    { name: 'Razer BlackWidow V4', brand: 'Razer', price: 179, switch: 'clicky', size: 'full', connection: 'wired', rgb: 'yes', hotSwap: false },
    { name: 'Corsair K70 RGB', brand: 'Corsair', price: 169, switch: 'linear', size: 'full', connection: 'wired', rgb: 'yes', hotSwap: false },
    { name: 'Anne Pro 2', brand: 'Anne Pro', price: 79, switch: 'linear', size: '60', connection: 'wireless', rgb: 'yes', hotSwap: false },
    { name: 'Glorious GMMK Pro', brand: 'Glorious', price: 349, switch: 'tactile', size: '75', connection: 'wired', rgb: 'yes', hotSwap: true },
    { name: 'Drop CTRL', brand: 'Drop', price: 249, switch: 'linear', size: 'tkl', connection: 'wired', rgb: 'yes', hotSwap: true },
    { name: 'Keychron Q1', brand: 'Keychron', price: 179, switch: 'tactile', size: '75', connection: 'wired', rgb: 'no', hotSwap: true },
    { name: 'SteelSeries Apex Pro', brand: 'SteelSeries', price: 199, switch: 'linear', size: 'full', connection: 'wired', rgb: 'yes', hotSwap: false }
  ];

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

  // Calculate match score for a keyboard
  function calculateMatchScore(keyboard, preferences) {
    let score = 0;
    let maxScore = 0;

    // Budget match (40% weight)
    maxScore += 40;
    const budget = parseInt(preferences.budget) || 200;
    if (keyboard.price <= budget) {
      score += 40;
    } else if (keyboard.price <= budget * 1.2) {
      score += 25;
    } else if (keyboard.price <= budget * 1.5) {
      score += 10;
    }

    // Usage type match (20% weight)
    maxScore += 20;
    const usage = preferences.usage;
    if (usage === 'gaming' && (keyboard.switch === 'linear' || keyboard.rgb === 'yes')) {
      score += 20;
    } else if (usage === 'typing' && (keyboard.switch === 'tactile' || keyboard.switch === 'clicky')) {
      score += 20;
    } else if (usage === 'mixed') {
      score += 15;
    } else if (usage === 'programming' && keyboard.hotSwap) {
      score += 20;
    }

    // Switch preference match (20% weight)
    maxScore += 20;
    const switchPref = preferences.switch;
    if (switchPref === 'no-preference') {
      score += 20;
    } else if (keyboard.switch === switchPref) {
      score += 20;
    } else if (switchPref === 'silent' && keyboard.switch === 'linear') {
      score += 15;
    }

    // Size match (10% weight)
    maxScore += 10;
    const size = preferences.size;
    if (size && keyboard.size === size) {
      score += 10;
    }

    // Connection type match (5% weight)
    maxScore += 5;
    const connection = preferences.connection;
    if (!connection || keyboard.connection === connection || keyboard.connection === 'hybrid') {
      score += 5;
    }

    // RGB preference (5% weight)
    maxScore += 5;
    const rgb = preferences.rgb;
    if (!rgb || rgb === 'no-preference') {
      score += 5;
    } else if (keyboard.rgb === rgb) {
      score += 5;
    }

    return Math.round((score / maxScore) * 100);
  }

  // Find best matching keyboard
  function findBestMatch(preferences) {
    let bestMatch = null;
    let bestScore = 0;

    KEYBOARD_DATA.forEach(keyboard => {
      const score = calculateMatchScore(keyboard, preferences);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = keyboard;
      }
    });

    return { keyboard: bestMatch, score: bestScore };
  }

  // Display result
  function displayResult(result) {
    if (!resultContent || !result.keyboard) return;

    const kb = result.keyboard;
    const html = `
      <div class="ai-result-item">
        <div class="ai-result-header">
          <h3>${escapeHtml(kb.name)}</h3>
          <span class="ai-match-badge">${result.score}% Match</span>
        </div>
        <div class="ai-result-brand">${escapeHtml(kb.brand)}</div>
        <div class="ai-result-price">$${kb.price}</div>
        <div class="ai-result-specs">
          <span class="ai-spec">Switch: ${escapeHtml(kb.switch)}</span>
          <span class="ai-spec">Size: ${escapeHtml(kb.size)}</span>
          <span class="ai-spec">Connection: ${escapeHtml(kb.connection)}</span>
          <span class="ai-spec">RGB: ${kb.rgb === 'yes' ? 'Yes' : 'No'}</span>
          <span class="ai-spec">Hot-swap: ${kb.hotSwap ? 'Yes' : 'No'}</span>
        </div>
      </div>
    `;

    resultContent.innerHTML = html;
  }

  // Escape HTML to prevent XSS
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

      // Simulate AI processing delay
      setTimeout(() => {
        const result = findBestMatch(preferences);

        // Hide form, show results
        if (formSection) formSection.style.display = 'none';
        if (resultSection) resultSection.style.display = 'block';

        displayResult(result);

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
      }, 1500);
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
