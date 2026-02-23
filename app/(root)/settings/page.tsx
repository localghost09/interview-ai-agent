import { requireAuth } from '@/lib/auth';
import SettingsPage from '@/components/SettingsPage';

export default async function SettingsRoute() {
  await requireAuth();

  return <SettingsPage />;
}
