/**
 * Unified Video Storage System:
 * 1. IndexedDB: fast client-side cache so user never loses their files
 * 2. Server API: uploads to /public/videos/ and registers links so ALL visitors can watch
 */

export interface StoredVideo {
  id: string; // Tutorial ID
  blob: Blob;
  name: string;
  type: string;
  size: number;
  updatedAt: number;
}

export interface ServerVideosResponse {
  hostedVideos: string[];
  videoLinks: Record<string, { url?: string; name?: string; updatedAt?: number }>;
}

const DB_NAME = '3dfx_video_db';
const DB_VERSION = 1;
const STORE_NAME = 'custom_videos';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomVideo(id: string, file: File | Blob, name?: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const fileName = name || (file as File).name || `${id}.mp4`;
    const record: StoredVideo = {
      id,
      blob: file,
      name: fileName,
      type: file.type || 'video/mp4',
      size: file.size,
      updatedAt: Date.now(),
    };
    const request = store.put(record);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getCustomVideo(id: string): Promise<StoredVideo | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Failed to load custom video from IndexedDB:', error);
    return null;
  }
}

export async function getAllCustomVideos(): Promise<StoredVideo[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Failed to get all videos from IndexedDB:', error);
    return [];
  }
}

export async function deleteCustomVideo(id: string): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Failed to delete custom video from IndexedDB:', error);
  }
}

// ----------------- Server API Integrations -----------------

export async function fetchServerVideos(): Promise<ServerVideosResponse> {
  try {
    const res = await fetch('/api/videos');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // If running in pure static mode or offline, fallback to empty
    return { hostedVideos: [], videoLinks: {} };
  }
}

export async function uploadVideoToServer(id: string, fileOrBlob: Blob, filename?: string): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const name = filename || `${id}.mp4`;
    const res = await fetch(`/api/videos/upload?id=${encodeURIComponent(id)}&filename=${encodeURIComponent(name)}`, {
      method: 'POST',
      headers: {
        'Content-Type': fileOrBlob.type || 'video/mp4',
      },
      body: fileOrBlob,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Upload failed with status ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    console.error('Failed to upload video to server:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}

export async function saveExternalVideoLink(id: string, url: string, name?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/videos/link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, url, name }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Link failed with status ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    console.error('Failed to save external video link:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}

export async function deleteServerVideo(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/videos/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to delete video on server:', err);
    return false;
  }
}
