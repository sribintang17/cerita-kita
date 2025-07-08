import '../../styles/styles.css';
import RegisterPresenter from '../presenter/register-presenter';

class RegisterPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        /* Register Page Specific Styles */
        .auth-container {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .auth-card {
          background: var(--white);
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .auth-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
        }
        
        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .auth-header .logo {
          display: inline-flex;
          align-items: center;
          font-size: 24px;
          font-weight: 800;
          color: var(--primary);
          text-decoration: none;
          margin-bottom: 15px;
        }
        
        .auth-header .logo i {
          margin-right: 10px;
          font-size: 28px;
        }
        
        .auth-header h1 {
          color: var(--dark);
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .auth-header p {
          color: #666;
          font-size: 16px;
        }
        
        .form-group {
          margin-bottom: 20px;
          position: relative;
        }
        
        .form-group label {
          display: block;
          color: var(--dark);
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s;
          background-color: #f8f9fa;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          background-color: var(--white);
          box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
        }
        
        .form-input:valid {
          border-color: var(--success);
        }
        
        .form-input.error {
          border-color: var(--error);
          background-color: rgba(220, 53, 69, 0.05);
        }
        
        /* Password Strength Indicator */
        .password-strength {
          margin-top: 8px;
        }
        
        .strength-bars {
          display: flex;
          gap: 4px;
          margin-bottom: 5px;
        }
        
        .strength-bar {
          height: 4px;
          flex: 1;
          background-color: #ddd;
          border-radius: 2px;
          transition: background-color 0.3s;
        }
        
        .strength-text {
          font-size: 12px;
          font-weight: 500;
          color: #666;
        }
        
        /* Alert Styles */
        .alert {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
          display: none;
        }
        
        .alert-success {
          background-color: rgba(40, 167, 69, 0.1);
          color: var(--success);
          border: 1px solid rgba(40, 167, 69, 0.2);
        }
        
        .alert-error {
          background-color: rgba(220, 53, 69, 0.1);
          color: var(--error);
          border: 1px solid rgba(220, 53, 69, 0.2);
        }
        
        /* Button Styles */
        .btn {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          text-align: center;
          width: 100%;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: var(--white);
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
        }
        
        .btn-primary:active {
          transform: translateY(0);
        }
        
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
        }
        
        .auth-footer {
          text-align: center;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .auth-footer p {
          color: #666;
          font-size: 14px;
          margin-bottom: 10px;
        }
        
        .auth-footer a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }
        
        .auth-footer a:hover {
          color: var(--accent);
        }
        
        /* Loading Animation */
        .btn-loading {
          position: relative;
          color: transparent;
        }
        
        .btn-loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid var(--white);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        /* Back to Home Link */
        .back-home {
          position: absolute;
          top: 20px;
          left: 20px;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s;
        }
        
        .back-home:hover {
          background: rgba(255, 255, 255, 0.2);
          color: var(--white);
        }
        
        .back-home i {
          margin-right: 8px;
        }
        
        /* Responsive Design */
        @media (max-width: 480px) {
          .auth-container {
            padding: 15px;
          }
          
          .auth-card {
            padding: 25px;
          }
          
          .auth-header h1 {
            font-size: 24px;
          }
          
          .form-input {
            padding: 10px 14px;
            font-size: 14px;
          }
          
          .btn {
            padding: 10px 20px;
            font-size: 14px;
          }
          
          .back-home {
            position: static;
            display: inline-block;
            margin-bottom: 20px;
          }
        }
        
        /* Animation */
        .auth-card {
          animation: slideUp 0.6s ease-out;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Form Validation Visual Feedback */
        .form-group.success .form-input {
          border-color: var(--success);
        }
        
        .form-group.error .form-input {
          border-color: var(--error);
        }
        
        .validation-message {
          font-size: 12px;
          margin-top: 5px;
          color: var(--error);
          display: none;
        }
        
        .form-group.error .validation-message {
          display: block;
        }
      </style>

      <div class="auth-container">
        <a href="#/" class="back-home" data-link>
          <i class="fas fa-arrow-left"></i>
          Kembali ke Beranda
        </a>
        
        <div class="auth-card">
          <div class="auth-header">
            <a href="#/" class="logo" data-link>
              <i class="fas fa-book-open"></i>
              Cerita Kita
            </a>
            <h1>Daftar Akun</h1>
            <p>Bergabunglah dengan komunitas pencerita Indonesia</p>
          </div>

          <div id="alertMessage" class="alert"></div>

          <form id="registerForm">
            <div class="form-group">
              <label for="name">Nama Lengkap</label>
              <input 
                type="text" 
                id="name" 
                class="form-input" 
                placeholder="Masukkan nama lengkap Anda"
                required
                minlength="2"
                maxlength="50"
              >
              <div class="validation-message">Nama harus antara 2-50 karakter</div>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                class="form-input" 
                placeholder="contoh@email.com"
                required
              >
              <div class="validation-message">Format email tidak valid</div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                class="form-input" 
                placeholder="Minimal 8 karakter"
                required
                minlength="8"
              >
              <div class="password-strength">
                <div class="strength-bars">
                  <div id="bar1" class="strength-bar"></div>
                  <div id="bar2" class="strength-bar"></div>
                  <div id="bar3" class="strength-bar"></div>
                </div>
                <div id="passwordStrength" class="strength-text">Belum diisi</div>
              </div>
              <div class="validation-message">Password minimal 8 karakter</div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Konfirmasi Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                class="form-input" 
                placeholder="Ulangi password Anda"
                required
              >
              <div class="validation-message">Password tidak cocok</div>
            </div>

            <button type="submit" class="btn btn-primary" id="registerBtn">
              Daftar Sekarang
            </button>
          </form>

          <div class="auth-footer">
            <p>Sudah punya akun?</p>
            <a href="#/masuk" data-link>Masuk di sini</a>
          </div>
        </div>
      </div>
    `;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    const form = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const alertMessage = document.getElementById('alertMessage');
    const passwordStrengthText = document.getElementById('passwordStrength');
    const registerBtn = document.getElementById('registerBtn');
    const strengthBars = [
      document.getElementById('bar1'),
      document.getElementById('bar2'),
      document.getElementById('bar3'),
    ];

    // Password strength indicator
    const updateStrengthIndicator = (strength) => {
      strengthBars.forEach(bar => bar.style.backgroundColor = '#ddd');

      if (strength === 0) {
        passwordStrengthText.textContent = 'Belum diisi';
        passwordStrengthText.style.color = '#666';
      } else if (strength <= 1) {
        strengthBars[0].style.backgroundColor = 'red';
        passwordStrengthText.textContent = 'Lemah';
        passwordStrengthText.style.color = 'red';
      } else if (strength === 2) {
        strengthBars[0].style.backgroundColor = 'orange';
        strengthBars[1].style.backgroundColor = 'orange';
        passwordStrengthText.textContent = 'Sedang';
        passwordStrengthText.style.color = 'orange';
      } else {
        strengthBars.forEach(bar => (bar.style.backgroundColor = 'green'));
        passwordStrengthText.textContent = 'Kuat';
        passwordStrengthText.style.color = 'green';
      }
    };

    // Real-time validation
    const validateField = (input, validationFn) => {
      const formGroup = input.parentElement;
      const isValid = validationFn(input.value);
      
      formGroup.classList.toggle('error', !isValid);
      formGroup.classList.toggle('success', isValid);
    };

    // Validation functions
    const isValidName = (name) => name.trim().length >= 2 && name.trim().length <= 50;
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) => password.length >= 8;
    const isPasswordMatch = (password, confirmPassword) => password === confirmPassword;

    // Event listeners
    passwordInput.addEventListener('input', () => {
      const strength = RegisterPresenter?.checkPasswordStrength(passwordInput.value) || this.checkPasswordStrength(passwordInput.value);
      updateStrengthIndicator(strength);
      validateField(passwordInput, isValidPassword);
    });

    document.getElementById('name').addEventListener('blur', (e) => {
      validateField(e.target, isValidName);
    });

    document.getElementById('email').addEventListener('blur', (e) => {
      validateField(e.target, isValidEmail);
    });

    confirmPasswordInput.addEventListener('input', () => {
      validateField(confirmPasswordInput, (value) => 
        isPasswordMatch(passwordInput.value, value)
      );
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      alertMessage.style.display = 'none';

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      // Validate all fields
      const isFormValid = 
        isValidName(name) &&
        isValidEmail(email) &&
        isValidPassword(password) &&
        isPasswordMatch(password, confirmPassword);

      if (!isFormValid) {
        alertMessage.textContent = 'Mohon periksa kembali data yang Anda masukkan';
        alertMessage.className = 'alert alert-error';
        alertMessage.style.display = 'block';
        return;
      }

      // Show loading state
      registerBtn.classList.add('btn-loading');
      registerBtn.disabled = true;

      try {
        const response = await (RegisterPresenter?.register(name, email, password, confirmPassword) || 
          this.mockRegister(name, email, password, confirmPassword));

        alertMessage.textContent = response.message;
        alertMessage.className = `alert ${response.error ? 'alert-error' : 'alert-success'}`;
        alertMessage.style.display = 'block';

        if (!response.error) {
          form.reset();
          updateStrengthIndicator(0);
          
          // Clear validation states
          document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error', 'success');
          });

          setTimeout(() => {
            window.location.hash = '#/masuk';
          }, 1500);
        }
      } catch (error) {
        alertMessage.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
        alertMessage.className = 'alert alert-error';
        alertMessage.style.display = 'block';
      } finally {
        // Remove loading state
        registerBtn.classList.remove('btn-loading');
        registerBtn.disabled = false;
      }
    });
  }

  // Fallback password strength checker
  checkPasswordStrength(password) {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return Math.min(strength, 3);
  }

  // Mock register function as fallback
  async mockRegister(name, email, password, confirmPassword) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password !== confirmPassword) {
      return { error: true, message: 'Password tidak cocok' };
    }
    
    if (password.length < 8) {
      return { error: true, message: 'Password minimal 8 karakter' };
    }
    
    // Simulate successful registration
    return { error: false, message: 'Registrasi berhasil! Silakan masuk dengan akun Anda.' };
  }
}

if (!customElements.get('register-page')) {
  customElements.define('register-page', RegisterPage);
}

export default RegisterPage;
