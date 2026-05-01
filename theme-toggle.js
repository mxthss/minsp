(function () {
  var LIGHT = 'light';

  // Check system preference
  function prefersLight() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  // Apply theme based on system preference
  function applyTheme() {
    var html = document.documentElement;
    if (prefersLight()) {
      html.setAttribute('data-theme', LIGHT);
    } else {
      html.removeAttribute('data-theme');
    }
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    var mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', applyTheme);
    } else if (mediaQuery.addListener) {
      // Older browsers
      mediaQuery.addListener(applyTheme);
    }
  }

  // Apply theme immediately (before DOM ready to avoid flash)
  applyTheme();
})();
