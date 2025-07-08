// src/scripts/data/api.js

import CONFIG from '../config.js';
import { getToken } from './auth-api.js';

const ENDPOINTS = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
};

// GET: Ambil semua cerita
export async function getAllStories(page = 1, size = 10, location = 0) {
  try {
    const token = getToken();
    if (!token) {
      return { error: true, message: 'Token tidak ditemukan. Silakan login terlebih dahulu.' };
    }

    const url = new URL(ENDPOINTS.STORIES);
    url.searchParams.append('page', page);
    url.searchParams.append('size', size);
    url.searchParams.append('location', location);

    const response = await fetch(url.href, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: true, message: result.message || 'Gagal memuat cerita.' };
    }

    return result;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return { error: true, message: 'Gagal memuat cerita.' };
  }
}

// GET: Ambil detail cerita dengan wrapper
export async function getStoryDetail(id) {
  try {
    const token = getToken();
    if (!token) {
      return { error: true, message: 'Token tidak ditemukan. Silakan login terlebih dahulu.' };
    }

    const response = await fetch(ENDPOINTS.STORY_DETAIL(id), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: true, message: result.message || 'Gagal memuat detail cerita.' };
    }

    return result;
  } catch (error) {
    console.error('Error fetching story detail:', error);
    return { error: true, message: 'Gagal memuat detail cerita.' };
  }
}

// GET: Ambil detail cerita dan mengembalikan langsung object story
export async function getStoryById(id) {
  const result = await getStoryDetail(id);
  if (result.error) {
    throw new Error(result.message || 'Cerita tidak ditemukan.');
  }
  return result.story;
}

// POST: Kirim cerita dengan FormData
export async function postStory(formData) {
  try {
    const token = getToken();
    if (!token) {
      return { error: true, message: 'Token tidak ditemukan. Silakan login terlebih dahulu.' };
    }

    const response = await fetch(ENDPOINTS.STORIES, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // FormData akan mengatur boundary otomatis
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: true, message: result.message || 'Gagal mengirim cerita.' };
    }

    return result;
  } catch (error) {
    console.error('Error posting story:', error);
    return { error: true, message: 'Gagal mengirim cerita.' };
  }
}
