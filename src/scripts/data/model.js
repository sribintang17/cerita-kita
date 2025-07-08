import { getAllStories, getStoryDetail, postStory } from './api.js';
import { getToken } from './auth-api.js';

const StoryModel = {
  _stories: [],

  async fetchStories(page = 1, size = 6, location = 0) {
    try {
      const response = await getAllStories(page, size, location);
      if (!response.error) {
        this._stories = response.listStory || [];
        return { error: false, stories: this._stories };
      }
      return { error: true, message: response.message || 'Gagal memuat cerita' };
    } catch (error) {
      console.error('Model: Gagal memuat cerita', error);
      return { error: true, message: 'Gagal memuat cerita' };
    }
  },

  async fetchStoriesWithLocation() {
    const token = getToken();
    if (!token) {
      console.warn('Token tidak ditemukan. Silakan login.');
      return [];
    }
    try {
      const response = await fetch('https://story-api.dicoding.dev/v1/stories?location=1', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data && data.listStory) {
        return data.listStory.filter(story => story.lat && story.lon);
      }
      return [];
    } catch (error) {
      console.error('Model: Gagal memuat cerita dengan lokasi', error);
      return [];
    }
  },

  async fetchStoryDetail(id) {
    try {
      const response = await getStoryDetail(id);
      if (!response.error) {
        return { error: false, story: response.story };
      }
      return { error: true, message: response.message || 'Gagal memuat detail cerita' };
    } catch (error) {
      console.error('Model: Gagal memuat detail cerita', error);
      return { error: true, message: 'Gagal memuat detail cerita' };
    }
  },

  async addStory(formData) {
    try {
      const response = await postStory(formData);
      return response;
    } catch (error) {
      console.error('Model: Gagal mengirim cerita', error);
      return { error: true, message: 'Gagal mengirim cerita' };
    }
  },

  getStories() {
    return this._stories || [];
  },

  getStoryById(id) {
    return this._stories?.find((story) => story.id === id) || null;
  },

  clearStories() {
    this._stories = [];
  },
};

export default StoryModel;
