
'use client';

import { useState, useEffect } from 'react';
import { Wifi, Battery, Download } from 'lucide-react';
import { UrlForm } from '@/components/url-form';
import { WebViewer } from '@/components/web-viewer';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/ad-banner';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string,
  }>;
  prompt(): Promise<void>;
}

export default function Home() {
  const [url, setUrl] = useState('https://en.m.wikipedia.org/wiki/Special:Random');
  const [time, setTime] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

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

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setDeferredPrompt(null);
    }
  };

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
            <header className="flex items-center justify-between gap-2 p-3 border-b">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold font-headline text-foreground">
                        LiveView Mobile
                    </h1>
                </div>
                {deferredPrompt && (
                  <Button variant="outline" size="sm" onClick={handleInstallClick}>
                    <Download className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                )}
            </header>

            {/* App Body */}
            <div className="flex-1 flex flex-col bg-muted/20 overflow-hidden">
                <AdBanner adClient="ca-pub-XXXXXXXXXXXXXXXX" adSlot="YYYYYYYYYY" />
                <UrlForm currentUrl={url} onUrlChange={setUrl} />
                <WebViewer url={url} />
                <AdBanner adClient="ca-pub-XXXXXXXXXXXXXXXX" adSlot="ZZZZZZZZZZ" />
            </div>
          </div>
      </div>
    </main>
  );
}
