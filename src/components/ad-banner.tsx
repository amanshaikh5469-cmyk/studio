'use client';

import { useEffect } from 'react';
import { Card } from './ui/card';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Card className="flex items-center justify-center text-sm text-muted-foreground p-2 w-full h-24">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-0000000000000000" // IMPORTANT: Replace with your own publisher ID
        data-ad-slot="0000000000" // IMPORTANT: Replace with your own ad slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Card>
  );
};
