/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';

import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function Slogan() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['这是一个知识拂过大脑不留痕迹的智能知识库，喜不喜欢?'],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      cursorChar: ' _',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <p className="text-lg leading-7 [&:not(:first-child)]:mt-6">
      <span ref={el}>&nbsp;</span>
    </p>
  );
}
