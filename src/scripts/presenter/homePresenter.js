import StoryModel from '../data/model.js';
import { getToken } from '../data/auth-api.js';
import HomeView from '../views/homeView.js';

const HomePresenter = {
  async init({ contentContainer }) {
    HomeView.init({ contentContainer });
    HomeView.showLoading();

    try {
      const result = await StoryModel.fetchStories(1, 6);
      if (!result.error) {
        const stories = StoryModel.getStories();
        if (stories.length === 0) {
          HomeView.showEmpty();
        } else {
          HomeView.renderStories(stories);
        }
      } else {
        HomeView.showError(result.message);
      }
    } catch (error) {
      console.error('Gagal memuat cerita:', error);
      HomeView.showError('Terjadi kesalahan saat memuat data.');
    }
  },

  async getStoriesWithLocation() {
    return StoryModel.fetchStoriesWithLocation();
  }
};

export default HomePresenter;
