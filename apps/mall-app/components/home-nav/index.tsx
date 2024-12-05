import { User } from 'lucide-react';
import { Button } from '~ui/button';
import LanguageChanger from '../language-changer';
import ChangeTheme from './change-theme';
import Navbar from './nav-bar';

export default function HomeNav() {
  return (
    <div className="fixed inset-x-0 top-0 flex text-secondary-foreground">
      <div className="flex-0 p-2 text-start">
        <Navbar />
      </div>
      <div className="flex flex-1 justify-end p-2 align-middle">
        <div className="inline-flex items-center">
          <Button variant="ghost" size="icon">
            <User className="size-4" />
          </Button>
          <ChangeTheme />
          <LanguageChanger />
        </div>
      </div>
    </div>
  );
}
