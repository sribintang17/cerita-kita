import '../../styles/styles.css';
import HomePresenter from '../presenter/homePresenter.js';

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.stories = [];
  }

  connectedCallback() {
    this.render();
    HomePresenter.init({
      contentContainer: this.querySelector('#story-list'),
    });
    this.initializeMap();
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
            <nav class="nav-links">
              <a href="#/" data-link>Beranda</a>
              <a href="#/kategori" data-link>Kategori</a>
              <a href="#/populer" data-link>Populer</a>
              <a href="#/about" data-link>Tentang</a>
            </nav>
            <div class="auth-buttons">
              <a href="#/masuk" class="btn btn-outline" data-link>Masuk</a>
              <a href="#/tambah-cerita" class="btn btn-primary" data-link>Tambah Cerita</a>
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
