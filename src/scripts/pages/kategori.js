import '../../styles/styles.css';

class KategoriPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        /* Kategori Page Specific Styles */
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
        
        .category-section {
          padding: 0 0 60px;
        }
        
        .category-filters {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        
        .category-filter {
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
        
        .category-filter:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .category-filter.active {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: var(--white);
          border-color: var(--primary);
          box-shadow: 0 5px 15px rgba(255, 107, 157, 0.3);
        }
        
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }
        
        .category-card {
          background: var(--white);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }
        
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .category-image {
          height: 200px;
          overflow: hidden;
          position: relative;
        }
        
        .category-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.3), rgba(136, 130, 187, 0.3));
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .category-card:hover .category-image::before {
          opacity: 1;
        }
        
        .category-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        
        .category-card:hover .category-image img {
          transform: scale(1.1);
        }
        
        .category-content {
          padding: 25px;
          position: relative;
        }
        
        .category-content h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 10px;
          transition: color 0.3s;
        }
        
        .category-card:hover .category-content h3 {
          color: var(--accent);
        }
        
        .category-content p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
          font-size: 16px;
        }
        
        .category-count {
          display: inline-block;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: var(--white);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          position: absolute;
          bottom: 20px;
          right: 20px;
          box-shadow: 0 2px 10px rgba(255, 107, 157, 0.3);
        }
        
        /* Featured Categories */
        .featured-category {
          grid-column: span 2;
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.05) 0%, rgba(136, 130, 187, 0.05) 100%);
          border: 2px solid rgba(255, 107, 157, 0.1);
        }
        
        .featured-category .category-image {
          height: 250px;
        }
        
        .featured-category .category-content {
          padding: 35px;
        }
        
        .featured-category .category-content h3 {
          font-size: 28px;
        }
        
        .featured-category .category-content p {
          font-size: 18px;
        }
        
        /* Stats Section */
        .category-stats {
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
        
        /* Responsive Design */
        @media (max-width: 1200px) {
          .featured-category {
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
          
          .category-filters {
            gap: 10px;
          }
          
          .category-filter {
            padding: 10px 16px;
            font-size: 14px;
          }
          
          .category-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .category-content {
            padding: 20px;
          }
          
          .category-content h3 {
            font-size: 20px;
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
          
          .category-section {
            padding: 0 0 40px;
          }
          
          .category-image {
            height: 150px;
          }
          
          .category-content {
            padding: 15px;
          }
          
          .category-count {
            position: static;
            margin-top: 10px;
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
              <a href="#/populer" data-link>Populer</a>
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
          <h1>Kategori Cerita</h1>
          <p>Temukan berbagai kategori cerita menarik yang sesuai dengan minat dan preferensi Anda</p>
        </div>
      </section>

      <!-- Category Section -->
      <section class="category-section container">
        <div class="category-filters">
          <div class="category-filter active" data-category="semua">Semua</div>
          <div class="category-filter" data-category="petualangan">Petualangan</div>
          <div class="category-filter" data-category="inspiratif">Inspiratif</div>
          <div class="category-filter" data-category="komedi">Komedi</div>
          <div class="category-filter" data-category="romantis">Romantis</div>
          <div class="category-filter" data-category="misteri">Misteri</div>
        </div>

        <div class="category-grid">
          <div class="category-card featured-category" data-category="petualangan">
            <div class="category-image">
              <img src="/images/petualangan.jpg" alt="Petualangan" onerror="this.src='https://via.placeholder.com/400x250/FF6B9D/FFFFFF?text=Petualangan'">
            </div>
            <div class="category-content">
              <h3>Petualangan</h3>
              <p>Cerita penuh aksi dan eksplorasi dunia yang menantang adrenalin. Ikuti perjalanan seru para penjelajah dalam mencari harta karun, mendaki gunung tertinggi, atau menjelajahi hutan belantara.</p>
              <span class="category-count">24 Cerita</span>
            </div>
          </div>
          
          <div class="category-card" data-category="inspiratif">
            <div class="category-image">
              <img src="/images/inspiratif.jpg" alt="Inspiratif" onerror="this.src='https://via.placeholder.com/400x200/8882BB/FFFFFF?text=Inspiratif'">
            </div>
            <div class="category-content">
              <h3>Inspiratif</h3>
              <p>Cerita yang memotivasi dan menyentuh hati pembaca</p>
              <span class="category-count">18 Cerita</span>
            </div>
          </div>
          
          <div class="category-card" data-category="komedi">
            <div class="category-image">
              <img src="/images/komedi.jpg" alt="Komedi" onerror="this.src='https://via.placeholder.com/400x200/FF9F40/FFFFFF?text=Komedi'">
            </div>
            <div class="category-content">
              <h3>Komedi</h3>
              <p>Cerita lucu yang menghibur dan menghadirkan tawa</p>
              <span class="category-count">12 Cerita</span>
            </div>
          </div>
          
          <div class="category-card" data-category="romantis">
            <div class="category-image">
              <img src="/images/romantis.jpg" alt="Romantis" onerror="this.src='https://via.placeholder.com/400x200/FF6B9D/FFFFFF?text=Romantis'">
            </div>
            <div class="category-content">
              <h3>Romantis</h3>
              <p>Cerita cinta yang menggetarkan hati dan jiwa</p>
              <span class="category-count">21 Cerita</span>
            </div>
          </div>
          
          <div class="category-card" data-category="misteri">
            <div class="category-image">
              <img src="/images/misteri.jpg" alt="Misteri" onerror="this.src='https://via.placeholder.com/400x200/2D3748/FFFFFF?text=Misteri'">
            </div>
            <div class="category-content">
              <h3>Misteri</h3>
              <p>Cerita penuh teka-teki dan suspense yang menantang</p>
              <span class="category-count">15 Cerita</span>
            </div>
          </div>
          
          <div class="category-card" data-category="kehidupan">
            <div class="category-image">
              <img src="/images/kehidupan.jpg" alt="Kehidupan Sehari-hari" onerror="this.src='https://via.placeholder.com/400x200/38B2AC/FFFFFF?text=Kehidupan'">
            </div>
            <div class="category-content">
              <h3>Kehidupan Sehari-hari</h3>
              <p>Cerita tentang pengalaman hidup yang relatable</p>
              <span class="category-count">9 Cerita</span>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="category-stats">
          <div class="container">
            <div class="stats-grid">
              <div class="stat-item">
                <h4>99+</h4>
                <p>Total Cerita</p>
              </div>
              <div class="stat-item">
                <h4>6</h4>
                <p>Kategori</p>
              </div>
              <div class="stat-item">
                <h4>1,500+</h4>
                <p>Pembaca Aktif</p>
              </div>
              <div class="stat-item">
                <h4>50+</h4>
                <p>Penulis</p>
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
    this.initializeCategoryCards();
  }

  initializeFilters() {
    const filters = this.querySelectorAll('.category-filter');
    const categoryCards = this.querySelectorAll('.category-card');

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Remove active class from all filters
        filters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');
        
        const selectedCategory = filter.getAttribute('data-category');
        
        // Filter cards based on selected category
        categoryCards.forEach(card => {
          if (selectedCategory === 'semua' || card.getAttribute('data-category') === selectedCategory) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
          } else {
            card.style.display = 'none';
          }
        });
      });
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

      // Close drawer when link clicked
      this.querySelectorAll('#navigation-drawer a[data-link]').forEach((link) => {
        link.addEventListener('click', () => {
          navigationDrawer.classList.remove('open');
        });
      });
    }
  }

  initializeCategoryCards() {
    const categoryCards = this.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        // Navigate to category page or show category stories
        window.location.hash = `#/kategori/${category}`;
      });

      // Add hover animation
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
}

// Add CSS keyframes for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
`;
document.head.appendChild(style);

if (!customElements.get('kategori-page')) {
  customElements.define('kategori-page', KategoriPage);
}
export default KategoriPage;
