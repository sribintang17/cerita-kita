import notificationHelper from './utils/notification-helper.js';
import '../styles/styles.css';
import router from './routes/routes.js';
import { dbHelper } from './utils/db.js';
import './utils/sw-register.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  router();
});

async function initializeApp() {
  try {
    await dbHelper.init();
    console.log('Database initialized');

    if ('serviceWorker' in navigator) {
      await registerServiceWorker();
    }

    setupPushNotifications();
    setupInstallPrompt();
    setupOfflineIndicator();

    if (dbHelper.clearExpiredCache) {
      await dbHelper.clearExpiredCache();
    }
  } catch (error) {
    console.error('App initialization failed:', error);
  }
}

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered with scope:', registration.scope);

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
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
    if (!('Notification' in window)) return;

    const permission = Notification.permission;
    if (permission === 'default') {
      const granted = await Notification.requestPermission();
      if (granted !== 'granted') {
        console.log('Notification permission denied.');
        return;
      }
    }

    await notificationHelper.subscribe();
  } catch (error) {
    console.error('Push notification setup failed:', error);
  }
}

function setupInstallPrompt() {
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    hideInstallButton();
    console.log('App installed successfully');
  });

  function showInstallButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Install App';
    btn.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      padding: 12px 20px;
      background: #2196f3;
      color: white;
      border: none;
      border-radius: 24px;
      cursor: pointer;
      z-index: 1000;
    `;

    btn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
      btn.remove();
    });

    document.body.appendChild(btn);
  }

  function hideInstallButton() {
    const btn = document.querySelector('button');
    if (btn) btn.remove();
  }
}

function setupOfflineIndicator() {
  const indicator = document.createElement('div');
  indicator.textContent = 'Kamu sedang offline';
  indicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #f44336;
    color: white;
    text-align: center;
    padding: 8px;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
  `;

  document.body.appendChild(indicator);

  function updateStatus() {
    if (navigator.onLine) {
      indicator.style.transform = 'translateY(-100%)';
    } else {
      indicator.style.transform = 'translateY(0)';
    }
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

function showUpdateNotification() {
  const bar = document.createElement('div');
  bar.innerHTML = `
    <div style="background: #4caf50; color: white; padding: 12px; text-align: center;">
      Update tersedia. <button id="refresh-btn" style="margin-left: 8px; padding: 6px 12px;">Refresh</button>
    </div>
  `;
  document.body.appendChild(bar);

  document.getElementById('refresh-btn').addEventListener('click', () => {
    location.reload();
  });
}

// SPA navigation with view transition fallback
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a');
  if (!anchor || anchor.classList.contains('skip-link') || anchor.target === '_blank') return;
  if (anchor.href.startsWith(location.origin)) {
    e.preventDefault();
    const url = new URL(anchor.href);
    location.hash = url.hash;
    router();
  }
});

window.addEventListener('popstate', () => {
  router();
});

// Handle unhandled errors and promise rejections
window.addEventListener('error', (e) => {
  console.error('Error captured:', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled rejection:', e.reason);
});
