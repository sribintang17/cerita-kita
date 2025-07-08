import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

class App {
  #content;
  #drawerButton;
  #navigationDrawer;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#navigationDrawer = navigationDrawer;
    this.#drawerButton = drawerButton;
    this.#content = content;

    this._setupDrawer();
  }

  _setupDrawer() {
    // Toggle drawer saat tombol drawer diklik
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    // Tutup drawer saat klik di luar drawer dan tombol drawer
    document.body.addEventListener('click', (event) => {
      const target = event.target;

      const isClickInsideDrawer = this.#navigationDrawer.contains(target);
      const isClickOnDrawerButton = this.#drawerButton.contains(target);
      const clickedAnchor = target.closest ? target.closest('a') : null;

      if (!isClickInsideDrawer && !isClickOnDrawerButton) {
        this.#navigationDrawer.classList.remove('open');
      }

      // Tutup drawer jika klik pada link navigasi (<a>)
      if (clickedAnchor) {
        this.#navigationDrawer.classList.remove('open');
      }
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url] || routes['/'];

    try {
      // Render halaman utama
      this.#content.innerHTML = await page.render();

      // Jalankan afterRender jika ada
      if (typeof page.afterRender === 'function') {
        await page.afterRender();
      }
    } catch (error) {
      console.error('Gagal render halaman:', error);
      this.#content.innerHTML = `
        <div class="container">
          <h2>Error</h2>
          <p>Halaman tidak dapat dimuat. Silakan coba lagi nanti.</p>
        </div>
      `;
    }

    // Scroll ke atas setelah halaman selesai dirender
    window.scrollTo(0, 0);
  }
}

export default App;
