import { Github } from 'lucide-react';
import { Button } from '~ui/button';
import ChangeTheme from './change-theme';
import Logo from './logo';

export default function HomeNav() {
  return (
    <div className="text-secondary-foreground fixed inset-x-0 top-0 flex h-10">
      <div className="flex-1 p-2 text-start">
        <Logo />
      </div>
      <div className="flex-1 p-2 text-end">
        <div className="inline-flex items-center">
          <Button variant="ghost" size="icon">
            <Github className="size-4" />
          </Button>
          <ChangeTheme />
        </div>
      </div>
    </div>
  );
}
