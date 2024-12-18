'use client';
import { Dropdown, Modal, Button } from 'flowbite-react';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SignupForm } from '~components/signup-form';
import { useUserStore, type UserState, type UserActions } from '~store/user';

export default function UserComponent() {
  const userStore = useUserStore((state: UserState & UserActions) => state);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { user } = userStore;

  return (
    <>
      {user?.username ? (
        user?.username
      ) : (
        <Dropdown label={<User />} dismissOnClick={false}>
          <Dropdown.Item onClick={() => setOpenLoginModal(true)}>
            Signup
          </Dropdown.Item>
          <Dropdown.Item>Join us</Dropdown.Item>
        </Dropdown>
      )}

      <Modal show={openLoginModal} onClose={() => setOpenLoginModal(false)}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <SignupForm />
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenLoginModal(false)}>Accept</Button>
          <Button color="gray" onClick={() => setOpenLoginModal(false)}>
            Cancel
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
