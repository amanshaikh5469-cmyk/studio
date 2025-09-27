
'use client';

import { useState, useEffect } from 'react';
import { Wifi, Battery, Aperture } from 'lucide-react';
import { UrlForm } from '@/components/url-form';
import { WebViewer } from '@/components/web-viewer';

export default function Home() {
  const [url, setUrl] = useState('https://en.m.wikipedia.org/wiki/Special:Random');
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setTime(`${hours}:${minutes}`);
    };
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] h-[calc(100vh-4rem)] max-h-[800px] bg-gray-900 rounded-[40px] shadow-2xl p-3 border-2 border-gray-700">
          <div className="w-full h-full bg-background rounded-[28px] overflow-hidden flex flex-col">
            {/* Status bar */}
            <div className="flex justify-between items-center px-4 py-2 text-xs font-semibold text-foreground bg-background relative z-10">
                <span>{time || "00:00"}</span>
                <div className="w-24 h-5 bg-gray-900 rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2"></div>
                <div className="flex items-center gap-1.5">
                    <Wifi size={14} />
                    <Battery size={14} />
                </div>
            </div>

            {/* App Header */}
            <header className="flex items-center justify-center gap-2 p-3 border-b">
                <Aperture className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold font-headline text-foreground">
                    LiveView Mobile
                </h1>
            </header>

            {/* App Body */}
            <div className="flex-1 flex flex-col bg-muted/20 overflow-hidden">
                <UrlForm currentUrl={url} onUrlChange={setUrl} />
                <WebViewer url={url} />
            </div>
          </div>
      </div>
    </main>
  );
}
