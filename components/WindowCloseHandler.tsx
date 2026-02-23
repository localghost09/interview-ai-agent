'use client';

import { useEffect } from 'react';

export default function WindowCloseHandler() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Use sendBeacon for reliable logout on page unload
      const logoutUrl = '/api/logout';
      if (navigator.sendBeacon) {
        navigator.sendBeacon(logoutUrl);
      } else {
        // Fallback for browsers that don't support sendBeacon
        fetch(logoutUrl, {
          method: 'POST',
          keepalive: true,
        }).catch(() => {
          // Ignore errors during unload
        });
      }
    };

    const handleVisibilityChange = () => {
      // Optional: Handle when tab becomes hidden
      if (document.hidden) {
        // You could implement auto-logout after inactivity here
        console.log('Tab is now hidden');
      } else {
        console.log('Tab is now visible');
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
