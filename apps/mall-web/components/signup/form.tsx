'use client';
import { Button, Label, TextInput, Toast } from 'flowbite-react';
import { ShieldAlert } from 'lucide-react';
import { useActionState } from 'react';
import { signupAdapter } from './action';

function SignupForm() {
  const [state, action, pending] = useActionState(signupAdapter, undefined);

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

        <div className="mb-2 block">
          <Label htmlFor="confirmPassword" value="confirmPassword" />
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirmPassword"
            defaultValue={
              (state?.formData?.get('confirmPassword') as string) || ''
            }
            color={state?.errors?.confirmPassword ? 'failure' : ''}
          />
        </div>
        {state?.errors?.confirmPassword && (
          <ul>
            {state.errors.confirmPassword.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <div className="mb-2 block">
          <Label htmlFor="email" value="email" />
          <TextInput
            id="email"
            name="email"
            placeholder="email"
            defaultValue={(state?.formData?.get('email') as string) || ''}
            color={state?.errors?.email ? 'failure' : ''}
          />
        </div>
        {state?.errors?.email && (
          <ul>
            {state.errors.email.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <div className="mb-2 block">
          <Label htmlFor="phone" value="phone" />
          <TextInput
            id="phone"
            name="phone"
            placeholder="phone"
            defaultValue={(state?.formData?.get('phone') as string) || ''}
            color={state?.errors?.phone ? 'failure' : ''}
          />
        </div>
        {state?.errors?.phone && (
          <ul>
            {state.errors.phone.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <div className="mb-2 block">
          <Label htmlFor="question" value="question" />
          <TextInput
            id="question"
            name="question"
            placeholder="question"
            defaultValue={(state?.formData?.get('question') as string) || ''}
            color={state?.errors?.question ? 'failure' : ''}
          />
        </div>
        {state?.errors?.question && (
          <ul>
            {state.errors.question.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <div className="mb-2 block">
          <Label htmlFor="answer" value="answer" />
          <TextInput
            id="answer"
            name="answer"
            placeholder="answer"
            defaultValue={(state?.formData?.get('answer') as string) || ''}
            color={state?.errors?.answer ? 'failure' : ''}
          />
        </div>
        {state?.errors?.answer && (
          <ul>
            {state.errors.answer.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Button disabled={pending} type="submit">
          Sign Up
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
}

export default SignupForm;
export { SignupForm };
