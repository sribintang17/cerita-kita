import { registerUser } from '../data/auth-api.js';

const RegisterPresenter = {
  async register(name, email, password, confirmPassword) {
    if (!name || !email || !password || !confirmPassword) {
      return { error: true, message: 'Semua field wajib diisi.' };
    }

    if (password !== confirmPassword) {
      return { error: true, message: 'Kata sandi dan konfirmasi tidak cocok.' };
    }

    const strength = this.checkPasswordStrength(password);
    if (strength < 3) {
      return { error: true, message: 'Kata sandi terlalu lemah.' };
    }

    return await registerUser({ name, email, password });
  },

  checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  },
};

export default RegisterPresenter;
