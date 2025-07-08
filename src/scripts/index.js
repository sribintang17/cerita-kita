import '../styles/styles.css';
import router from './routes/routes.js';
import { dbHelper } from './utils/db.js';
import './scripts/utils/sw-register.js';
import './scripts/utils/notification.js';


// Initialize app
window.addEventListener('DOMContentLoaded', async () => {
  await initializeApp();
  router();
});

async function initializeApp() {
  try {
    // Initialize IndexedDB
    await dbHelper.init();
    console.log('Database initialized');

    // Initialize Service Worker and Push Notifications
    if ('serviceWorker' in navigator) {
      await registerServiceWorker();
      await setupPushNotifications();
    }

    // Setup install prompt
    setupInstallPrompt();

    // Setup offline indicator
    setupOfflineIndicator();

    // Clean expired cache
    await dbHelper.clearExpiredCache();
    
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
}

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Show update notification
          showUpdateNotification();
        }
      });
    });

  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
}

async function setupPushNotifications() {
  try {
    await notificationHelper.init();
    
    // Auto-request permission if not already granted
    if (notificationHelper.getPermissionStatus() === 'default') {
      const granted = await notificationHelper.requestPermission();
      if (granted) {
        await notificationHelper.subscribe();
      }
    } else if (notificationHelper.getPermissionStatus() === 'granted') {
      await notificationHelper.subscribe();
    }
    
  } catch (error) {
    console.error('Push notification setup failed:', error);
  }
}

function setupInstallPrompt() {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    showInstallButton(deferredPrompt);
  });

  window.addEventListener('appinstalled', () => {
    console.log('App installed successfully');
    hideInstallButton();
    
    // Track install event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'app_install', {
        'event_category': 'PWA',
        'event_label': 'installed'
      });
    }
  });
}

function showInstallButton(deferredPrompt) {
  // Create install button
  const installButton = document.createElement('button');
  installButton.textContent = 'Install App';
  installButton.classList.add('install-button');
  installButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2196f3;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 24px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    transition: all 0.3s ease;
  `;

  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.choiceResult;
      
      if (result.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      deferredPrompt = null;
      installButton.remove();
    }
  });

  document.body.appendChild(installButton);
}

function hideInstallButton() {
  const installButton = document.querySelector('.install-button');
  if (installButton) {
    installButton.remove();
  }
}

function setupOfflineIndicator() {
  const offlineIndicator = document.createElement('div');
  offlineIndicator.id = 'offline-indicator';
  offlineIndicator.textContent = 'Mode Offline';
  offlineIndicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #f44336;
    color: white;
    text-align: center;
    padding: 8px;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: 9999;
    font-size: 14px;
  `;

  document.body.appendChild(offlineIndicator);

  function updateOnlineStatus() {
    if (navigator.onLine) {
      offlineIndicator.style.transform = 'translateY(-100%)';
    } else {
      offlineIndicator.style.transform = 'translateY(0)';
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Initial check
  updateOnlineStatus();
}

function showUpdateNotification() {
  const updateBanner = document.createElement('div');
  updateBanner.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; right: 0; background: #4caf50; color: white; padding: 12px; text-align: center; z-index: 9999;">
      <span>Update tersedia! </span>
      <button onclick="location.reload()" style="background: none; border: 1px solid white; color: white; padding: 4px 12px; border-radius: 4px; cursor: pointer; margin-left: 8px;">
        Perbarui
      </button>
      <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; margin-left: 8px; font-size: 18px;">
        ×
      </button>
    </div>
  `;
  
  document.body.appendChild(updateBanner);
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (updateBanner.parentElement) {
      updateBanner.remove();
    }
  }, 10000);
}

// SPA Navigation with View Transitions
document.addEventListener('click', (e) => {
  const target = e.target.closest('a');

  if (!target) return;

  if (target.classList.contains('skip-link')) return;

  if (
    target.href.startsWith(window.location.origin) &&
    target.hash &&
    target.hash !== window.location.hash
  ) {e.preventDefault();
   
   // Use View Transitions API if supported
   if ('startViewTransition' in document) {
     document.startViewTransition(() => {
       window.location.hash = target.hash;
       router();
     });
   } else {
     window.location.hash = target.hash;
     router();
   }
 }
});

// Handle back/forward navigation
window.addEventListener('popstate', () => {
 if ('startViewTransition' in document) {
   document.startViewTransition(() => {
     router();
   });
 } else {
   router();
 }
});

// Handle app visibility changes
document.addEventListener('visibilitychange', () => {
 if (document.visibilityState === 'visible') {
   // App became visible, sync data if needed
   syncAppData();
 }
});

async function syncAppData() {
 try {
   if (navigator.onLine) {
     // Sync any pending data
     await dbHelper.syncPendingData();
     console.log('Data synced successfully');
   }
 } catch (error) {
   console.error('Data sync failed:', error);
 }
}

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
 console.error('Unhandled promise rejection:', event.reason);
 
 // Log error to analytics if available
 if (typeof gtag !== 'undefined') {
   gtag('event', 'exception', {
     'description': event.reason?.message || 'Unhandled promise rejection',
     'fatal': false
   });
 }
 
 // Prevent default browser behavior
 event.preventDefault();
});

// Handle errors
window.addEventListener('error', (event) => {
 console.error('Global error:', event.error);
 
 // Log error to analytics if available
 if (typeof gtag !== 'undefined') {
   gtag('event', 'exception', {
     'description': event.error?.message || 'Global error',
     'fatal': false
   });
 }
});

// Performance monitoring
if ('performance' in window) {
 window.addEventListener('load', () => {
   setTimeout(() => {
     const perfData = performance.getEntriesByType('navigation')[0];
     
     if (perfData && typeof gtag !== 'undefined') {
       gtag('event', 'timing_complete', {
         'name': 'load_time',
         'value': Math.round(perfData.loadEventEnd - perfData.loadEventStart)
       });
     }
   }, 0);
 });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
 module.exports = {
   initializeApp,
   registerServiceWorker,
   setupPushNotifications,
   setupInstallPrompt,
   setupOfflineIndicator,
   showUpdateNotification,
   syncAppData
 };
}