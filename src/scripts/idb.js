import { openDB } from "idb";

const dbPromise = openDB("cerita-kita-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("cerita")) {
      db.createObjectStore("cerita", { keyPath: "id", autoIncrement: true });
    }
  },
});

export const IndexedDBHelper = {
  async addCerita(cerita) {
    const db = await dbPromise;
    await db.add("cerita", cerita);
  },
  async getAllCerita() {
    const db = await dbPromise;
    return await db.getAll("cerita");
  },
  async deleteCerita(id) {
    const db = await dbPromise;
    return await db.delete("cerita", id);
  }
};
