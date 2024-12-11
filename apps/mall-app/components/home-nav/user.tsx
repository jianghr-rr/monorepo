'use client';
import { User } from 'lucide-react';
import { useState } from 'react';
import { LoginDialog } from '~components/login-dialog';
import { RegisterDialog } from '~components/register-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~components/ui/dropdown-menu';
import { useUserStore, type UserState, type UserActions } from '~store/user';

export default function UserComponent() {
  const userStore = useUserStore((state: UserState & UserActions) => state);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const { user } = userStore;

  return (
    <>
      {user?.username ? (
        user?.username
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setTimeout(() => {
                      setDialogOpen(true);
                    }, 100);
                  }
                }}
                onClick={() => {
                  setTimeout(() => {
                    setDialogOpen(true);
                  }, 100);
                }}
              >
                Login
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setTimeout(() => {
                      setRegisterDialogOpen(true);
                    }, 100);
                  }
                }}
                onClick={() => {
                  setTimeout(() => {
                    setRegisterDialogOpen(true);
                  }, 100);
                }}
              >
                Join
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <LoginDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      <RegisterDialog
        open={registerDialogOpen}
        onOpenChange={setRegisterDialogOpen}
      />
    </>
  );
}
