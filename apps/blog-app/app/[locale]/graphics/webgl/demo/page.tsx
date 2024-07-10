/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Matrix4 } from '~lib/matrix';

let isInit = false;

function createShader(
  gl: {
    createShader: (arg0: any) => any;
    shaderSource: (arg0: any, arg1: any) => void;
    compileShader: (arg0: any) => void;
  },
  sourceCode: any,
  type: any
): WebGLShader {
  // create shader
  const shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);
  return shader;
}

function initVertexBuffers(gl: WebGLRenderingContext) {
  const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  const n = 3;
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // write data into the buffer object
  // STATIC_DRAW: 静态绘制，数据不会改变
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // get attribute a_Position address in vertex shader
  // @ts-ignore
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // enable a_Position variable
  gl.enableVertexAttribArray(a_Position);
  return n;
}

export default function PatternsPage() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (!isInit && canvasRef.current) {
      isInit = true;
      // 获取canvas元素
      const canvas = canvasRef.current;
      /**
       * 获取WebGL上下文这样就可以绘制图形了（有了绘制的能力）
       * 返回一个WebGLRenderingContext对象，如果获取失败则返回null
       * WebGLRenderingContext对象是WebGL API的入口点，它提供了绘制2D和3D图形的方法
       */
      const gl = canvas.getContext('webgl');

      if (gl) {
        /**
         * program可以理解为程序，它是一组渲染指令的集合
         * 可以绑定顶点着色器、片段着色器，然后执行渲染指令
         * 绑定的方式：attachShader
         */
        const program = gl?.createProgram();

        /**
         * 顶点着色器，在WebGL中，顶点着色器是用来处理顶点的
         * 顶点着色器代码：
         * 1. 顶点着色器代码必须以顶点着色器标识符attribute开头
         * 2. 顶点着色器代码必须以顶点着色器标识符void main()开头
         * 3. 顶点着色器代码必须以顶点着色器标识符gl_Position结尾
         * vec4：代表一个四维向量，这里代表一个4*4的矩阵
         * gl_Position：代表顶点着色器代码中输出的位置
         */
        const VSHADER_SOURCE =
          'attribute vec4 a_Position;\n' +
          'uniform mat4 u_ModelMatrix;\n' +
          'uniform mat4 u_ViewMatrix;\n' +
          'uniform mat4 u_ProjectionMatrix;\n' +
          'void main () {\n' +
          'gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
          '}\n';

        /**
         * 片段着色器，在WebGL中，片段着色器是用来处理片段的
         * 片段着色器代码：
         * 1. 片段着色器代码必须以片段着色器标识符void main()开头
         * 2. 片段着色器代码必须以片段着色器标识符gl_FragColor结尾
         * vec4(1.0, 0.0, 0.0, 1.0)代表颜色，这里代表一个4*4的矩阵
         */
        const FSHADER_SOURCE =
          'void main () {\n' +
          'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
          '}\n';

        const vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER);
        const fragmentShader = createShader(
          gl,
          FSHADER_SOURCE,
          gl.FRAGMENT_SHADER
        );

        /**
         * 顶点着色器，在WebGL中，顶点着色器是用来处理顶点的
         */
        program && gl.attachShader(program, vertexShader);
        program && gl.attachShader(program, fragmentShader);

        /**
         * 链接程序，将顶点着色器和片段着色器进行绑定
         */
        program && gl.linkProgram(program);
        program && gl.useProgram(program);

        // @ts-ignore
        gl.program = program;

        // 通过JS代码往shader中传入数据

        // write the positions of vertices to a vertex shader
        const n = initVertexBuffers(gl);

        gl.clearColor(0, 0, 0, 1);

        const u_ModelMatrix = gl.getUniformLocation(
          // @ts-ignore
          gl.program,
          'u_ModelMatrix'
        );
        const modelMatrix = new Matrix4();

        // @ts-ignore
        const u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
        const viewMatrix = new Matrix4();
        viewMatrix.lookAt(100, 100, 100, 0, 0, 0, 0, 1, 0);

        const u_ProjectionMatrix = gl.getUniformLocation(
          // @ts-ignore
          gl.program,
          'u_ProjectionMatrix'
        );
        const projectionMatrix = new Matrix4();
        // projectionMatrix.perspective(120, 1, 0.1, 1000)
        projectionMatrix.ortho(-1, 1, -1, 1, 0.1, 1000);

        let currentAngle = 0;
        let g_last = Date.now();

        const animate = function () {
          const now = Date.now();
          const duration = now - g_last;
          g_last = now;
          currentAngle = currentAngle + (duration / 1000) * 180;
        };

        const draw = function () {
          // clear canvas and add background color
          modelMatrix.setRotate(currentAngle, 0, 1, 0);
          gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
          gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
          gl.uniformMatrix4fv(
            u_ProjectionMatrix,
            false,
            projectionMatrix.elements
          );
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLES, 0, n);
        };

        const tick = function () {
          // update the new rotation angle
          animate();
          // draw
          draw();
          requestAnimationFrame(tick);
        };

        tick();
      }
    }

    return () => {
      isInit = false;
    };
  }, []);

  return (
    <div className="blog-container">
      <h1 className="blog-h1">{t('graphics.WebGL.demo')}</h1>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '40rem' }}
        className="mb-5 rounded border border-gray-200 shadow"
      />
    </div>
  );
}
