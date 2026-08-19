// Video Storage Service using IndexedDB for storing custom uploaded videos & video URLs locally

const DB_NAME = 'SMallVideoDB';
const STORE_NAME = 'videos';
const KEY = 'product_showcase_video';
const URL_KEY = 'product_showcase_video_url';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveVideoBlob(file: File | Blob): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(file, KEY);
    req.onsuccess = () => {
      const blobUrl = URL.createObjectURL(file);
      resolve(blobUrl);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function loadSavedVideoBlob(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY);
      req.onsuccess = () => {
        const result = req.result;
        if (result && result instanceof Blob) {
          const blobUrl = URL.createObjectURL(result);
          resolve(blobUrl);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export function saveVideoUrl(url: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(URL_KEY, url);
  }
}

export function loadSavedVideoUrl(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(URL_KEY) || '';
  }
  return '';
}
