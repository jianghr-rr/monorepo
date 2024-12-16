'use client';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { userAPI } from '~/pages/api/user.api';
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
  const router = useRouter();
  const userStore = useUserStore((state: UserState & UserActions) => state);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const { user } = userStore;

  useEffect(() => {
    userAPI
      .getUserInfo()
      .then((res) => {
        if (res.data?.data) {
          userStore.updateUser(res.data?.data);
        } else {
          userStore.updateUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
        userStore.updateUser(null);
      });
  }, []);

  const onHandlerLogout = useCallback(() => {
    userAPI
      .logout()
      .then((res) => {
        console.log('res', res);
        userStore.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {user?.username ? (
        <DropdownMenu>
          <DropdownMenuTrigger>{user?.username}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                router.push('/user-info');
              }}
            >
              个人中心
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push('/user-info/reset-password');
              }}
            >
              修改密码
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onHandlerLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User className="dark:text-inheritance-light text-inheritability-dark size-[1.2rem] rotate-0 scale-100 fill-current transition-all" />
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
            <DropdownMenuItem
              onClick={() => {
                router.push('/forget-password');
              }}
            >
              忘记密码
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
