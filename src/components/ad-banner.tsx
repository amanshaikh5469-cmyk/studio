
'use client';

import { useEffect, useState } from 'react';
import { Card } from './ui/card';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const AdBanner = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (width > 0) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error(err);
            }
        }
    }, [width]);

  if (width === 0) {
    return (
        <Card className="flex items-center justify-center text-sm text-muted-foreground p-2 w-full h-24">
            {/* Placeholder for ad */}
        </Card>
    );
  }

  return (
    <Card className="flex items-center justify-center text-sm text-muted-foreground p-2 w-full h-24">
      <ins
        key={width} // Re-render the ad on width change
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
