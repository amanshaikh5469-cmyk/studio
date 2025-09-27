
'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adSlot]);

  if (adSlot === 'YYYYYYYYYY' || adSlot === 'ZZZZZZZZZZ') {
    return <Skeleton className={cn("h-14 w-full", className)} />;
  }

  return (
    <div className={cn("flex justify-center items-center bg-gray-100 dark:bg-gray-800 text-xs text-gray-500", className)}>
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
