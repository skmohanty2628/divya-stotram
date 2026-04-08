'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TrackVisit() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Don't track admin routes
    if (pathname === '/admin' || pathname.startsWith('/admin')) return;

    let cleanup = null;

    const track = async () => {
      try {
        const { initializeApp, getApps } = await import('firebase/app');
        const {
          getDatabase,
          ref,
          set,
          get,
          onDisconnect,
        } = await import('firebase/database');

        const config = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        if (!config.apiKey || !config.databaseURL || !config.projectId || !config.appId) {
          console.log('Firebase not configured');
          return;
        }

        const app = getApps().length ? getApps()[0] : initializeApp(config);
        const db = getDatabase(app);

        // One session per browser tab
        let sid = sessionStorage.getItem('_ds_sid');
        if (!sid) {
          sid = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
          sessionStorage.setItem('_ds_sid', sid);
        }

        const page = pathname === '/' ? 'home' : pathname.replace(/^\/+/, '').replace(/\//g, '-');

        // Prevent double counting same page in same tab session
        const visitFlagKey = `_ds_page_${page}`;
        const alreadyTracked = sessionStorage.getItem(visitFlagKey);

        // 1) Live presence
        const presRef = ref(db, `presence/${page}/${sid}`);
        await set(presRef, {
          ts: Date.now(),
          page,
        });

        try {
          await onDisconnect(presRef).remove();
        } catch (err) {
          console.warn('onDisconnect failed:', err);
        }

        const beforeUnloadHandler = () => {
          set(presRef, null).catch(() => {});
        };

        window.addEventListener('beforeunload', beforeUnloadHandler);

        cleanup = () => {
          window.removeEventListener('beforeunload', beforeUnloadHandler);
          set(presRef, null).catch(() => {});
        };

        // 2) Count only once per page per tab session
        if (!alreadyTracked) {
          sessionStorage.setItem(visitFlagKey, '1');

          const totalRef = ref(db, 'stats/totalVisits');
          const totalSnap = await get(totalRef);
          await set(totalRef, (totalSnap.val() || 0) + 1);

          const pageRef = ref(db, `pageViews/${page}`);
          const pageSnap = await get(pageRef);
          await set(pageRef, (pageSnap.val() || 0) + 1);

          console.log('✅ Tracked visit:', page);
        } else {
          console.log('ℹ️ Page already counted this session:', page);
        }
      } catch (e) {
        console.log('Firebase error:', e?.message || e);
      }
    };

    track();

    return () => {
      if (cleanup) cleanup();
    };
  }, [pathname]);

  return null;
}