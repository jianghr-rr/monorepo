import LanguageChanger from '../language-changer';
import ChangeTheme from './change-theme';
import Navbar from './nav-bar';

export default function HomeNav() {
  return (
    <div className="text-secondary-foreground inset-x-0 top-0 flex">
      <div className="flex-0 p-2 text-start">
        <Navbar />
      </div>
      <div className="flex flex-1 justify-end p-2 align-middle">
        <div className="inline-flex items-center">
          <ChangeTheme />
          <LanguageChanger />
        </div>
      </div>
    </div>
  );
}
