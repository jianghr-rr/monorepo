'use client';
import { Button, Label, TextInput } from 'flowbite-react';
import { useActionState } from 'react';
import { signup } from '~/actions/auth';

function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div className="mb-2 block">
        <Label htmlFor="username" value="Username" />
        <TextInput id="username" name="username" placeholder="username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}

      <div className="mb-2 block">
        <Label htmlFor="password" value="password" />
        <TextInput id="password" name="password" placeholder="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
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
        />
      </div>
      {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}

      <div className="mb-2 block">
        <Label htmlFor="email" value="email" />
        <TextInput id="email" name="email" placeholder="email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div className="mb-2 block">
        <Label htmlFor="phone" value="phone" />
        <TextInput id="phone" name="phone" placeholder="phone" />
      </div>
      {state?.errors?.phone && <p>{state.errors.phone}</p>}

      <div className="mb-2 block">
        <Label htmlFor="question" value="question" />
        <TextInput id="question" name="question" placeholder="question" />
      </div>
      {state?.errors?.question && <p>{state.errors.question}</p>}

      <div className="mb-2 block">
        <Label htmlFor="answer" value="answer" />
        <TextInput id="answer" name="answer" placeholder="answer" />
      </div>
      {state?.errors?.answer && <p>{state.errors.answer}</p>}

      <Button disabled={pending} type="submit">
        Sign Up
      </Button>
    </form>
  );
}

export default SignupForm;
export { SignupForm };
