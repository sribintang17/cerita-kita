const HomeView = {
  init({ contentContainer }) {
    this._contentContainer = contentContainer;
  },

  showLoading() {
    this._contentContainer.innerHTML = `<p style="text-align:center;">Memuat cerita...</p>`;
  },

  showError(message = 'Gagal memuat cerita. Silakan muat ulang halaman.') {
    this._contentContainer.innerHTML = `<p style="text-align:center; color:red;">${message}</p>`;
  },

  showEmpty() {
    this._contentContainer.innerHTML = `<p style="text-align:center;">Tidak ada cerita untuk ditampilkan.</p>`;
  },

  renderStories(stories) {
    this._contentContainer.innerHTML = '';

    stories.forEach((story) => {
      const card = document.createElement('div');
      card.className = 'feature-card';
      card.innerHTML = `
        <div class="feature-image">
          <img src="${story.photoUrl}" alt="${story.name}" loading="lazy" />
        </div>
        <div class="feature-content">
          <h3>${story.name}</h3>
          <p>${story.description.length > 120 ? story.description.slice(0, 120) + '...' : story.description}</p>
          <div class="feature-meta">
            <span><i class="fas fa-user"></i> ${story.name}</span>
            <span><i class="fas fa-calendar-alt"></i> ${new Date(story.createdAt).toLocaleDateString('id-ID')}</span>
          </div>
          <a href="#/detail-cerita?id=${story.id}" class="btn btn-detail">Lihat Detail</a>
        </div>
      `;
      this._contentContainer.appendChild(card);
    });
  },
};

export default HomeView;
