export const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in this browser');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered with scope:', registration.scope);

    // Tambahkan update handler
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('Update tersedia, refresh untuk update.');
          // Optionally panggil showUpdateNotification();
        }
      });
    });

    await navigator.serviceWorker.ready;
    console.log('Service Worker is active and ready');

  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};
