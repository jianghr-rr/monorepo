/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef, useEffect } from 'react';

const Rect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = (canvasRef?.current as any)?.getContext?.('2d');
    if (ctx && canvasRef?.current) {
      const rectSize = [100, 100];
      ctx.fillStyle = 'red';
      ctx.save();
      // @ts-ignore
      ctx.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
      ctx.beginPath();
      ctx.rect(
        // @ts-ignore
        0.5 * canvasRef?.current.width,
        // @ts-ignore
        0.5 * canvasRef?.current.height,
        ...rectSize
      );
      // 恢复
      ctx.restore();
      ctx.fill();
    }
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="mb-5 rounded border border-gray-200 shadow"
        style={{ width: '100%', height: '512px' }}
        width="100%"
        height="512"
      ></canvas>
    </div>
  );
};

export default Rect;
export { Rect };
