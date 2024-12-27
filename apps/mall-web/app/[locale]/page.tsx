import { Alert, TextInput, Label } from 'flowbite-react';

export default function Home() {
  return (
    <>
      <form>
        <div className="mb-2 block">
          <Label htmlFor="username" value="123" />
          <TextInput id="username" name="username" />
        </div>
      </form>
      <Alert color="info">Mall!</Alert>
    </>
  );
}
