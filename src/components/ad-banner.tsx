
'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

interface AdBannerProps {
  adClient: string;
  adSlot: string;
  className?: string;
}

export function AdBanner({ adClient, adSlot, className }: AdBannerProps) {

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className={className} style={{ minWidth: 250, minHeight: 50 }}>
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    </div>
  );
}
