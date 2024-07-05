/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef, useEffect } from 'react';
import rough from 'roughjs';

const Rect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef?.current) {
      const rc = rough.canvas(canvasRef?.current);
      // @ts-ignore
      const ctx = canvasRef?.current?.getContext('2d');
      ctx.save();
      ctx.translate(256, 256);
      ctx.scale(1, -1);

      const hillOpts = { roughness: 2.8, strokeWidth: 2, fill: 'blue' };

      rc.path('M-180 0L-80 100L20 0', hillOpts);
      rc.path('M-20 0L80 100L180 0', hillOpts);

      rc.circle(0, 150, 105, {
        stroke: 'red',
        strokeWidth: 4,
        fill: 'rgba(255,255, 0, 0.4)',
        fillStyle: 'solid',
      });

      ctx.restore();
    }
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="mb-5 rounded border border-gray-200 shadow"
        style={{ width: '100%', height: '256px' }}
        width="512"
        height="256"
      ></canvas>
    </div>
  );
};

export default Rect;
export { Rect };