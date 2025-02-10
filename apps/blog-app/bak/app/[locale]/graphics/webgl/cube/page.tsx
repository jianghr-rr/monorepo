/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRef, useLayoutEffect } from 'react';
import Highlight from 'react-highlight.js';
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

function initArrayBuffer(
  gl: WebGLRenderingContext,
  data: number | Float32Array,
  num: number,
  type: number,
  attribute: string
) {
  // Create a buffer object
  const buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data as number, gl.STATIC_DRAW); // Assign the buffer object to the attribute variable
  // @ts-ignore
  const a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return true;
}

function initVertexBuffers(gl: WebGLRenderingContext) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  const vertices = new Float32Array([
    // Vertex coordinates
    1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    1.0, // v0-v1-v2-v3 front
    1.0,
    1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0,
    -1.0, // v0-v3-v4-v5 right
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0, // v0-v5-v6-v1 up
    -1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    1.0, // v1-v6-v7-v2 left
    -1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0, // v7-v4-v3-v2 down
    1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0, // v4-v7-v6-v5 back
  ]);

  // 每个顶点的法向量
  const normals = new Float32Array([
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
    0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
  ]);

  const colors = new Float32Array([
    // Colors
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0, // v0-v1-v2-v3 front(white)
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0, // v0-v3-v4-v5 right(white)
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0, // v0-v5-v6-v1 up(white)
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0, // v1-v6-v7-v2 left(white)
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0, // v7-v4-v3-v2 down(white)
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0, // v4-v7-v6-v5 back(white)
  ]);

  const indices = new Uint8Array([
    // Indices of the vertices
    0,
    1,
    2,
    0,
    2,
    3, // front
    4,
    5,
    6,
    4,
    6,
    7, // right
    8,
    9,
    10,
    8,
    10,
    11, // up
    12,
    13,
    14,
    12,
    14,
    15, // left
    16,
    17,
    18,
    16,
    18,
    19, // down
    20,
    21,
    22,
    20,
    22,
    23, // back
  ]);

  // Create a buffer object
  const indexBuffer = gl.createBuffer();

  initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position');
  initArrayBuffer(gl, colors, 3, gl.FLOAT, 'a_Color');
  initArrayBuffer(gl, normals, 3, gl.FLOAT, 'a_Normal');

  // Write the indices to the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
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
        const program = gl.createProgram();

        const VSHADER_SOURCE =
          'attribute vec4 a_Position;\n' +
          'attribute vec4 a_Color;\n' +
          'attribute vec4 a_Normal;\n' +
          'uniform mat4 u_MvpMatrix;\n' +
          'void main() {\n' +
          '  gl_Position = u_MvpMatrix * a_Position;\n' +
          '}\n';

        const FSHADER_SOURCE =
          'void main() {\n' +
          '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
          '}\n';

        // define vertex shader
        const vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER);
        // define frament shader
        const fragmentShader = createShader(
          gl,
          FSHADER_SOURCE,
          gl.FRAGMENT_SHADER
        );

        // attach shader to program
        program && gl.attachShader(program, vertexShader);
        program && gl.attachShader(program, fragmentShader);

        // link program to context
        program && gl.linkProgram(program);
        program && gl.useProgram(program);

        // @ts-ignore
        gl.program = program;

        // write the positions of vertices to a vertex shader
        const n = initVertexBuffers(gl);

        gl.clearColor(0, 0, 0, 1);

        gl.enable(gl.DEPTH_TEST);

        // Get the storage location of u_MvpMatrix
        // @ts-ignore
        const u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');

        // Set the eye point and the viewing volume
        const mvpMatrix = new Matrix4();
        mvpMatrix.setPerspective(30, 1, 1, 100);
        mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
        gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

        const draw = function () {
          // Clear color and depth buffer
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

          // Draw the cube
          gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
        };

        const tick = function () {
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
      <h1 className="blog-h1">{t('graphics.WebGL.cube')}</h1>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '40rem' }}
        className="mb-5 rounded border border-gray-200 shadow"
      />

      <div className="blog-h2">先获取WebGLRenderingContext对象</div>
    </div>
  );
}
