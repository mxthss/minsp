(function () {
  var STORAGE_KEY = 'minsp-theme';
  var DARK = 'dark';
  var LIGHT = 'light';

  function getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DARK;
    } catch (e) {
      return DARK;
    }
  }

  function setTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function applyTheme(theme) {
    var html = document.documentElement;
    if (theme === LIGHT) {
      html.setAttribute('data-theme', LIGHT);
    } else {
      html.removeAttribute('data-theme');
    }
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].textContent = theme === LIGHT ? '☀️' : '🌙';
      buttons[i].setAttribute('aria-label', theme === LIGHT ? 'Switch to dark theme' : 'Switch to light theme');
    }
  }

  function toggle() {
    var current = getTheme();
    var next = current === DARK ? LIGHT : DARK;
    setTheme(next);
    applyTheme(next);
  }

  // Apply saved theme immediately (before DOM ready to avoid flash)
  applyTheme(getTheme());

  // Bind click events once DOM is ready
  function bindButtons() {
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', toggle);
    }
    // Ensure button state matches current theme
    updateToggleButtons(getTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindButtons);
  } else {
    bindButtons();
  }
})();
