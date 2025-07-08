import '../pages/home.js';
import '../pages/about.js';
import '../pages/login-page.js';
import '../pages/register.js';
import '../pages/tambah-cerita.js';
import '../pages/detail-cerita.js';
import '../pages/populer.js';
import '../pages/kategori.js';

const routes = {
  '/': () => '<home-page></home-page>',
  '/about': () => '<about-page></about-page>',
  '/masuk': () => '<login-page></login-page>',
  '/daftar': () => '<register-page></register-page>',
  '/tambah-cerita': () => '<tambah-cerita-page></tambah-cerita-page>',
  '/detail-cerita': () => '<detail-cerita></detail-cerita>',
  '/populer': () => '<populer-page></populer-page>',
  '/kategori': () => '<kategori-page></kategori-page>',
  '404': () => `
    <section style="text-align:center; padding: 3rem;">
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Ups! Halaman yang kamu tuju tidak tersedia.</p>
      <a href="#/" class="btn btn-primary">Kembali ke Beranda</a>
    </section>
  `,
};

// Fungsi router utama
const router = async () => {
  const hash = window.location.hash.slice(1);
  const path = hash.split('?')[0] || '/';
  const renderPage = routes[path] || routes['404'];

  const app = document.getElementById('app');
  if (!app) return;

  // Fungsi untuk update isi konten
  const updateContent = async () => {
    app.innerHTML = await renderPage();
    window.scrollTo(0, 0);
  };

  // Gunakan View Transition API jika tersedia
  if (document.startViewTransition) {
    document.startViewTransition(() => updateContent());
  } else {
    await updateContent();
  }
};

// Event router
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

export default router;
