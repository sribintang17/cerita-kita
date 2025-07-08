import { loginUser } from '../data/api.js';

const LoginPresenter = {
  async login(email, password) {
    if (!email || !password) {
      return {
        error: true,
        message: 'Email dan kata sandi harus diisi.',
      };
    }

    if (password.length < 8) {
      return {
        error: true,
        message: 'Kata sandi minimal 8 karakter.',
      };
    }

    return await loginUser(email, password);
  }
};

export default LoginPresenter;
