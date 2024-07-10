/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useRef, useLayoutEffect } from 'react';
import Main from '~components/game/src/main';

let temp = false;

export default function theBasics() {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    if (!temp) {
      new Main(canvasRef.current);
      temp = true;
    }
  }, []);

  return (
    <div className="blog-container">
      <h1 className="blog-h1">游戏</h1>
      <canvas
        ref={canvasRef}
        style={{ width: 'auto' }}
        width={667}
        height={700}
        className="mb-5 rounded border border-gray-200 shadow"
      />
    </div>
  );
}
