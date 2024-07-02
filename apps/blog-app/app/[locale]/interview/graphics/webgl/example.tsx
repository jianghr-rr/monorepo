/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef, useEffect } from 'react';

const Rect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const gl = (canvasRef?.current as any)?.getContext?.('webgl');
    if (gl && canvasRef?.current) {
      // 编写两个着色器（Shader）绘制三角形的这两个着色器的作用就可以了
      const vertex = `
        attribute vec2 position;
        varying vec3 color;

        void main() {
          gl_PointSize = 1.0;
          color = vec3(0.5 + position * 0.5, 0.0);
          gl_Position = vec4(position * 0.5, 1.0, 1.0);
        }
      `;

      const fragment = `
        precision mediump float;
        varying vec3 color;

        void main()
        {
          gl_FragColor = vec4(color, 1.0);
        }    
      `;

      // 在 JavaScript 中，顶点着色器和片元着色器只是一段代码片段，所以我们要将它们分别创建成 shader 对象
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertex);
      gl.compileShader(vertexShader);

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragment);
      gl.compileShader(fragmentShader);

      // 接着，我们创建 WebGLProgram 对象，并将这两个 shader 关联到这个 WebGL 程序上
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      // 使用 WebGL 程序
      gl.useProgram(program);

      // 定义这个三角形的三个顶点
      const points = new Float32Array([-1, -1, 0, 1, 1, -1]);
      // 将定义好的数据写入 WebGL 的缓冲区
      const bufferId = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
      gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

      // 获取顶点着色器中的position变量的地址;
      const vPosition = gl.getAttribLocation(program, 'position');
      // 给变量设置长度和类型;
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      // 激活这个变量;
      gl.enableVertexAttribArray(vPosition);

      // 执行绘制
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
    }
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="mb-5 rounded border border-gray-200 shadow"
        style={{ width: '512px', height: '512px' }}
        width="512"
        height="512"
      ></canvas>
    </div>
  );
};

export default Rect;
export { Rect };
