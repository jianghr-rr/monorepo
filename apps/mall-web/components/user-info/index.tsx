'use client';
import { User } from 'lucide-react';
import React, { useEffect } from 'react';
import { useUserStore, type UserState, type UserActions } from '~store/user';

const UserInfo = () => {
  const userStore = useUserStore((state: UserState & UserActions) => state);
  const { updateUser } = userStore;
  const fetchUserInfo = async () => {
    try {
      const { getUserInfo } = await import('~/app/actions/user');
      const { data } = await getUserInfo();
      console.log('User Info:', data);
      if (data) {
        updateUser(data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo().catch((error) => {
      console.error('Error fetching user info in useEffect:', error);
    });
  }, []);

  return (
    <div>
      <User />
    </div>
  );
};

export default UserInfo;
export { UserInfo };
