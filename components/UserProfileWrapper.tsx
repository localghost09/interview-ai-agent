import { getCurrentUser } from '@/lib/auth';
import UserProfile from './UserProfile';

const UserProfileWrapper = async () => {
  const user = await getCurrentUser();
  return <UserProfile user={user} />;
};

export default UserProfileWrapper;
