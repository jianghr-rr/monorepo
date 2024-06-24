'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TypingEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length - 1) {
        clearInterval(interval);
      }
    }, 100); // Adjust the speed here
    return () => clearInterval(interval);
  }, [text]);

  return <motion.div>{displayedText ?? ''}</motion.div>;
};

const HomePage = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="page-title">
        <TypingEffect text="砸, 瓦鲁多!" />
      </div>
    </div>
  );
};
export default HomePage;
