import '../../styles/styles.css';
import DetailPresenter from '../presenter/detailPresenter.js';

const StoryDetail = {
  render() {
    return `
      <section class="story-detail">
        <h1 id="story-title"></h1>
        <div class="story-meta">
          <span id="story-author"></span> • <span id="story-date"></span>
        </div>
        <img id="story-image" class="story-img" alt="" />
        <p id="story-text"></p>
        <div id="story-map" style="height: 300px; margin-top: 1rem;"></div>
      </section>
    `;
  },

  async afterRender() {
    const storyId = this._getStoryId();
    if (!storyId) {
      alert('ID cerita tidak ditemukan.');
      window.location.hash = '#/';
      return;
    }

    try {
      const story = await DetailPresenter.fetchDetail(storyId);
      this._renderStory(story);
    } catch (error) {
      console.error('Gagal memuat detail cerita:', error.message);
      alert('Gagal memuat detail cerita.');
      window.location.hash = '#/';
    }
  },

  _getStoryId() {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    return urlParams.get('id');
  },

  _renderStory(story) {
    document.getElementById('story-title').textContent = story.name;
    document.getElementById('story-author').textContent = story.name;
    document.getElementById('story-date').textContent = this._formatDate(story.createdAt);
    document.getElementById('story-text').textContent = story.description;

    const imageEl = document.getElementById('story-image');
    imageEl.src = story.photoUrl;
    imageEl.alt = story.name;

    if (typeof L !== 'undefined' && story.lat && story.lon) {
      const map = L.map('story-map').setView([story.lat, story.lon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      L.marker([story.lat, story.lon])
        .addTo(map)
        .bindPopup(story.name)
        .openPopup();
    }
  },

  _formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
};

export default StoryDetail;
