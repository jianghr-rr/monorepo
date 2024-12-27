'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeChanger = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {theme === 'light' && (
        <Sun
          onClick={() => setTheme('dark')}
          className="block cursor-pointer justify-center self-center"
        />
      )}
      {theme === 'dark' && (
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
