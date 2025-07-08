import '../../styles/styles.css';

class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        /* About Page Specific Styles */
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
        
        .about-section {
          padding: 0 0 60px;
        }
        
        .about-card {
          background-color: var(--white);
          border-radius: 15px;
          padding: 40px;
          margin-bottom: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .about-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .about-card h2 {
          color: var(--primary);
          font-size: 28px;
          margin-bottom: 20px;
          font-weight: 700;
          position: relative;
          padding-bottom: 15px;
        }
        
        .about-card h2:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          border-radius: 2px;
        }
        
        .about-card p {
          line-height: 1.8;
          color: #666;
          margin-bottom: 20px;
          font-size: 16px;
        }
        
        .about-card ul {
          list-style: none;
          padding-left: 0;
        }
        
        .about-card ul li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
          color: #666;
          line-height: 1.6;
        }
        
        .about-card ul li i {
          color: var(--primary);
          margin-right: 15px;
          margin-top: 2px;
          font-size: 16px;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }
        
        .team-card {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.05) 0%, rgba(136, 130, 187, 0.05) 100%);
          border-radius: 15px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s;
          border: 1px solid rgba(255, 107, 157, 0.1);
        }
        
        .team-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(255, 107, 157, 0.15);
          border-color: var(--primary);
        }
        
        .team-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 20px;
          overflow: hidden;
          border: 4px solid var(--primary);
          position: relative;
        }
        
        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        
        .team-card:hover .team-image img {
          transform: scale(1.1);
        }
        
        .team-info h4 {
          color: var(--primary);
          font-size: 20px;
          margin-bottom: 8px;
          font-weight: 700;
        }
        
        .team-info p {
          color: var(--secondary);
          font-size: 14px;
          margin-bottom: 15px;
          font-weight: 500;
        }
        
        .team-social {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        
        .team-social a {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          border-radius: 50%;
          color: var(--white);
          transition: all 0.3s;
          font-size: 14px;
        }
        
        .team-social a:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 5px 15px rgba(255, 107, 157, 0.4);
        }
        
        /* Contact section enhancement */
        .about-card:last-child {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.05) 0%, rgba(136, 130, 187, 0.05) 100%);
          border: 2px solid rgba(255, 107, 157, 0.1);
        }
        
        .about-card:last-child .social-links {
          justify-content: flex-start;
        }
        
        .about-card:last-child .social-links a {
          background: linear-gradient(135deg, var(--primary), var(--accent));
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
          
          .about-card {
            padding: 25px;
          }
          
          .about-card h2 {
            font-size: 24px;
          }
          
          .team-grid {
            grid-template-columns: 1fr;
          }
          
          .team-card {
            padding: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .page-header {
            padding: 60px 0;
          }
          
          .page-header h1 {
            font-size: 28px;
          }
          
          .about-card {
            padding: 20px;
          }
          
          .team-image {
            width: 100px;
            height: 100px;
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
          <h1>Tentang Cerita Kita</h1>
          <p>Mengenal lebih dekat platform berbagi cerita inspiratif Indonesia</p>
        </div>
      </section>

      <!-- About Section -->
      <section class="about-section">
        <div class="container">
          <div class="about-card">
            <h2>Siapa Kami</h2>
            <p>Cerita Kita adalah platform berbagi cerita dan pengalaman inspiratif yang didirikan pada tahun 2021. Kami percaya bahwa setiap orang memiliki cerita unik yang bisa menginspirasi orang lain. Melalui Cerita Kita, kami berusaha membangun komunitas penulis dan pembaca yang saling terhubung melalui cerita-cerita autentik dari seluruh penjuru Indonesia.</p>

            <p>Kami berkomitmen untuk menyediakan wadah bagi siapapun yang ingin berbagi kisah perjalanan, pengalaman hidup, petualangan, atau cerita inspiratif lainnya. Dengan antarmuka yang mudah digunakan dan komunitas yang mendukung, Cerita Kita menjadi rumah bagi ribuan penutur cerita dari berbagai latar belakang.</p>
          </div>

          <div class="about-card">
            <h2>Visi & Misi</h2>
            <p><strong>Visi:</strong> Menjadi platform terbesar di Indonesia yang menghubungkan masyarakat melalui kekuatan cerita inspiratif.</p>

            <p><strong>Misi:</strong></p>
            <ul>
              <li><i class="fas fa-check-circle"></i> Menyediakan platform yang inklusif untuk berbagi cerita dari berbagai sudut pandang</li>
              <li><i class="fas fa-check-circle"></i> Memfasilitasi penulis Indonesia untuk mengembangkan bakat menulis mereka</li>
              <li><i class="fas fa-check-circle"></i> Membangun komunitas yang saling mendukung dan menginspirasi</li>
              <li><i class="fas fa-check-circle"></i> Mengarsipkan cerita-cerita berharga yang merepresentasikan keberagaman Indonesia</li>
            </ul>
          </div>

          <div class="about-card">
            <h2>Tim Kami</h2>
            <p>Cerita Kita dibangun oleh tim yang bersemangat untuk mengembangkan platform bercerita terbaik di Indonesia. Kami berasal dari berbagai latar belakang namun dipersatukan oleh kecintaan terhadap cerita dan budaya Indonesia.</p>

            <div class="team-grid">
              <div class="team-card">
                <div class="team-image">
                  <img src="/images/bintang.jpg" alt="Sri Bintang Muksin - Founder & CEO">
                </div>
                <div class="team-info">
                  <h4>Sri Bintang Muksin</h4>
                  <p>Founder & CEO</p>
                  <div class="team-social">
                    <a href="#" aria-label="Facebook Sri Bintang"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="LinkedIn Sri Bintang"><i class="fab fa-linkedin"></i></a>
                    <a href="#" aria-label="Instagram Sri Bintang"><i class="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>

              <div class="team-card">
                <div class="team-image">
                  <img src="/images/oliv.jpg" alt="Olivia Liptiay - Creative Director">
                </div>
                <div class="team-info">
                  <h4>Olivia Liptiay</h4>
                  <p>Creative Director</p>
                  <div class="team-social">
                    <a href="#" aria-label="Facebook Olivia"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="LinkedIn Olivia"><i class="fab fa-linkedin"></i></a>
                    <a href="#" aria-label="Instagram Olivia"><i class="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>

              <div class="team-card">
                <div class="team-image">
                  <img src="/images/kesy.jpg" alt="Kesy D Kebrob - Community Manager">
                </div>
                <div class="team-info">
                  <h4>Kesy D Kebrob</h4>
                  <p>Community Manager</p>
                  <div class="team-social">
                    <a href="#" aria-label="Facebook Kesy"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="LinkedIn Kesy"><i class="fab fa-linkedin"></i></a>
                    <a href="#" aria-label="Instagram Kesy"><i class="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="about-card">
            <h2>Hubungi Kami</h2>
            <p>Punya pertanyaan atau ingin berkolaborasi dengan kami? Jangan ragu untuk menghubungi kami melalui:</p>
            <ul>
              <li><i class="fas fa-envelope"></i> Email: info@ceritakita.id</li>
              <li><i class="fas fa-map-marker-alt"></i> Alamat: Jl. Affandi No. 123, Yogyakarta</li>
              <li><i class="fas fa-phone"></i> Telepon: 082243231123</li>
            </ul>
            <p>Atau ikuti kami di media sosial untuk mendapatkan update terbaru:</p>
            <div class="social-links" style="margin-top: 15px;">
              <a href="#" aria-label="Facebook Cerita Kita"><i class="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram Cerita Kita"><i class="fab fa-instagram"></i></a>
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

    // Drawer toggle functionality
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

    // Add smooth scroll behavior for better UX
    this.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href.startsWith('#/')) {
      // Hanya lakukan scroll jika anchor ke elemen ID dalam halaman (bukan hash-route SPA)
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
  }
}


if (!customElements.get('about-page')) {
  customElements.define('about-page', AboutPage);
}

export default AboutPage;
