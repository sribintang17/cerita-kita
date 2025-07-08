import '../../styles/styles.css';
import { loginUser } from '../data/auth-api.js';

class LoginPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupLoginForm();
  }

  render() {
    this.innerHTML = `
      <section class="login-section login-page">
        <div class="container">
          <div class="login-container">
            <h2>Masuk ke Cerita Kita</h2>
            <p>Masuk untuk berbagi cerita inspiratifmu dan membaca cerita menarik dari pengguna lain.</p>
            
            <div id="alertMessage" class="alert" style="display: none;"></div>
            
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
              Belum punya akun? <a href="#/daftar" data-link>Daftar sekarang</a>
              <p style="margin-top: 10px;"><a href="#">Lupa kata sandi?</a></p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  setupLoginForm() {
    const loginForm = this.querySelector('#loginForm');
    const alertMessage = this.querySelector('#alertMessage');

    const showAlert = (message, type = 'error') => {
      alertMessage.textContent = message;
      alertMessage.className = `alert alert-${type}`;
      alertMessage.style.display = 'block';
      setTimeout(() => {
        alertMessage.style.display = 'none';
      }, 5000);
    };

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = this.querySelector('#email').value.trim();
      const password = this.querySelector('#password').value.trim();

      if (!email || !password) {
        showAlert('Email dan kata sandi harus diisi.');
        return;
      }

      try {
        const result = await loginUser({ email, password });

        if (result.error) {
          showAlert(result.message || 'Login gagal. Periksa email dan kata sandi Anda.');
        } else {
          showAlert('Login berhasil! Mengalihkan ke halaman utama...', 'success');

          setTimeout(() => {
            window.location.hash = '#/';
          }, 1500);
        }
      } catch (error) {
        console.error('Login error:', error);
        showAlert('Terjadi kesalahan. Silakan coba lagi nanti.');
      }
    });
  }
}

if (!customElements.get('login-page')) {
  customElements.define('login-page', LoginPage);
}

export default LoginPage;
