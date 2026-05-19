// Initialize Vercel Speed Insights
// This script injects the Speed Insights tracking code into the page
(function() {
  'use strict';
  
  // Initialize the queue for Speed Insights
  if (!window.si) {
    window.si = function() {
      window.siq = window.siq || [];
      window.siq.push(arguments);
    };
  }
  
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  
  // Don't inject in development mode (when running locally)
  var isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
  
  // Configuration
  var config = {
    sdkn: '@vercel/speed-insights',
    sdkv: '2.0.0'
  };
  
  // Determine script source based on environment
  var scriptSrc = isDevelopment 
    ? 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js'
    : '/_vercel/speed-insights/script.js';
  
  // Check if script is already loaded
  if (document.head.querySelector('script[src*="speed-insights"]')) {
    return;
  }
  
  // Create and inject the script
  var script = document.createElement('script');
  script.src = scriptSrc;
  script.defer = true;
  
  // Add data attributes
  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      script.dataset[key] = config[key];
    }
  }
  
  script.onerror = function() {
    console.log('[Vercel Speed Insights] Failed to load script from ' + scriptSrc + '. Please check if any content blockers are enabled and try again.');
  };
  
  document.head.appendChild(script);
})();
