'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const result = await logout();
      if (result.success) {
        toast.success(result.message);
        router.push('/sign-in');
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline"
      className="text-sm"
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
