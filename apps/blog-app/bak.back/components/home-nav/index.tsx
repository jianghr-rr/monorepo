import LanguageChanger from '../language-changer';
import ChangeTheme from './change-theme';
import Navbar from './nav-bar';

export default function HomeNav() {
  return (
    <div className="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full flex-none bg-white/55 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-transparent lg:z-50 lg:border-b">
      <div className="max-w-8xl mx-auto">
        <div className="mx-4 py-4 dark:border-slate-300/10 lg:mx-0 lg:px-8">
          <div className="relative flex items-center">
            <Navbar />
            <div className="relative ml-auto flex items-center">
              <ChangeTheme />
              <LanguageChanger />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
