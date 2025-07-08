import '../../styles/styles.css';

class PopulerPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        /* Populer Page Specific Styles */
        .page-header {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: var(--white);
          padding: 80px 0;
          text-align: center;
          border-radius: 0 0 30px 30px;
          margin-bottom: 60px;
        }
        
        .page-header h1 {
          font-size: 48px;
          margin-bottom: 20px;
          font-weight: 800;
        }
        
        .page-header p {
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }
        
        .popular-section {
          padding: 0 0 60px;
        }
        
        .popular-filters {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }
        
        .popular-filter {
          background: var(--white);
          color: var(--dark);
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border: 2px solid transparent;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .popular-filter:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .popular-filter.active {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: var(--white);
          border-color: var(--primary);
          box-shadow: 0 5px 15px rgba(255, 107, 157, 0.3);
        }
        
        .popular-stories {
          margin-bottom: 60px;
        }
        
        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 30px;
          text-align: center;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          border-radius: 2px;
        }
        
        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        
        .story-card {
          background: var(--white);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }
        
        .story-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .story-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: linear-gradient(135deg, var(--accent), var(--primary));
          color: var(--white);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 2px 10px rgba(255, 107, 157, 0.3);
        }
        
        .story-image {
          height: 220px;
          overflow: hidden;
          position: relative;
        }
        
        .story-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.2), rgba(136, 130, 187, 0.2));
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .story-card:hover .story-image::before {
          opacity: 1;
        }
        
        .story-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        
        .story-card:hover .story-image img {
          transform: scale(1.1);
        }
        
        .story-content {
          padding: 25px;
        }
        
        .story-content h3 {
          font-size: 22px;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 12px;
          line-height: 1.3;
          transition: color 0.3s;
        }
        
        .story-card:hover .story-content h3 {
          color: var(--accent);
        }
        
        .story-content p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .story-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
        
        .story-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .story-author img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--light);
        }
        
        .story-author span {
          font-weight: 600;
          color: var(--primary);
          font-size: 14px;
        }
        
        .story-stats {
          display: flex;
          gap: 15px;
        }
        
        .story-stat {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #666;
          font-size: 14px;
          font-weight: 500;
        }
        
        .story-stat i {
          color: var(--accent);
        }
        
        /* Featured Story Card */
        .story-card.featured {
          grid-column: span 2;
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.05) 0%, rgba(136, 130, 187, 0.05) 100%);
          border: 2px solid rgba(255, 107, 157, 0.1);
        }
        
        .story-card.featured .story-image {
          height: 280px;
        }
        
        .story-card.featured .story-content {
          padding: 35px;
        }
        
        .story-card.featured .story-content h3 {
          font-size: 28px;
        }
        
        .story-card.featured .story-content p {
          font-size: 18px;
          -webkit-line-clamp: 4;
        }
        
        /* Stats Section */
        .popular-stats {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: var(--white);
          padding: 50px 0;
          border-radius: 20px;
          margin: 60px 0;
          text-align: center;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .stat-item h4 {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 10px;
          color: var(--white);
        }
        
        .stat-item p {
          font-size: 16px;
          opacity: 0.9;
        }
        
        /* Drawer Styles */
        .drawer-toggle {
          display: none;
          background: var(--primary);
          color: var(--white);
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          font-size: 18px;
          cursor: pointer;
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1001;
        }
        
        .drawer {
          position: fixed;
          top: 0;
          right: -300px;
          width: 300px;
          height: 100vh;
          background: var(--white);
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          transition: right 0.3s;
          z-index: 1000;
          padding-top: 80px;
        }
        
        .drawer.open {
          right: 0;
        }
        
        .drawer ul {
          list-style: none;
          padding: 0;
        }
        
        .drawer li {
          border-bottom: 1px solid #eee;
        }
        
        .drawer a {
          display: block;
          padding: 15px 20px;
          text-decoration: none;
          color: var(--dark);
          font-weight: 500;
          transition: all 0.3s;
        }
        
        .drawer a:hover {
          background-color: var(--light);
          color: var(--primary);
          padding-left: 30px;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive Design */
        @media (max-width: 1200px) {
          .story-card.featured {
            grid-column: span 1;
          }
        }
        
        @media (max-width: 768px) {
          .nav-links,
          .auth-buttons {
            display: none;
          }
          
          .drawer-toggle {
            display: block;
          }
          
          .page-header h1 {
            font-size: 36px;
          }
          
          .page-header p {
            font-size: 16px;
          }
          
          .popular-filters {
            gap: 10px;
          }
          
          .popular-filter {
            padding: 10px 16px;
            font-size: 14px;
          }
          
          .stories-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .story-content {
            padding: 20px;
          }
          
          .story-content h3 {
            font-size: 20px;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .stat-item h4 {
            font-size: 28px;
          }
        }
        
        @media (max-width: 480px) {
          .page-header {
            padding: 60px 0;
          }
          
          .page-header h1 {
            font-size: 28px;
          }
          
          .popular-section {
            padding: 0 0 40px;
          }
          
          .story-image {
            height: 180px;
          }
          
          .story-content {
            padding: 15px;
          }
          
          .story-meta {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <!-- Header -->
      <header>
        <div class="container">
          <div class="header-content">
            <a href="#/" class="logo" data-link>
              <i class="fas fa-book-open"></i>
              Cerita Kita
            </a>
            <nav class="nav-links">
              <a href="#/" data-link>Beranda</a>
              <a href="#/kategori" data-link>Kategori</a>
              <a href="#/populer" class="active" data-link>Populer</a>
              <a href="#/about" data-link>Tentang</a>
            </nav>
            <div class="auth-buttons">
              <a href="#/masuk" class="btn btn-outline" data-link>Masuk</a>
              <a href="#/tambah-cerita" class="btn btn-primary" data-link>Tambah Cerita</a>
            </div>
          </div>
        </div>

        <button id="drawer-button" class="drawer-toggle">☰</button>
        <nav id="navigation-drawer" class="drawer">
          <ul>
            <li><a href="#/" data-link>Beranda</a></li>
            <li><a href="#/kategori" data-link>Kategori</a></li>
            <li><a href="#/populer" data-link>Populer</a></li>
            <li><a href="#/about" data-link>Tentang</a></li>
            <li><a href="#/masuk" data-link>Masuk</a></li>
            <li><a href="#/tambah-cerita" data-link>Tambah Cerita</a></li>
          </ul>
        </nav>
      </header>

      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1>Cerita Populer</h1>
          <p>Temukan cerita-cerita terbaik dan paling disukai oleh pembaca Cerita Kita</p>
        </div>
      </section>

      <!-- Popular Filters -->
      <section class="popular-section container">
        <div class="popular-filters">
          <div class="popular-filter active" data-filter="minggu">Minggu Ini</div>
          <div class="popular-filter" data-filter="bulan">Bulan Ini</div>
          <div class="popular-filter" data-filter="sepanjang">Sepanjang Masa</div>
          <div class="popular-filter" data-filter="baca">Paling Banyak Dibaca</div>
          <div class="popular-filter" data-filter="suka">Paling Banyak Disukai</div>
          <div class="popular-filter" data-filter="komentar">Paling Banyak Dikomentari</div>
        </div>

        <!-- Trending Stories -->
        <div class="popular-stories" data-section="trending">
          <h2 class="section-title">Cerita Trending</h2>
          <div class="stories-grid">
            <div class="story-card featured">
              <span class="story-badge">Trending #1</span>
              <div class="story-image">
                <img src="/images/bromo.jpg" alt="Perjalanan ke Bromo" onerror="this.src='https://via.placeholder.com/400x280/FF6B9D/FFFFFF?text=Bromo+Adventure'">
              </div>
              <div class="story-content">
                <h3>Perjalanan Spiritual di Puncak Bromo</h3>
                <p>Pengalaman mendaki Gunung Bromo di tengah malam dan menyaksikan matahari terbit yang mengubah hidupku selamanya. Perjalanan ini tidak hanya sekadar petualangan, tapi juga pencarian makna hidup yang sesungguhnya.</p>
                <div class="story-meta">
                  <div class="story-author">
                    <img src="/images/foto3.jpg" alt="Putri Maharani" onerror="this.src='https://via.placeholder.com/40x40/8882BB/FFFFFF?text=PM'">
                    <span>Putri Maharani</span>
                  </div>
                  <div class="story-stats">
                    <div class="story-stat">
                      <i class="fas fa-heart"></i>
                      <span>2.4k</span>
                    </div>
                    <div class="story-stat">
                      <i class="fas fa-comment"></i>
                      <span>512</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="story-card">
              <span class="story-badge">Trending #2</span>
              <div class="story-image">
                <img src="/images/warkop.jpg" alt="Warung Kopi" onerror="this.src='https://via.placeholder.com/400x220/8882BB/FFFFFF?text=Coffee+Philosophy'">
              </div>
              <div class="story-content">
                <h3>Filosofi dari Secangkir Kopi</h3>
                <p>Bagaimana sebuah warung kopi kecil di Jogja mengajarkanku arti kehidupan dan kesabaran dalam mengejar impian.</p>
                <div class="story-meta">
                  <div class="story-author">
                    <img src="/images/foto4.jpg" alt="Budi Santoso" onerror="this.src='https://via.placeholder.com/40x40/FF6B9D/FFFFFF?text=BS'">
                    <span>Budi Santoso</span>
                  </div>
                  <div class="story-stats">
                    <div class="story-stat">
                      <i class="fas fa-heart"></i>
                      <span>1.9k</span>
                    </div>
                    <div class="story-stat">
                      <i class="fas fa-comment"></i>
                      <span>347</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="story-card">
              <span class="story-badge">Trending #3</span>
              <div class="story-image">
                <img src="/images/sepeda.jpg" alt="Sepeda Tua" onerror="this.src='https://via.placeholder.com/400x220/FF9F40/FFFFFF?text=Old+Bicycle'">
              </div>
              <div class="story-content">
                <h3>Sepeda Tua dan Kenangan Masa Kecil</h3>
                <p>Cerita tentang sepeda tua peninggalan kakek yang membawaku kembali ke masa kecil penuh petualangan di desa.</p>
                <div class="story-meta">
                  <div class="story-author">
                    <img src="/images/foto5.jpg" alt="Agus Wibowo" onerror="this.src='https://via.placeholder.com/40x40/38B2AC/FFFFFF?text=AW'">
                    <span>Agus Wibowo</span>
                  </div>
                  <div class="story-stats">
                    <div class="story-stat">
                      <i class="fas fa-heart"></i>
                      <span>1.7k</span>
                    </div>
                    <div class="story-stat">
                      <i class="fas fa-comment"></i>
                      <span>298</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Most Liked Stories -->
        <div class="popular-stories" data-section="liked">
          <h2 class="section-title">Paling Banyak Disukai</h2>
          <div class="stories-grid">
            <div class="story-card">
              <div class="story-image">
                <img src="/images/pantai.jpg" alt="Pantai Tersembunyi" onerror="this.src='https://via.placeholder.com/400x220/38B2AC/FFFFFF?text=Hidden+Beach'">
              </div>
              <div class="story-content">
                <h3>Menemukan Pantai Tersembunyi di Bali Selatan</h3>
                <p>Pengalaman tak terlupakan menemukan pantai tersembunyi yang masih alami dan belum terjamah turis di pesisir selatan Pulau Bali.</p>
                <div class="story-meta">
                  <div class="story-author">
                    <img src="src/public/images/dewi-lestari.jpg" alt="Dewi Lestari" onerror="this.src='https://via.placeholder.com/40x40/FF6B9D/FFFFFF?text=DL'">
                    <span>Dewi Lestari</span>
                  </div>
                  <div class="story-stats">
                    <div class="story-stat">
                      <i class="fas fa-heart"></i>
                      <span>3.2k</span>
                    </div>
                    <div class="story-stat">
                      <i class="fas fa-comment"></i>
                      <span>235</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="story-card">
              <div class="story-image">
                <img src="/images/kuliner-lokal.jpg" alt="Kuliner Lokal" onerror="this.src='https://via.placeholder.com/400x220/FF9F40/FFFFFF?text=Local+Cuisine'">
              </div>
              <div class="story-content">
                <h3>7 Hari Menjelajahi Kuliner Tradisional Jawa</h3>
                <p>Petualangan kuliner mencicipi hidangan tradisional dari berbagai kota di Pulau Jawa dan cerita di balik setiap masakan.</p>
                <div class="story-meta">
                  <div class="story-author">
                    <img src="/images/rinto-harahap.jpg" alt="Rinto Harahap" onerror="this.src='https://via.placeholder.com/40x40/8882BB/FFFFFF?text=RH'">
                    <span>Rinto Harahap</span>
                  </div>
                  <div class="story-stats">
                    <div class="story-stat">
                      <i class="fas fa-heart"></i>
                      <span>2.8k</span>
                    </div>
                    <div class="story-stat">
                      <i class="fas fa-comment"></i>
                      <span>198</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="story-card">
              <div class="story-image">
                <img src="/images/gunung-semeru.jpg" alt="Gunung Semeru" onerror="this.src='https://via.placeholder.com/400x220/2D3748/FFFFFF?text=Mount+Semeru'">
              </div>
              <div class="story-content">
                <h3>Perjuangan Mencapai Puncak Semeru</h3>
                <p>Kisah inspiratif perjuangan mendaki Gunung Semeru, tantangan yang dihadapi, dan keindahan alam yang tak terlupakan.</p>
                <div class="story-meta">
                  <div class="story-author">
                    <img src="/images/foto6.jpg" alt="Fajar Nugroho" onerror="this.src='https://via.placeholder.com/40x40/38B2AC/FFFFFF?text=FN'">
                    <span>Fajar Nugroho</span>
                  </div>
                  <div class="story-stats">
                    <div class="story-stat">
                      <i class="fas fa-heart"></i>
                      <span>2.5k</span>
                    </div>
                    <div class="story-stat">
                      <i class="fas fa-comment"></i>
                      <span>165</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="popular-stats">
          <div class="container">
            <div class="stats-grid">
              <div class="stat-item">
                <h4>150k+</h4>
                <p>Total Pembaca</p>
              </div>
              <div class="stat-item">
                <h4>25k+</h4>
                <p>Cerita Disukai</p>
              </div>
              <div class="stat-item">
                <h4>8k+</h4>
                <p>Komentar</p>
              </div>
              <div class="stat-item">
                <h4>99+</h4>
                <p>Cerita Trending</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer>
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>Cerita Kita</h3>
              <p>Platform berbagi cerita dan pengalaman inspiratif untuk seluruh masyarakat Indonesia.</p>
              <div class="social-links">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
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

    // Initialize functionality after content is loaded
    this.initializeFilters();
    this.initializeDrawer();
    this.initializeStoryCards();
  }

  initializeFilters() {
    const filters = this.querySelectorAll('.popular-filter');
    const storySections = this.querySelectorAll('.popular-stories');

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Remove active class from all filters
        filters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');
        
        const selectedFilter = filter.getAttribute('data-filter');
        
        // Show/hide sections based on filter
        this.filterStories(selectedFilter);
      });
    });
  }

  filterStories(filterType) {
    const storySections = this.querySelectorAll('.popular-stories');
    
    // Show all sections with animation
    storySections.forEach(section => {
      section.style.display = 'block';
      section.style.animation = 'fadeIn 0.5s ease-in-out';
    });

    // You can add more specific filtering logic here
    // For now, we'll show all stories with different animations based on filter type
    const storyCards = this.querySelectorAll('.story-card');
    storyCards.forEach((card, index) => {
      card.style.animation = `fadeInUp 0.5s ease-in-out ${index * 0.1}s both`;
    });
  }

   initializeDrawer() {
    const drawerButton = this.querySelector('#drawer-button');
    const navigationDrawer = this.querySelector('#navigation-drawer');
    
    if (drawerButton && navigationDrawer) {
      drawerButton.addEventListener('click', () => {
        navigationDrawer.classList.toggle('open');
      });

      // Close drawer when clicking outside
      document.addEventListener('click', (e) => {
        if (!drawerButton.contains(e.target) && !navigationDrawer.contains(e.target)) {
          navigationDrawer.classList.remove('open');
        }
      });

      // Close drawer when clicking on links
      const drawerLinks = navigationDrawer.querySelectorAll('a[data-link]');
      drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
          navigationDrawer.classList.remove('open');
        });
      });
    }
  }

  initializeStoryCards() {
    const storyCards = this.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent navigation if clicking on stats or author info
        if (e.target.closest('.story-stats') || e.target.closest('.story-author')) {
          e.preventDefault();
          return;
        }
        
        // Navigate to story detail (you can implement this based on your routing system)
        const storyTitle = card.querySelector('h3').textContent;
        console.log(`Navigating to story: ${storyTitle}`);
        // Example: window.location.hash = '#/cerita/' + encodeURIComponent(storyTitle);
      });

      // Add hover effect for better UX
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });

    // Initialize story stats interactions
    this.initializeStoryStats();
  }

  initializeStoryStats() {
    const heartButtons = this.querySelectorAll('.story-stat i.fa-heart');
    const commentButtons = this.querySelectorAll('.story-stat i.fa-comment');

    heartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const statSpan = button.nextElementSibling;
        const currentCount = parseInt(statSpan.textContent.replace('k', '000').replace('.', ''));
        const isLiked = button.classList.contains('liked');
        
        if (isLiked) {
          button.classList.remove('liked');
          button.style.color = '#666';
          statSpan.textContent = this.formatCount(currentCount - 1);
        } else {
          button.classList.add('liked');
          button.style.color = '#ff4757';
          statSpan.textContent = this.formatCount(currentCount + 1);
        }
      });
    });

    commentButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Navigate to comments section
        const storyCard = button.closest('.story-card');
        const storyTitle = storyCard.querySelector('h3').textContent;
        console.log(`Opening comments for: ${storyTitle}`);
      });
    });
  }

  formatCount(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  }

  // Method to handle filter animations
  animateStoryCards() {
    const storyCards = this.querySelectorAll('.story-card');
    storyCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.5s ease-in-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // Method to simulate loading more stories
  loadMoreStories() {
    // This would typically fetch more stories from an API
    console.log('Loading more stories...');
    
    // Add loading animation
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-stories';
    loadingDiv.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: var(--primary);"></i>
        <p style="margin-top: 10px; color: #666;">Memuat cerita lainnya...</p>
      </div>
    `;
    
    const storiesGrid = this.querySelector('.stories-grid');
    storiesGrid.appendChild(loadingDiv);
    
    // Simulate API call
    setTimeout(() => {
      loadingDiv.remove();
      // Add new story cards here
    }, 2000);
  }
}

if (!customElements.get('populer-page')) {
  customElements.define('populer-page', PopulerPage);
}
export default PopulerPage;
