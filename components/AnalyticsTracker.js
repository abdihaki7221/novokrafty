'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
