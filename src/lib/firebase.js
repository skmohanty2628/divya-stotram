'use client';

import { initializeApp, getApps } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
  onDisconnect,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
let database;

function initFirebase() {
  if (typeof window === 'undefined') return null;

  try {
    const hasRequiredConfig =
      firebaseConfig.apiKey &&
      firebaseConfig.databaseURL &&
      firebaseConfig.projectId &&
      firebaseConfig.appId;

    if (!hasRequiredConfig) return null;

    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    database = getDatabase(app);
    return database;
  } catch (error) {
    console.error('Firebase init error:', error);
    return null;
  }
}

function getSessionId() {
  if (typeof window === 'undefined') return 'server';

  let sessionId = sessionStorage.getItem('ds_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem('ds_session_id', sessionId);
  }
  return sessionId;
}

function normalizeSlug(slug) {
  if (!slug || slug === '/') return 'home';
  return String(slug).replace(/^\/+/, '').replace(/\//g, '-');
}

function registerPresence(slug) {
  const db = initFirebase();
  if (!db) return () => {};

  const safeSlug = normalizeSlug(slug);
  const sessionId = getSessionId();
  const presenceRef = ref(db, `presence/${safeSlug}/${sessionId}`);

  set(presenceRef, {
    ts: Date.now(),
    page: safeSlug,
  }).catch((error) => {
    console.error('Presence set failed:', error);
  });

  try {
    onDisconnect(presenceRef).remove();
  } catch (error) {
    console.warn('onDisconnect setup failed:', error);
  }

  const cleanup = () => {
    set(presenceRef, null).catch(() => {});
  };

  window.addEventListener('beforeunload', cleanup);

  return () => {
    cleanup();
    window.removeEventListener('beforeunload', cleanup);
  };
}

export async function trackPageVisit(slug) {
  const db = initFirebase();
  if (!db) return;

  const safeSlug = normalizeSlug(slug);
  const sessionId = getSessionId();

  try {
    const visitFlagRef = ref(db, `sessionPageViews/${safeSlug}/${sessionId}`);
    const visitSnap = await get(visitFlagRef);

    if (!visitSnap.exists()) {
      await set(visitFlagRef, { ts: Date.now() });

      const pageRef = ref(db, `pageViews/${safeSlug}`);
      const pageSnap = await get(pageRef);
      await set(pageRef, (pageSnap.val() || 0) + 1);

      const totalRef = ref(db, 'stats/totalVisits');
      const totalSnap = await get(totalRef);
      await set(totalRef, (totalSnap.val() || 0) + 1);
    }
  } catch (error) {
    console.error('trackPageVisit failed:', error);
  }
}

export function watchPagePresence(slug, callback) {
  const db = initFirebase();
  if (!db) {
    callback(0);
    return () => {};
  }

  const safeSlug = normalizeSlug(slug);
  const cleanupPresence = registerPresence(safeSlug);
  const pagePresenceRef = ref(db, `presence/${safeSlug}`);

  const unsub = onValue(pagePresenceRef, (snap) => {
    const data = snap.val();
    callback(data ? Object.keys(data).length : 0);
  });

  return () => {
    cleanupPresence();
    unsub();
  };
}

export function trackAndWatch(slug, callback) {
  trackPageVisit(slug);
  return watchPagePresence(slug, callback);
}

export function watchLiveTotal(callback) {
  const db = initFirebase();
  if (!db) {
    callback(0);
    return () => {};
  }

  const presenceRef = ref(db, 'presence');

  const unsub = onValue(presenceRef, (snap) => {
    if (!snap.exists()) {
      callback(0);
      return;
    }

    let total = 0;

    snap.forEach((pageSnap) => {
      const pageData = pageSnap.val();
      if (pageData && typeof pageData === 'object') {
        total += Object.keys(pageData).length;
      }
    });

    callback(total);
  });

  return unsub;
}

export function watchTotalVisits(callback) {
  const db = initFirebase();
  if (!db) {
    callback(0);
    return () => {};
  }

  const totalRef = ref(db, 'stats/totalVisits');
  const unsub = onValue(totalRef, (snap) => {
    callback(snap.val() || 0);
  });

  return unsub;
}

export function watchPageViews(callback) {
  const db = initFirebase();
  if (!db) {
    callback({});
    return () => {};
  }

  const pageViewsRef = ref(db, 'pageViews');
  const unsub = onValue(pageViewsRef, (snap) => {
    callback(snap.val() || {});
  });

  return unsub;
}

export function logSearch(query) {
  const db = initFirebase();
  if (!db || !query?.trim()) return;

  const key = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  set(ref(db, `searches/${key}`), {
    query: query.trim(),
    ts: Date.now(),
  }).catch((error) => {
    console.error('logSearch failed:', error);
  });
}