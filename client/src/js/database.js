import { openDB } from 'idb';

// Function to initialize the IndexedDB database
const initDB = async () => {
  try {
    // Open or create the 'jate' database with version 1
    const db = await openDB('jate', 1, {
      upgrade(db) {
        // Create an object store named 'jate' with auto-incrementing key
        if (!db.objectStoreNames.contains('jate')) {
          const store = db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
          // Optionally, add indexes or perform other schema changes here
          console.log('jate database created');
        }
      },
    });
    return db;
  } catch (error) {
    console.error('Error initializing IndexedDB:', error);
    throw error; // Rethrow the error for handling in higher-level code
  }
};

// Function to add content to the database
export const putDb = async (content) => {
  try {
    // Initialize the database
    const db = await initDB();
    // Start a read-write transaction
    const tx = db.transaction('jate', 'readwrite');
    // Access the object store
    const store = tx.objectStore('jate');
    // Add the content to the object store
    await store.add({ content });
  } catch (error) {
    console.error('Error adding content to IndexedDB:', error);
    throw error; // Rethrow the error for handling in higher-level code
  }
};

// Function to get all content from the database
export const getDb = async () => {
  try {
    // Initialize the database
    const db = await initDB();
    // Start a read-only transaction
    const tx = db.transaction('jate', 'readonly');
    // Access the object store
    const store = tx.objectStore('jate');
    // Retrieve all content from the object store
    const data = await store.getAll();
    // Ensure the content is a string before returning
    return data && data.length ? data[0].content : '';
  } catch (error) {
    console.error('Error retrieving content from IndexedDB:', error);
    throw error; // Rethrow the error for handling in higher-level code
  }
};

// Immediately initialize the database when this module is loaded
initDB();
