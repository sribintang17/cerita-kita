const DB_NAME = 'cerita-kita-db';
const DB_VERSION = 1;

// Object stores
const STORES = {
  FAVORITE_STORIES: 'favorite-stories',
  OFFLINE_STORIES: 'offline-stories',
  CACHED_STORIES: 'cached-stories'
};

class DatabaseHelper {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Store untuk cerita favorit
        if (!db.objectStoreNames.contains(STORES.FAVORITE_STORIES)) {
          const favoriteStore = db.createObjectStore(STORES.FAVORITE_STORIES, {
            keyPath: 'id'
          });
          favoriteStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Store untuk cerita offline (draft)
        if (!db.objectStoreNames.contains(STORES.OFFLINE_STORIES)) {
          const offlineStore = db.createObjectStore(STORES.OFFLINE_STORIES, {
            keyPath: 'id',
            autoIncrement: true
          });
          offlineStore.createIndex('createdAt', 'createdAt', { unique: false });
          offlineStore.createIndex('status', 'status', { unique: false });
        }

        // Store untuk cache cerita dari API
        if (!db.objectStoreNames.contains(STORES.CACHED_STORIES)) {
          const cacheStore = db.createObjectStore(STORES.CACHED_STORIES, {
            keyPath: 'id'
          });
          cacheStore.createIndex('createdAt', 'createdAt', { unique: false });
          cacheStore.createIndex('cachedAt', 'cachedAt', { unique: false });
        }
      };
    });
  }

  async getStore(storeName, mode = 'readonly') {
    if (!this.db) await this.init();
    const transaction = this.db.transaction([storeName], mode);
    return transaction.objectStore(storeName);
  }

  // === FAVORITE STORIES ===
  async addFavoriteStory(story) {
    const store = await this.getStore(STORES.FAVORITE_STORIES, 'readwrite');
    const favoriteStory = {
      ...story,
      favoritedAt: new Date().toISOString()
    };
    return store.add(favoriteStory);
  }

  async removeFavoriteStory(storyId) {
    const store = await this.getStore(STORES.FAVORITE_STORIES, 'readwrite');
    return store.delete(storyId);
  }

  async getFavoriteStories() {
    const store = await this.getStore(STORES.FAVORITE_STORIES);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async isFavoriteStory(storyId) {
    const store = await this.getStore(STORES.FAVORITE_STORIES);
    return new Promise((resolve, reject) => {
      const request = store.get(storyId);
      request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // === OFFLINE STORIES ===
  async addOfflineStory(story) {
    const store = await this.getStore(STORES.OFFLINE_STORIES, 'readwrite');
    const offlineStory = {
      ...story,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    return store.add(offlineStory);
  }

  async getOfflineStories() {
    const store = await this.getStore(STORES.OFFLINE_STORIES);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateOfflineStory(id, updates) {
    const store = await this.getStore(STORES.OFFLINE_STORIES, 'readwrite');
    return new Promise((resolve, reject) => {
      const getRequest = store.get(id);
      getRequest.onsuccess = () => {
        const story = getRequest.result;
        if (story) {
          const updatedStory = { ...story, ...updates };
          const putRequest = store.put(updatedStory);
          putRequest.onsuccess = () => resolve(putRequest.result);
          putRequest.onerror = () => reject(putRequest.error);
        } else {
          reject(new Error('Story not found'));
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async deleteOfflineStory(id) {
    const store = await this.getStore(STORES.OFFLINE_STORIES, 'readwrite');
    return store.delete(id);
  }

  // === CACHED STORIES ===
  async cacheStories(stories) {
    const store = await this.getStore(STORES.CACHED_STORIES, 'readwrite');
    const cachedAt = new Date().toISOString();
    
    const promises = stories.map(story => {
      const cachedStory = {
        ...story,
        cachedAt
      };
      return store.put(cachedStory);
    });

    return Promise.all(promises);
  }

  async getCachedStories() {
    const store = await this.getStore(STORES.CACHED_STORIES);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async clearExpiredCache(maxAge = 24 * 60 * 60 * 1000) { // 24 hours
    const store = await this.getStore(STORES.CACHED_STORIES, 'readwrite');
    const cutoffTime = new Date(Date.now() - maxAge).toISOString();
    
    return new Promise((resolve, reject) => {
      const index = store.index('cachedAt');
      const request = index.openCursor(IDBKeyRange.upperBound(cutoffTime));
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  // === UTILITY METHODS ===
  async clearAllData() {
    const storeNames = Object.values(STORES);
    const promises = storeNames.map(async (storeName) => {
      const store = await this.getStore(storeName, 'readwrite');
      return store.clear();
    });
    return Promise.all(promises);
  }

  async getStorageUsage() {
    const usage = {};
    const storeNames = Object.values(STORES);
    
    for (const storeName of storeNames) {
      const store = await this.getStore(storeName);
      usage[storeName] = await new Promise((resolve, reject) => {
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    
    return usage;
  }
}

// Export singleton instance
export const dbHelper = new DatabaseHelper();