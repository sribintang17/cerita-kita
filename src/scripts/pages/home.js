import '../../styles/styles.css';
import HomePresenter from '../presenter/homePresenter.js';
import { getToken, removeToken } from '../data/auth-api.js';

const USER_NAME_KEY = 'storyapp_user_name';

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.stories = [];
  }

  connectedCallback() {
    this.render();
    this.renderAuthButtons();
    this.setupDrawer();
    HomePresenter.init({
      contentContainer: this.querySelector('#story-list'),
    });
    this.initializeMap();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  isLoggedIn() {
    return Boolean(getToken());
  }

  renderAuthButtons() {
    const container = this.querySelector('#auth-buttons');
    if (!container) return;

    if (this.isLoggedIn()) {
      const userName = localStorage.getItem(USER_NAME_KEY) || 'Pengguna';

      container.innerHTML = `
        <span class="user-greeting">
          <i class="fas fa-user-circle"></i> ${this.escapeHtml(userName)}
        </span>
        <a href="#/tambah-cerita" class="btn btn-primary btn-add-story" data-link>Tambah Cerita</a>
        <button type="button" class="btn btn-outline" id="logout-btn">Keluar</button>
      `;

      container.querySelector('#logout-btn').addEventListener('click', () => {
        this.handleLogout();
      });
    } else {
      container.innerHTML = `
        <a href="#/masuk" class="btn btn-outline" data-link>Masuk</a>
        <a href="#/daftar" class="btn btn-primary" data-link>Daftar</a>
      `;
    }
  }

  handleLogout() {
    const yakin = window.confirm('Apakah kamu yakin ingin keluar?');
    if (!yakin) return;

    removeToken();
    localStorage.removeItem(USER_NAME_KEY);

    this.renderAuthButtons();
    window.location.hash = '#/';
  }

  setupDrawer() {
    const toggle = this.querySelector('#drawer-toggle');
    const navLinks = this.querySelector('#nav-links');
    if (!toggle || !navLinks) return;

    const icon = toggle.querySelector('i');

    const setOpen = (open) => {
      navLinks.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      icon.className = open ? 'fas fa-times' : 'fas fa-bars';
    };

    toggle.addEventListener('click', () => {
      setOpen(!navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });
  }

  async initializeMap() {
    const mapContainer = this.querySelector('#map');

    if (mapContainer) {
      const map = L.map(mapContainer).setView([-2.5489, 118.0149], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      try {
        const stories = await HomePresenter.getStoriesWithLocation();

        if (!stories || !stories.length) {
          mapContainer.innerHTML = "<p style='text-align:center;'>Tidak ada data cerita dengan lokasi untuk ditampilkan.</p>";
          return;
        }

        stories.forEach(story => {
          if (story.lat && story.lon) {
            const marker = L.marker([story.lat, story.lon]).addTo(map);
            marker.bindPopup(`<strong>${story.name}</strong><br>${story.description || ''}`);
          }
        });

        setTimeout(() => {
          map.invalidateSize();
        }, 200);

      } catch (error) {
        console.error('Gagal memuat peta:', error);
        mapContainer.innerHTML = "<p style='text-align:center; color:red;'>Terjadi kesalahan memuat peta.</p>";
      }
    }
  }

  render() {
    this.innerHTML = `
      <header>
        <div class="container">
          <div class="header-content">
            <a href="#/" class="logo" data-link>
              <i class="fas fa-book-open"></i> Cerita Kita
            </a>
            <nav class="nav-links" id="nav-links">
              <a href="#/" data-link>Beranda</a>
              <a href="#/kategori" data-link>Kategori</a>
              <a href="#/populer" data-link>Populer</a>
              <a href="#/about" data-link>Tentang</a>
            </nav>
            <div class="header-actions">
              <div class="auth-buttons" id="auth-buttons"></div>
              <button
                type="button"
                class="drawer-toggle"
                id="drawer-toggle"
                aria-label="Buka menu"
                aria-expanded="false"
                aria-controls="nav-links"
              >
                <i class="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section class="hero" id="main-content">
        <div class="container">
          <h1>Bagikan Kisah Inspiratifmu</h1>
          <p>Berbagi pengalaman, kenangan, dan cerita inspiratif dengan pembaca di seluruh Indonesia melalui platform Cerita Kita.</p>
          <a href="#/tambah-cerita" class="btn btn-primary" data-link>Mulai Menulis</a>
        </div>
      </section>

      <section class="container">
        <h2 class="section-title">Peta Cerita</h2>
        <div id="map" style="height: 400px; border-radius: 12px; margin-bottom: 40px;">
          <p style="text-align:center;">Memuat peta...</p>
        </div>
      </section>

      <section class="container">
        <h2 class="section-title">Cerita Terbaru</h2>
        <div id="story-list" class="features">
          <p style="text-align:center;">Memuat cerita...</p>
        </div>
      </section>

      <section class="container">
        <div class="cta">
          <h2>Tulis Ceritamu Sekarang</h2>
          <p>Jadilah bagian dari komunitas penulis Indonesia dan bagikan pengalamanmu untuk menginspirasi orang lain.</p>
          <a href="#/tambah-cerita" class="btn btn-primary" data-link>Tambah Cerita</a>
        </div>
      </section>

      <footer>
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>Cerita Kita</h3>
              <p>Platform berbagi cerita dan pengalaman inspiratif untuk seluruh masyarakat Indonesia.</p>
              <div class="social-links">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
              </div>
            </div>
            <div class="footer-section">
              <h3>Tautan</h3>
              <ul class="footer-links">
                <li><a href="#/" data-link>Beranda</a></li>
                <li><a href="#/kategori" data-link>Kategori</a></li>
                <li><a href="#/populer" data-link>Cerita Populer</a></li>
                <li><a href="#/about" data-link>Tentang Kami</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h3>Kategori</h3>
              <ul class="footer-links">
                <li><a href="#/kategori/petualangan" data-link>Petualangan</a></li>
                <li><a href="#/kategori/inspiratif" data-link>Inspiratif</a></li>
                <li><a href="#/kategori/motivasi" data-link>Motivasi</a></li>
                <li><a href="#/kategori/kehidupan" data-link>Kehidupan</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h3>Kontak</h3>
              <ul class="footer-links">
                <li><a href="#/bantuan" data-link>Bantuan</a></li>
                <li><a href="#/kebijakan-privasi" data-link>Kebijakan Privasi</a></li>
                <li><a href="#/syarat-ketentuan" data-link>Syarat dan Ketentuan</a></li>
                <li><a href="#/kontak" data-link>Hubungi Kami</a></li>
              </ul>
            </div>
          </div>
          <div class="copyright">
            <p>&copy; 2025 Cerita Kita. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

if (!customElements.get('home-page')) {
  customElements.define('home-page', HomePage);
}

export default HomePage;