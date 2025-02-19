// src/utils/db.ts
import { openDB, DBSchema } from 'idb';

interface QuizDB extends DBSchema {
  attempts: {
    key: number;
    value: {
      id?: number;
      score: number;
      total: number;
      timestamp: number;
    };
    indexes: { 'by-timestamp': number };
  };
}

export const dbPromise = openDB<QuizDB>('quiz-db', 1, {
  upgrade(db) {
    const store = db.createObjectStore('attempts', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('by-timestamp', 'timestamp');
  },
});

export async function addAttempt(score: number, total: number) {
  const db = await dbPromise;
  const attempt = { score, total, timestamp: Date.now() };
  await db.add('attempts', attempt);
}

export async function getAttempts() {
  const db = await dbPromise;
  const attempts = await db.getAll('attempts');
  // Sort attempts by timestamp descending (most recent first)
  return attempts.sort((a, b) => b.timestamp - a.timestamp);
}

export const deleteAttempts = async () => {
  const db = await openDB('quiz-db', 1, {
    upgrade(db) {
      db.createObjectStore('attempts', { keyPath: 'id', autoIncrement: true });
    },
  });

  const tx = db.transaction('attempts', 'readwrite');
  await tx.store.clear();
  await tx.done;
};
