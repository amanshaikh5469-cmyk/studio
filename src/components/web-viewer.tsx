
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface WebViewerProps {
  url: string;
}

export function WebViewer({ url }: WebViewerProps) {
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };
  
  useEffect(() => {
    setIsLoading(true);
    setRefreshKey(Date.now());
    
    const interval = setInterval(() => {
      setIsLoading(true);
      setRefreshKey(Date.now());
    }, 20000); // Refresh every 20 seconds

    return () => clearInterval(interval);
  }, [url]);

  return (
    <div className="relative flex-1 w-full bg-card overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <iframe
        key={refreshKey}
        src={url}
        onLoad={handleLoad}
        className={cn(
          'w-full h-full border-0 transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100 animate-fade-in'
        )}
        title="Live View Content"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  );
}
