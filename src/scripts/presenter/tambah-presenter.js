import { postStory } from '../data/api.js';
import { getToken } from '../data/auth-api.js';

const TambahPresenter = {
  async submit(formData) {
    const token = getToken();
    if (!token) {
      return { error: true, message: 'Anda harus login terlebih dahulu.' };
    }

    try {
      const response = await postStory(formData);
      if (response?.error === false) {
        return { error: false, message: 'Cerita berhasil dikirim!' };
      } else {
        return { error: true, message: response?.message || 'Gagal mengirim cerita.' };
      }
    } catch (err) {
      return { error: true, message: err.message || 'Terjadi kesalahan saat mengirim cerita.' };
    }
  }
};

export default TambahPresenter;
