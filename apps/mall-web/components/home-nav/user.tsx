'use client';
import { Dropdown, Modal } from 'flowbite-react';
import { User } from 'lucide-react';
import { useState, useCallback } from 'react';
import { LoginForm } from '~components/login/form';
import { SignupForm } from '~components/signup/form';
import { UserInfo } from '~components/user-info';
import { useUserStore, type UserState, type UserActions } from '~store/user';

export default function UserComponent() {
  const userStore = useUserStore((state: UserState & UserActions) => state);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { user, reset } = userStore;

  const onHandlerLogout = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { logout } = await import('~/app/actions/user');
      const data = await logout(user.id);
      if (data) {
        reset();
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [user?.id]);

  return (
    <>
      <UserInfo />

      {user ? (
        <Dropdown
          label={
            <>
              <User />
              {user?.username}
            </>
          }
          dismissOnClick={false}
        >
          <Dropdown.Item onClick={() => onHandlerLogout()}>
            Logout
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <Dropdown label={<User />} dismissOnClick={false}>
          <Dropdown.Item onClick={() => setOpenSignupModal(true)}>
            Signup
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setOpenLoginModal(true)}>
            Login
          </Dropdown.Item>
        </Dropdown>
      )}

      <Modal show={openSignupModal} onClose={() => setOpenSignupModal(false)}>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <SignupForm />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openLoginModal} onClose={() => setOpenLoginModal(false)}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <LoginForm callBack={() => setOpenLoginModal(false)} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
