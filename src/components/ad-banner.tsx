
'use client';

import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

interface AdBannerProps {
  adSlot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: {
      push: (options: {}) => void;
    };
  }
}

export function AdBanner({ adSlot, className }: AdBannerProps) {
  const isMobile = useIsMobile();
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    // This effect is to force a re-render when isMobile changes,
    // which helps adsbygoogle recalculate the available width.
    setKey(Date.now());
  }, [isMobile]);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [key]); // Re-run when the key changes

  if (adSlot === 'YYYYYYYYYY' || adSlot === 'ZZZZZZZZZZ') {
    return <Skeleton className={cn("h-14 w-full", className)} />;
  }

  return (
    <div key={key} className={cn("flex justify-center items-center bg-gray-100 dark:bg-gray-800 text-xs text-gray-500", className)}>
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    </div>
  );
}
