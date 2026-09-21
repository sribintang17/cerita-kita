const NotificationHelper = {
  async showNotification(title, options = {}) {
    if (!('Notification' in window)) {
      console.log('Browser tidak mendukung notifikasi');
      return;
    }

    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker tidak didukung browser');
      return;
    }

    if (Notification.permission === 'granted') {
      try {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(title, options);
      } catch (error) {
        console.error('Gagal menampilkan notifikasi:', error);
      }
    } else {
      console.log('Izin notifikasi belum diberikan');
    }
  },

  async requestPermission() {
    if (!('Notification' in window)) {
      console.log('Browser tidak mendukung notifikasi');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Izin notifikasi diberikan');
      } else {
        console.log('Izin notifikasi ditolak');
      }
    } catch (error) {
      console.error('Gagal meminta izin notifikasi:', error);
    }
  },
};

export default NotificationHelper;
