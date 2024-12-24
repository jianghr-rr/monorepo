'use client';
import { Button, Label, TextInput, Toast } from 'flowbite-react';
import { ShieldAlert } from 'lucide-react';
import { useActionState, useEffect, type FC } from 'react';
import { useUserStore, type UserState, type UserActions } from '~store/user';
import { signupAdapter } from './action';

const LoginForm: FC<{ callBack: () => void }> = ({ callBack }) => {
  const userStore = useUserStore((state: UserState & UserActions) => state);
  const [state, action, pending] = useActionState(signupAdapter, undefined);
  const { updateUser } = userStore;

  useEffect(() => {
    if (state?.data) {
      updateUser(state.data);
      callBack?.();
    }
  }, [state, updateUser, callBack]);

  return (
    <>
      <form action={action}>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
          <TextInput
            id="username"
            name="username"
            placeholder="username"
            defaultValue={(state?.formData?.get('username') as string) || ''}
            color={state?.errors?.username ? 'failure' : ''}
          />
        </div>
        {state?.errors?.username && (
          <ul>
            {state.errors.username.map((error) => (
              <li className="text-sm text-red-500" key={error}>
                {error}
              </li>
            ))}
          </ul>
        )}

        <div className="mb-2 block">
          <Label htmlFor="password" value="password" />
          <TextInput
            id="password"
            name="password"
            placeholder="password"
            defaultValue={(state?.formData?.get('password') as string) || ''}
            color={state?.errors?.password ? 'failure' : ''}
          />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <Button disabled={pending} type="submit">
          Login
        </Button>
      </form>

      {state?.message && (
        <Toast className="fixed bottom-5 right-5 z-10">
          <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <ShieldAlert />
          </div>
          <div className="ml-3 text-sm font-normal">{state?.message}</div>
          <Toast.Toggle onClick={() => (state.message = '')} />
        </Toast>
      )}
    </>
  );
};

export default LoginForm;
export { LoginForm };
