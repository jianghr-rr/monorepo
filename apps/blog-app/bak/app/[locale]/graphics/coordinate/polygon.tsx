/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef, useEffect } from 'react';
import { Vector2D, draw } from './v2d';

const Polygon = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef?.current) {
      const points = [new Vector2D(0, 100)];
      for (let i = 1; i <= 4; i++) {
        const p = points[0]?.copy().rotate(i * Math.PI * 0.4);
        p && points.push(p);
      }

      // @ts-ignore
      const ctx = canvasRef?.current?.getContext('2d');

      const polygon = [...points];

      // 绘制正五边形
      ctx.save();
      ctx.translate(128, 256);
      draw(ctx, polygon);
      ctx.restore();

      const stars = [points[0], points[2], points[4], points[1], points[3]];

      // 绘制正五角星
      ctx.save();
      ctx.translate(356, 256);
      draw(ctx, stars);
      ctx.restore();
    }
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="mb-5 rounded border border-gray-200 shadow"
        style={{ width: '100%', height: '512px' }}
        width="512"
        height="512"
      ></canvas>
    </div>
  );
};

export default Polygon;
export { Polygon };
