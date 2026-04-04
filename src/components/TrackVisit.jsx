'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TrackVisit() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin page
    if (pathname === '/admin' || pathname.startsWith('/admin')) return;
    
    const track = async () => {
      try {
        const { initializeApp, getApps } = await import('firebase/app');
        const { getDatabase, ref, set, get } = await import('firebase/database');

        const config = {
          apiKey:      process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain:  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
          projectId:   process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          appId:       process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        if (!config.apiKey || !config.databaseURL) {
          console.log('Firebase not configured');
          return;
        }

        const app = getApps().length ? getApps()[0] : initializeApp(config);
        const db  = getDatabase(app);

        // Unique session per tab
        let sid = sessionStorage.getItem('_ds_sid');
        if (!sid) {
          sid = Date.now() + '_' + Math.random().toString(36).slice(2);
          sessionStorage.setItem('_ds_sid', sid);
        }

        const page = (pathname.replace(/\//g, '') || 'home');

        // 1. Register live presence
        const presRef = ref(db, `presence/${page}/${sid}`);
        await set(presRef, { ts: Date.now(), page });

        // Auto-remove when tab closes
        window.addEventListener('beforeunload', () => set(presRef, null));

        // 2. Increment total visits (read then write)
        const totalRef = ref(db, 'stats/total');
        const totalSnap = await get(totalRef);
        await set(totalRef, (totalSnap.val() || 0) + 1);

        // 3. Increment per-page counter
        const pageRef = ref(db, `pageViews/${page}`);
        const pageSnap = await get(pageRef);
        await set(pageRef, (pageSnap.val() || 0) + 1);

        console.log('✅ Tracked visit:', page);
      } catch (e) {
        console.log('Firebase error:', e.message);
      }
    };

    track();
  }, [pathname]);

  return null;
}