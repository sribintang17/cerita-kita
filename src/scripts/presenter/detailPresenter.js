import { getStoryDetail } from '../data/api.js';

const DetailPresenter = {
  async fetchDetail(storyId) {
    try {
      const response = await getStoryDetail(storyId);
      if (response.error) throw new Error(response.message);
      return response.story;
    } catch (err) {
      throw err;
    }
  },
};

export default DetailPresenter;
