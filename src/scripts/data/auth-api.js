import CONFIG from '../config.js';

export async function registerUser({ name, email, password }) {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      return { error: true, message: result.message || 'Gagal registrasi.' };
    }

    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      error: true,
      message: 'Gagal terhubung ke server.',
    };
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      return { error: true, message: result.message || 'Gagal login.' };
    }

    if (result.loginResult?.token) {
      saveToken(result.loginResult.token);
    }

    return result;
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      error: true,
      message: 'Gagal terhubung ke server.',
    };
  }
}

export function saveToken(token) {
  localStorage.setItem('storyapp_token', token);
}

export function getToken() {
  return localStorage.getItem('storyapp_token');
}

export function removeToken() {
  localStorage.removeItem('storyapp_token');
}

export function isTokenValid() {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}
