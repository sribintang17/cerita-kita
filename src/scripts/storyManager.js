const stories = [
  {
    id: 1,
    title: "Cerita Contoh Pertama",
    author: "Budi",
    date: "2025-05-22",
    content: "Ini adalah isi cerita pertama contoh.",
    imageUrl: "/images/story1.jpg",
    likes: 10,
    comments: [
      { id: 1, text: "Komentar pertama!" },
      { id: 2, text: "Saya suka ceritanya." }
    ],
    categories: ["Petualangan", "Inspirasi"],
    location: { lat: -6.2, lng: 106.816666, name: "Jakarta" }
  },
  {
    id: 2,
    title: "Cerita Contoh Kedua",
    author: "Sari",
    date: "2025-05-20",
    content: "Ini adalah isi cerita kedua contoh.",
    imageUrl: "/images/story2.jpg",
    likes: 5,
    comments: [{ id: 1, text: "Seru banget!" }],
    categories: ["Romantis"],
    location: { lat: -7.25, lng: 112.75, name: "Surabaya" }
  },
  // Tambah data cerita lain sesuai kebutuhan
];

const storyManager = {
  getStoryById(id) {
    return stories.find(story => story.id === id);
  },

  getAllStories() {
    return stories;
  },

  updateStory(updatedStory) {
    const index = stories.findIndex(story => story.id === updatedStory.id);
    if (index !== -1) {
      stories[index] = updatedStory;
    }
  }
};

export default storyManager;
