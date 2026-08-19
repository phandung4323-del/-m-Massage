// Dual Server & Local Storage for Product Video

const DB_NAME = 'SMallLocalMediaDB';
const STORE_NAME = 'media';
const VIDEO_KEY = 'uploaded_product_video';

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

export async function saveLocalVideo(file: File | Blob): Promise<string> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, VIDEO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Local indexedDB save warning:', e);
  }
  return URL.createObjectURL(file);
}

export async function getSavedLocalVideo(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(VIDEO_KEY);
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

export async function uploadVideoToServer(file: File): Promise<string> {
  // Save locally first for instant playback
  await saveLocalVideo(file);

  const formData = new FormData();
  formData.append('video', file);

  try {
    const res = await fetch('/api/upload-video', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.url) return data.url;
    }
  } catch (err) {
    console.warn('Server upload failed, falling back to local storage:', err);
  }

  const localUrl = await getSavedLocalVideo();
  return localUrl || URL.createObjectURL(file);
}

export async function getServerVideoUrl(): Promise<string | null> {
  try {
    const res = await fetch('/api/video-status');
    if (res.ok) {
      const data = await res.json();
      if (data.exists && data.url) {
        return data.url;
      }
    }
  } catch (err) {
    console.warn('Server video check error:', err);
  }

  // Fallback to local DB
  return await getSavedLocalVideo();
}
