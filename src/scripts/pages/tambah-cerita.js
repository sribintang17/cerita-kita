import '../../styles/styles.css';
import { postStory, getAllStories } from '../data/api.js';
import { getToken } from '../data/auth-api.js'; 
import TambahPresenter from '../presenter/tambah-presenter.js';

class TambahCeritaPage extends HTMLElement {
  constructor() {
    super();
    this.stories = [];
    this.map = null;
    this.marker = null;
    this.stream = null;
    this.mapLoaded = false;
    this.currentPage = 1;
    this.isLoading = false;
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        /* Tambah Cerita Page Specific Styles */
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

        .form-section {
          padding: 0 0 60px;
        }

        .story-form {
          background: var(--white);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--dark);
          font-size: 16px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 15px;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
        }

        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }

        .required {
          color: var(--accent);
        }

        /* Camera Section */
        .camera-section {
          background: var(--light);
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 25px;
        }

        .camera-section h3 {
          color: var(--primary);
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: 700;
        }

        .camera-container {
          position: relative;
          background: #f8f9fa;
          border: 2px dashed #dee2e6;
          border-radius: 15px;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .camera-preview,
        .captured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 13px;
          display: none;
        }

        .camera-placeholder {
          text-align: center;
          color: #6c757d;
          padding: 40px;
        }

        .camera-placeholder i {
          font-size: 48px;
          margin-bottom: 15px;
          color: var(--primary);
        }

        .camera-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          align-items: center;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: var(--white);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 157, 0.4);
        }

        .btn-secondary {
          background: var(--secondary);
          color: var(--white);
        }

        .btn-secondary:hover {
          background: #7a7396;
          transform: translateY(-2px);
        }

        .btn-success {
          background: #28a745;
          color: var(--white);
        }

        .btn-success:hover {
          background: #218838;
          transform: translateY(-2px);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .upload-input {
          display: none;
        }

        .upload-label {
          background: var(--light);
          color: var(--dark);
          border: 2px solid #dee2e6;
          cursor: pointer;
        }

        .upload-label:hover {
          background: #e9ecef;
          border-color: var(--primary);
        }

        /* Categories */
        .categories-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 10px;
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: var(--light);
          border-radius: 8px;
          transition: all 0.3s;
        }

        .category-item:hover {
          background: rgba(255, 107, 157, 0.1);
        }

        .category-item input[type="checkbox"] {
          width: auto;
          margin: 0;
        }

        .category-item label {
          margin: 0;
          font-weight: 500;
          cursor: pointer;
        }

        /* Map Section */
        .map-section {
          background: var(--light);
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 25px;
        }

        .map-section h3 {
          color: var(--primary);
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: 700;
        }

        .map-container {
          height: 400px;
          border-radius: 15px;
          overflow: hidden;
          border: 2px solid #dee2e6;
          margin-bottom: 20px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6c757d;
        }

        .map-loading {
          text-align: center;
          font-size: 16px;
        }

        .map-loading i {
          font-size: 32px;
          margin-bottom: 10px;
          color: var(--primary);
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .coordinates-display {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .coordinate-input {
          background: var(--white);
          border: 2px solid #dee2e6;
          border-radius: 8px;
          padding: 10px;
          font-size: 14px;
        }

        /* Stories Display */
        .stories-section {
          margin-top: 60px;
        }

        .stories-section h2 {
          color: var(--primary);
          font-size: 32px;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 700;
        }

        .stories-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .story-card {
          background: var(--white);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          cursor: pointer;
        }

        .story-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .story-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .story-image-placeholder {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }

        .story-content {
          padding: 20px;
        }

        .story-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .story-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 15px;
          font-size: 14px;
          color: #666;
        }

        .story-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .story-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }

        .story-category {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: var(--white);
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 500;
        }

        .story-excerpt {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .story-location {
          font-size: 14px;
          color: var(--primary);
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .story-stats {
          display: flex;
          justify-content: space-between;
          padding-top: 15px;
          border-top: 1px solid #eee;
          font-size: 14px;
          color: #666;
        }

        .story-stats span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .empty-state i {
          font-size: 64px;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .empty-state h3 {
          font-size: 24px;
          margin-bottom: 10px;
          color: var(--dark);
        }

        /* Alerts */
        .alert {
          padding: 15px 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          display: none;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .alert-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .alert-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          font-size: 18px;
          font-weight: 700;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: var(--white);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 107, 157, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          margin-right: 10px;
        }

        .load-more-btn {
          display: block;
          margin: 40px auto;
          padding: 15px 30px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .load-more-btn:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }

        .load-more-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 36px;
          }

          .page-header p {
            font-size: 16px;
          }

          .story-form {
            padding: 25px;
          }

          .camera-section,
          .map-section {
            padding: 20px;
          }

          .camera-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .btn {
            justify-content: center;
          }

          .coordinates-display {
            grid-template-columns: 1fr;
          }

          .stories-container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .page-header {
            padding: 60px 0;
          }

          .page-header h1 {
            font-size: 28px;
          }

          .story-form {
            padding: 20px;
          }

          .categories-container {
            grid-template-columns: 1fr;
          }

          .map-container {
            height: 300px;
          }
        }
      </style>

      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1>Tambah Cerita Baru</h1>
          <p>Bagikan pengalaman dan cerita inspiratif Anda dengan dunia</p>
        </div>
      </section>

      <!-- Main Content -->
      <section class="form-section">
        <div class="container">
          <!-- Alerts -->
          <div id="success-alert" class="alert alert-success">
            <i class="fas fa-check-circle"></i>
            <span>Berhasil!</span>
          </div>
          
          <div id="error-alert" class="alert alert-error">
            <i class="fas fa-exclamation-circle"></i>
            <span>Terjadi kesalahan!</span>
          </div>

          <!-- Story Form -->
          <form id="story-form" class="story-form">
            <!-- Basic Information -->
            <div class="form-group">
              <label for="title">Judul Cerita <span class="required">*</span></label>
              <input type="text" id="title" name="title" placeholder="Masukkan judul cerita yang menarik..." required>
            </div>

            <div class="form-group">
              <label for="author">Nama Penulis <span class="required">*</span></label>
              <input type="text" id="author" name="author" placeholder="Nama Anda..." required>
            </div>

            <div class="form-group">
              <label for="story-content">Isi Cerita <span class="required">*</span></label>
              <textarea id="story-content" name="content" placeholder="Tulis cerita Anda di sini... Ceritakan pengalaman, petualangan, atau kisah inspiratif Anda dengan detail." required></textarea>
            </div>

            <!-- Categories -->
            <div class="form-group">
              <label>Kategori Cerita</label>
              <div class="categories-container">
                <div class="category-item">
                  <input type="checkbox" id="cat-petualangan" name="category" value="Petualangan">
                  <label for="cat-petualangan">Petualangan</label>
                </div>
                <div class="category-item">
                  <input type="checkbox" id="cat-inspiratif" name="category" value="Inspiratif">
                  <label for="cat-inspiratif">Inspiratif</label>
                </div>
                <div class="category-item">
                  <input type="checkbox" id="cat-motivasi" name="category" value="Motivasi">
                  <label for="cat-motivasi">Motivasi</label>
                </div>
                <div class="category-item">
                  <input type="checkbox" id="cat-kehidupan" name="category" value="Kehidupan">
                  <label for="cat-kehidupan">Kehidupan</label>
                </div>
                <div class="category-item">
                  <input type="checkbox" id="cat-perjalanan" name="category" value="Perjalanan">
                  <label for="cat-perjalanan">Perjalanan</label>
                </div>
                <div class="category-item">
                  <input type="checkbox" id="cat-keluarga" name="category" value="Keluarga">
                  <label for="cat-keluarga">Keluarga</label>
                </div>
              </div>
            </div>

            <!-- Camera Section -->
            <div class="camera-section">
              <h3><i class="fas fa-camera"></i> Foto Cerita</h3>
              <div class="camera-container">
                <video id="camera-preview" class="camera-preview" autoplay playsinline></video>
                <img id="captured-image" class="captured-image" alt="Captured photo">
                <div id="camera-placeholder" class="camera-placeholder">
                  <i class="fas fa-camera"></i>
                  <h4>Ambil atau Upload Foto</h4>
                  <p>Tambahkan foto untuk memperkaya cerita Anda</p>
                </div>
              </div>
              
              <div class="camera-controls">
                <button type="button" id="start-camera" class="btn btn-primary">
                  <i class="fas fa-camera"></i> Buka Kamera
                </button>
                <button type="button" id="capture-image" class="btn btn-success" disabled>
                  <i class="fas fa-camera-retro"></i> Ambil Foto
                </button>
                <button type="button" id="retake-image" class="btn btn-secondary" disabled>
                  <i class="fas fa-redo"></i> Foto Ulang
                </button>
                <label for="upload-image" class="btn upload-label">
                  <i class="fas fa-upload"></i> Upload Foto
                </label>
                <input type="file" id="upload-image" class="upload-input" accept="image/*">
              </div>
            </div>

            <!-- Map Section -->
            <div class="map-section">
              <h3><i class="fas fa-map-marker-alt"></i> Lokasi Cerita <span class="required">*</span></h3>
              <p>Klik pada peta untuk menentukan lokasi cerita Anda</p>
              <div id="map" class="map-container">
                <div class="map-loading">
                  <i class="fas fa-spinner"></i>
                  <div>Memuat peta...</div>
                </div>
              </div>
              
              <div class="coordinates-display">
                <div>
                  <label for="latitude">Latitude:</label>
                  <input type="number" id="latitude" name="latitude" class="coordinate-input" step="any" readonly required>
                </div>
                <div>
                  <label for="longitude">Longitude:</label>
                  <input type="number" id="longitude" name="longitude" class="coordinate-input" step="any" readonly required>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="submit-btn">
              <i class="fas fa-paper-plane"></i> Bagikan Cerita
            </button>
          </form>

          <!-- Stories Display -->
          <div class="stories-section">
            <h2>Cerita Terbaru</h2>
            <div id="stories-container" class="stories-container">
              <!-- Stories will be dynamically added here -->
            </div>
            
            <div id="empty-state" class="empty-state">
              <i class="fas fa-book-open"></i>
              <h3>Belum Ada Cerita</h3>
              <p>Jadilah yang pertama membagikan cerita inspiratif Anda!</p>
            </div>

            <button id="load-more-btn" class="load-more-btn" style="display: none;">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </section>
    `;

    // Initialize functionality after DOM is ready
    setTimeout(() => {
      this.initializeComponents();
    }, 100);
  }

  initializeComponents() {
    // Load Leaflet CSS and JS if not already loaded
    this.loadLeafletLibrary();
    
    // Setup camera
    this.setupCamera();
    
    // Setup form
    this.setupForm();
    
    // Load and display stories from API
    this.loadStoriesFromAPI();
  }

  // Load Leaflet library dynamically
  loadLeafletLibrary() {
    // Check if Leaflet is already loaded
    if (window.L) {
      this.initMap();
      return;
    }

    // Load CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);
    }

    // Load JS
    if (!document.querySelector('script[src*="leaflet"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        this.initMap();
      };
      document.head.appendChild(script);
    } else {
      // Script exists but might not be loaded yet
      const checkLeaflet = setInterval(() => {
        if (window.L) {
          clearInterval(checkLeaflet);
          this.initMap();
        }
      }, 100);
    }
  }

  // Initialize Leaflet Map
  initMap() {
    const mapElement = this.querySelector('#map');
    if (!mapElement || this.mapLoaded) return;

    try {
      // Clear loading state
      mapElement.innerHTML = '';
      
      // Default to Jakarta, Indonesia
      const defaultPosition = [-6.2088, 106.8456];
      this.map = L.map(mapElement).setView(defaultPosition, 10);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(this.map);

      // Handle map clicks
      this.map.on('click', (e) => {
        this.setMarker(e.latlng.lat, e.latlng.lng);
      });

      this.mapLoaded = true;

      // Try to get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            this.map.setView([lat, lng], 13);
            this.setMarker(lat, lng);
          },
          (error) => {
            console.log('Geolocation not available:', error.message);
          }
        );
      }
    } catch (error) {
      console.error('Error initializing map:', error);
      mapElement.innerHTML = `
        <div class="map-loading">
          <i class="fas fa-exclamation-triangle"></i>
          <div>Gagal memuat peta. Silakan refresh halaman.</div>
        </div>
      `;
    }
  }

  // Set marker on map
  setMarker(lat, lng) {
    const latInput = this.querySelector('#latitude');
    const lngInput = this.querySelector('#longitude');

    if (!latInput || !lngInput) return;

    // Update form inputs
    latInput.value = lat.toFixed(6);
    lngInput.value = lng.toFixed(6);

    // Remove existing marker
    if (this.marker && this.map) {
      this.map.removeLayer(this.marker);
    }

    // Add new marker
    if (this.map) {
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.marker.bindPopup(`
        <div style="text-align: center;">
          <strong>Lokasi Cerita</strong><br>
          Lat: ${lat.toFixed(6)}<br>
          Lng: ${lng.toFixed(6)}
        </div>
      `).openPopup();
    }
  }

  // Setup camera functionality
  setupCamera() {
    const startCameraBtn = this.querySelector('#start-camera');
    const captureImageBtn = this.querySelector('#capture-image');
    const retakeImageBtn = this.querySelector('#retake-image');
    const uploadImageInput = this.querySelector('#upload-image');
    const cameraPreview = this.querySelector('#camera-preview');
    const capturedImage = this.querySelector('#captured-image');
    const cameraPlaceholder = this.querySelector('#camera-placeholder');

    if (!startCameraBtn || !captureImageBtn || !retakeImageBtn || !uploadImageInput || 
        !cameraPreview || !capturedImage || !cameraPlaceholder) return;

    // Start camera
    startCameraBtn.addEventListener('click', async () => {
      try {
        // Check if browser supports getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera not supported in this browser');
        }

        this.stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        
        cameraPreview.srcObject = this.stream;
        cameraPreview.style.display = 'block';
        cameraPlaceholder.style.display = 'none';
        capturedImage.style.display = 'none';
        
        startCameraBtn.disabled = true;
        captureImageBtn.disabled = false;
        retakeImageBtn.disabled = true;
        
        startCameraBtn.innerHTML = '<i class="fas fa-camera"></i> Kamera Aktif';
      } catch (error) {
        console.error('Error accessing camera:', error);
        this.showAlert('error', 'Tidak dapat mengakses kamera. Silakan gunakan fitur upload foto atau periksa izin kamera.');
      }
    });

    // Capture image
    captureImageBtn.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.width = cameraPreview.videoWidth;
      canvas.height = cameraPreview.videoHeight;
      
      context.drawImage(cameraPreview, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      capturedImage.src = imageDataUrl;
      capturedImage.style.display = 'block';
      cameraPreview.style.display = 'none';
      
      // Stop camera stream
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
      
      captureImageBtn.disabled = true;
      retakeImageBtn.disabled = false;
      startCameraBtn.disabled = false;
      startCameraBtn.innerHTML = '<i class="fas fa-camera"></i> Buka Kamera';
    });

    // Retake image
    retakeImageBtn.addEventListener('click', () => {
      capturedImage.style.display = 'none';
      cameraPlaceholder.style.display = 'block';
      
      retakeImageBtn.disabled = true;
      startCameraBtn.disabled = false;
      captureImageBtn.disabled = true;startCameraBtn.innerHTML = '<i class="fas fa-camera"></i> Buka Kamera';
    });

    // Upload image
    uploadImageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          this.showAlert('error', 'File yang dipilih bukan gambar. Silakan pilih file gambar.');
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.showAlert('error', 'Ukuran file terlalu besar. Maksimal 5MB.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          capturedImage.src = e.target.result;
          capturedImage.style.display = 'block';
          cameraPreview.style.display = 'none';
          cameraPlaceholder.style.display = 'none';
          
          // Stop camera if running
          if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
          }
          
          retakeImageBtn.disabled = false;
          startCameraBtn.disabled = false;
          captureImageBtn.disabled = true;
          startCameraBtn.innerHTML = '<i class="fas fa-camera"></i> Buka Kamera';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Setup form functionality
 // Setup form functionality
setupForm() {
  const form = this.querySelector('#story-form');
  const submitBtn = this.querySelector('.submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (this.isLoading) return;

    // Validate form
    if (!this.validateForm()) return;

    this.isLoading = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading-spinner"></span>Mengirim...';
    submitBtn.disabled = true;

    try {
      const formData = this.collectFormData();

      // Cek token (opsional — bisa di dalam presenter juga)
      const token = getToken();
      if (!token) {
        this.showAlert('error', 'Anda harus login terlebih dahulu untuk mengirim cerita.');
        return;
      }

      // Kirim lewat Presenter
      const response = await TambahPresenter.submit(formData);

      if (response.error) {
        this.showAlert('error', response.message);
      } else {
        this.showAlert('success', response.message);
        this.resetForm();
        setTimeout(() => {
          this.loadStoriesFromAPI();
        }, 1000);
      }
    } catch (error) {
      console.error('Error posting story:', error);
      this.showAlert('error', error.message || 'Gagal mengirim cerita. Silakan coba lagi.');
    } finally {
      this.isLoading = false;
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

  // Validate form data
  validateForm() {
    const title = this.querySelector('#title').value.trim();
    const author = this.querySelector('#author').value.trim();
    const content = this.querySelector('#story-content').value.trim();
    const latitude = this.querySelector('#latitude').value;
    const longitude = this.querySelector('#longitude').value;

    if (!title) {
      this.showAlert('error', 'Judul cerita harus diisi.');
      this.querySelector('#title').focus();
      return false;
    }

    if (title.length < 5) {
      this.showAlert('error', 'Judul cerita minimal 5 karakter.');
      this.querySelector('#title').focus();
      return false;
    }

    if (!author) {
      this.showAlert('error', 'Nama penulis harus diisi.');
      this.querySelector('#author').focus();
      return false;
    }

    if (!content) {
      this.showAlert('error', 'Isi cerita harus diisi.');
      this.querySelector('#story-content').focus();
      return false;
    }

    if (content.length < 50) {
      this.showAlert('error', 'Isi cerita minimal 50 karakter.');
      this.querySelector('#story-content').focus();
      return false;
    }

    if (!latitude || !longitude) {
      this.showAlert('error', 'Lokasi cerita harus dipilih. Klik pada peta untuk menentukan lokasi.');
      return false;
    }

    return true;
  }

collectFormData() {
  const formData = new FormData();

  formData.append('description', this.querySelector('#story-content').value.trim());
  formData.append('lat', parseFloat(this.querySelector('#latitude').value));
  formData.append('lon', parseFloat(this.querySelector('#longitude').value));

  const fileInput = this.querySelector('#upload-image');
const imageFile = fileInput?.files[0];

if (imageFile) {
  formData.append('photo', imageFile);
} else {
  const capturedImage = this.querySelector('#captured-image');
  const dataUrl = capturedImage?.src;

  if (dataUrl?.startsWith('data:image/')) {
    const blob = this.dataURLtoBlob(dataUrl);
    const file = new File([blob], 'photo.jpg', { type: blob.type });
    formData.append('photo', file);
  }
}

  return formData;
}

  // Reset form after successful submission
  resetForm() {
    const form = this.querySelector('#story-form');
    if (form) {
      form.reset();
    }

    // Reset image display
    const capturedImage = this.querySelector('#captured-image');
    const cameraPreview = this.querySelector('#camera-preview');
    const cameraPlaceholder = this.querySelector('#camera-placeholder');
    const startCameraBtn = this.querySelector('#start-camera');
    const captureImageBtn = this.querySelector('#capture-image');
    const retakeImageBtn = this.querySelector('#retake-image');

    if (capturedImage) capturedImage.style.display = 'none';
    if (cameraPreview) cameraPreview.style.display = 'none';
    if (cameraPlaceholder) cameraPlaceholder.style.display = 'block';
    
    if (startCameraBtn) {
      startCameraBtn.disabled = false;
      startCameraBtn.innerHTML = '<i class="fas fa-camera"></i> Buka Kamera';
    }
    if (captureImageBtn) captureImageBtn.disabled = true;
    if (retakeImageBtn) retakeImageBtn.disabled = true;

    // Reset coordinates
    const latInput = this.querySelector('#latitude');
    const lngInput = this.querySelector('#longitude');
    if (latInput) latInput.value = '';
    if (lngInput) lngInput.value = '';

    // Remove map marker
    if (this.marker && this.map) {
      this.map.removeLayer(this.marker);
      this.marker = null;
    }

    // Stop camera stream if running
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  // Load stories from API
  async loadStoriesFromAPI() {
    try {
      const response = await getAllStories();
      
      if (response && response.error === false && response.listStory) {
        this.stories = response.listStory;
        this.displayStories();
      } else {
        console.error('Error loading stories:', response?.message);
        this.showEmptyState();
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
      this.showEmptyState();
    }
  }

  // Display stories in the UI
  displayStories() {
    const storiesContainer = this.querySelector('#stories-container');
    const emptyState = this.querySelector('#empty-state');
    const loadMoreBtn = this.querySelector('#load-more-btn');

    if (!storiesContainer || !emptyState) return;

    if (this.stories.length === 0) {
      this.showEmptyState();
      return;
    }

    emptyState.style.display = 'none';
    storiesContainer.innerHTML = '';

    // Calculate stories to show (pagination)
    const storiesPerPage = 6;
    const startIndex = 0;
    const endIndex = Math.min(this.currentPage * storiesPerPage, this.stories.length);
    const storiesToShow = this.stories.slice(startIndex, endIndex);

    storiesToShow.forEach(story => {
      const storyCard = this.createStoryCard(story);
      storiesContainer.appendChild(storyCard);
    });

    // Show/hide load more button
    if (loadMoreBtn) {
      if (endIndex < this.stories.length) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = () => this.loadMoreStories();
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }
  }

  // Load more stories
  loadMoreStories() {
    const loadMoreBtn = this.querySelector('#load-more-btn');
    if (this.isLoading || !loadMoreBtn) return;

    this.isLoading = true;
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = '<span class="loading-spinner"></span>Memuat...';

    setTimeout(() => {
      this.currentPage++;
      this.displayStories();
      this.isLoading = false;
      loadMoreBtn.disabled = false;
      loadMoreBtn.innerHTML = 'Muat Lebih Banyak';
    }, 1000);
  }

  // Create story card HTML
  createStoryCard(story) {
    const storyCard = document.createElement('div');
    storyCard.className = 'story-card';
    storyCard.onclick = () => this.openStoryDetail(story);

    // Format date
    const createdDate = new Date(story.createdAt || Date.now());
    const formattedDate = createdDate.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Truncate content for excerpt
    const excerpt = story.description || story.content || '';
    const maxExcerptLength = 150;
    const truncatedExcerpt = excerpt.length > maxExcerptLength 
      ? excerpt.substring(0, maxExcerptLength) + '...'
      : excerpt;

    // Create categories HTML
    const categoriesHTML = story.categories && story.categories.length > 0
      ? story.categories.map(cat => `<span class="story-category">${cat}</span>`).join('')
      : '<span class="story-category">Umum</span>';

    storyCard.innerHTML = `
      ${story.photoUrl ? 
        `<img src="${story.photoUrl}" alt="${story.name || story.title}" class="story-image">` :
        `<div class="story-image-placeholder">
          <i class="fas fa-image"></i>
        </div>`
      }
      <div class="story-content">
        <h3 class="story-title">${story.name || story.title || 'Cerita Tanpa Judul'}</h3>
        
        <div class="story-meta">
          <span><i class="fas fa-user"></i> ${story.author || 'Anonymous'}</span>
          <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
        </div>

        <div class="story-categories">
          ${categoriesHTML}
        </div>

        <p class="story-excerpt">${truncatedExcerpt}</p>

        ${story.lat && story.lon ? 
          `<div class="story-location">
            <i class="fas fa-map-marker-alt"></i>
            Lat: ${parseFloat(story.lat).toFixed(4)}, Lng: ${parseFloat(story.lon).toFixed(4)}
          </div>` : ''
        }

        <div class="story-stats">
          <span><i class="fas fa-eye"></i> ${story.views || 0} views</span>
          <span><i class="fas fa-heart"></i> ${story.likes || 0} likes</span>
        </div>
      </div>
    `;

    return storyCard;
  }

  // Open story detail (navigate to detail page)
  openStoryDetail(story) {
    // Store story data in sessionStorage for detail page
    sessionStorage.setItem('selectedStory', JSON.stringify(story));
    
    // Navigate to detail page
    window.location.hash = '#detail-cerita';
  }

  // Show empty state
  showEmptyState() {
    const storiesContainer = this.querySelector('#stories-container');
    const emptyState = this.querySelector('#empty-state');
    const loadMoreBtn = this.querySelector('#load-more-btn');

    if (storiesContainer) storiesContainer.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
  }

  // Show alert messages
  showAlert(type, message) {
    const alertElement = this.querySelector(`#${type === 'error' ? 'error' : 'success'}-alert`);
    if (!alertElement) return;

    const messageElement = alertElement.querySelector('span:last-child');
    if (messageElement) {
      messageElement.textContent = message;
    }

    alertElement.style.display = 'flex';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      alertElement.style.display = 'none';
    }, 5000);

    // Scroll to alert
    alertElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
    dataURLtoBlob(dataURL) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

  // Cleanup when component is removed
  disconnectedCallback() {
    // Stop camera stream
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    // Clean up map
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}

if (!customElements.get('tambah-cerita-page')) {
    customElements.define('tambah-cerita-page', TambahCeritaPage);
}

export default TambahCeritaPage;
