import { requireAuth } from '@/lib/auth';
import ProfilePage from '@/components/ProfilePage';

export default async function ProfileRoute() {
  await requireAuth();

  return <ProfilePage />;
}
