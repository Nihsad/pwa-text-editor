import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const newItem = { content };
    await store.add(newItem);
    console.log('Content added to database');
  } catch (error) {
    console.error('Error adding content to database:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allItems = await store.getAll();
    console.log('Content retrieved from database:', allItems);
    return allItems;
  } catch (error) {
    console.error('Error getting content from database:', error);
    return [];
  }
};

initdb();
