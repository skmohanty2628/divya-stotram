'use client';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue, set, increment, onDisconnect } from 'firebase/database';

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

function registerPresence(slug) {
  const db = initFirebase();
  if (!db) return () => {};

  const sessionId = getSessionId();
  const presenceRef = ref(db, `presence/${slug}/${sessionId}`);

  set(presenceRef, {
    ts: Date.now(),
    page: slug,
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

export function trackPageVisit(slug) {
  const db = initFirebase();
  if (!db) return;

  const sessionId = getSessionId();
  const visitFlagRef = ref(db, `sessionPageViews/${slug}/${sessionId}`);

  onValue(
    visitFlagRef,
    (snap) => {
      if (!snap.exists()) {
        set(visitFlagRef, { ts: Date.now() });
        set(ref(db, `pageViews/${slug}`), increment(1));
        set(ref(db, 'stats/totalVisits'), increment(1));
      }
    },
    {
      onlyOnce: true,
    }
  );
}

export function watchPagePresence(slug, callback) {
  const db = initFirebase();
  if (!db) {
    callback(0);
    return () => {};
  }

  const cleanupPresence = registerPresence(slug);
  const pagePresenceRef = ref(db, `presence/${slug}`);

  const unsub = onValue(pagePresenceRef, (snap) => {
    const data = snap.val();
    callback(data ? Object.keys(data).length : 0);
  });

  return () => {
    cleanupPresence();
    unsub();
  };
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
  const searchRef = ref(db, `searches/${key}`);

  set(searchRef, {
    query: query.trim(),
    ts: Date.now(),
  });
}