const VAPID_PUBLIC_KEY = 'BN7-r0Svv7CsTi18-OPYtJLVW0bfuZ1x1UtrygczKjNia8xNTy15hD6l5VbPgcKUOHJLrBhGEiYGFNsicCyaFcSw';

class NotificationHelper {
  constructor() {
    this.registration = null;
    this.subscription = null;
  }

  async init() {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service Worker not supported');
    }

    if (!('PushManager' in window)) {
      throw new Error('Push messaging not supported');
    }

    // Register service worker
    this.registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', this.registration);

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;
  }

  async requestPermission() {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      console.log('Notification permission granted');
      return true;
    } else if (permission === 'denied') {
      console.log('Notification permission denied');
      return false;
    } else {
      console.log('Notification permission default');
      return false;
    }
  }

  async subscribe() {
    if (!this.registration) {
      await this.init();
    }

    // Check if already subscribed
    this.subscription = await this.registration.pushManager.getSubscription();
    
    if (this.subscription) {
      console.log('Already subscribed to push notifications');
      return this.subscription;
    }

    // Subscribe to push notifications
    this.subscription = await this.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    console.log('Subscribed to push notifications:', this.subscription);
    
    // Send subscription to server
    await this.sendSubscriptionToServer(this.subscription);
    
    return this.subscription;
  }

  async unsubscribe() {
    if (!this.subscription) {
      this.subscription = await this.registration.pushManager.getSubscription();
    }

    if (this.subscription) {
      await this.subscription.unsubscribe();
      console.log('Unsubscribed from push notifications');
      this.subscription = null;
    }
  }

  async sendSubscriptionToServer(subscription) {
    try {
      // Kirim subscription ke API Dicoding
      const response = await fetch('https://story-api.dicoding.dev/v1/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription,
          action: 'subscribe'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }

      console.log('Subscription sent to server successfully');
    } catch (error) {
      console.error('Error sending subscription to server:', error);
    }
  }

  async isSubscribed() {
    if (!this.registration) {
      await this.init();
    }

    this.subscription = await this.registration.pushManager.getSubscription();
    return !!this.subscription;
  }

  async getSubscription() {
    if (!this.registration) {
      await this.init();
    }

    return await this.registration.pushManager.getSubscription();
  }

  // Helper method untuk convert VAPID key
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Show local notification
  showLocalNotification(title, options = {}) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return notification;
    }
  }

  // Check notification support
  static isSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
  }

  // Get notification permission status
  static getPermissionStatus() {
    if (!('Notification' in window)) {
      return 'not-supported';
    }
    return Notification.permission;
  }
}

// Export singleton instance
export const notificationHelper = new NotificationHelper();