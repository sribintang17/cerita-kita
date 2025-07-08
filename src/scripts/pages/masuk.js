import '../../styles/styles.css';

const Masuk = {
  render() {
    return `
      <style>
        :root {
          --primary: #ff6b9d;
          --accent: #a772c1;
          --secondary: #8882bb;
          --dark: #333;
          --white: #fff;
        }

        .login-section {
          background: linear-gradient(to right, #f7f7f7, #ffe9f0);
          padding: 80px 0;
        }

        .login-container {
          max-width: 400px;
          margin: 0 auto;
          background: #ffffff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
        }

        .login-container h2 {
          text-align: center;
          margin-bottom: 10px;
          font-size: 26px;
          font-weight: bold;
          color: var(--primary);
        }

        .login-container p {
          text-align: center;
          color: #666;
          font-size: 14px;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 6px;
          font-size: 14px;
          color: #333;
        }

        .form-control {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-control:focus {
          border-color: var(--primary);
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
        }

        .btn-primary {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          font-weight: 700;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .btn-primary:hover {
          background: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 107, 157, 0.3);
        }

        .login-footer {
          text-align: center;
          margin-top: 20px;
        }

        .login-footer a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        .alert {
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .alert-success {
          background-color: #d4edda;
          color: #155724;
        }

        .alert-error {
          background-color: #f8d7da;
          color: #721c24;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 20px;
          }

          .login-container h2 {
            font-size: 22px;
          }
        }
      </style>

      <section class="login-section">
        <div class="container">
          <div class="login-container">
            <h2>Masuk ke Cerita Kita</h2>
            <p>Masuk untuk berbagi cerita inspiratifmu dan membaca cerita menarik dari pengguna lain.</p>
            
            <div id="alertMessage" class="alert" style="display:none;"></div>
            
            <form id="loginForm">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" placeholder="Masukkan email kamu" required>
              </div>
              
              <div class="form-group">
                <label for="password">Kata Sandi</label>
                <input type="password" id="password" class="form-control" placeholder="Masukkan kata sandi" required minlength="6">
              </div>
              
              <button type="submit" class="btn btn-primary">Masuk</button>
            </form>
            
            <div class="login-footer">
              Belum punya akun? <a href="#/daftar">Daftar sekarang</a>
              <p style="margin-top: 10px;"><a href="#">Lupa kata sandi?</a></p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  afterRender() {
    const loginForm = document.getElementById('loginForm');
    const alertMessage = document.getElementById('alertMessage');
    const API_URL = 'https://story-api.dicoding.dev/v1';

    function showAlert(message, type) {
      alertMessage.textContent = message;
      alertMessage.className = `alert alert-${type}`;
      alertMessage.style.display = 'block';
      setTimeout(() => {
        alertMessage.style.display = 'none';
      }, 5000);
    }

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        showAlert('Email dan kata sandi harus diisi.', 'error');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.error) {
          showAlert(data.message || 'Login gagal. Periksa email dan kata sandi Anda.', 'error');
        } else {
          localStorage.setItem('authToken', data.loginResult.token);
          localStorage.setItem('userName', data.loginResult.name);
          localStorage.setItem('userId', data.loginResult.userId);

          showAlert('Login berhasil! Mengalihkan ke halaman utama...', 'success');

          setTimeout(() => {
            window.location.href = '#/';
          }, 1500);
        }
      } catch (error) {
        showAlert('Terjadi kesalahan. Silakan coba lagi nanti.', 'error');
        console.error('Login error:', error);
      }
    });
  },
};

export default Masuk;
