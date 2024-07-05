/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef, useEffect } from 'react';

const WidthHeightCanvas = () => {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    const ctx = (canvasRef?.current as any)?.getContext?.('2d');
    if (ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect(200, 200, 40, 40);
      ctx.stroke();
    }

    const ctx2 = (canvasRef2?.current as any)?.getContext?.('2d');
    if (ctx2) {
      ctx2.fillStyle = 'red';
      ctx2.fillRect(200, 200, 40, 40);
      ctx2.stroke();
    }
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="mb-5 rounded border border-gray-200 shadow"
        style={{ width: '100%', height: '256px' }}
        width="512"
        height="512"
      ></canvas>
      <canvas
        ref={canvasRef2}
        className="mb-5 rounded border border-gray-200 shadow"
        style={{ width: '100%', height: '512px' }}
        width="512"
        height="512"
      ></canvas>
    </div>
  );
};

export default WidthHeightCanvas;
export { WidthHeightCanvas };
