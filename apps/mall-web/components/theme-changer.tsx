'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeChanger = () => {
  const { setTheme, theme, systemTheme } = useTheme();
  const activeTheme = theme === 'system' ? systemTheme : theme;

  return (
    <>
      {activeTheme === 'light' && (
        <Sun
          onClick={() => setTheme('dark')}
          className="block cursor-pointer justify-center self-center"
        />
      )}
      {activeTheme === 'dark' && (
        <Moon
          onClick={() => setTheme('light')}
          className="block cursor-pointer justify-center self-center"
        />
      )}
    </>
  );
};

export default ThemeChanger;
export { ThemeChanger };
