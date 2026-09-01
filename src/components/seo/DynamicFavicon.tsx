'use client';

import { useEffect } from 'react';

export function DynamicFavicon({ initialIcon, initialTitle }: { initialIcon?: string; initialTitle?: string }) {
  useEffect(() => {
    const updateFavicon = (iconUrl: string) => {
      if (!iconUrl) return;
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = iconUrl;
    };

    if (initialIcon) {
      updateFavicon(initialIcon);
    }

    // Fetch settings to keep live tab in sync if updated
    fetch('/api/settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const s = data.data;
          const liveIcon = s.faviconUrl || s.logoUrl;
          if (liveIcon) {
            updateFavicon(liveIcon);
          }
          if (s.consultantName && s.consultantName !== 'Alex Rivera' && document.title.includes('Alex Rivera')) {
            document.title = document.title.replace(/Alex Rivera/g, s.consultantName);
          }
        }
      })
      .catch(() => {});
  }, [initialIcon, initialTitle]);

  return null;
}
