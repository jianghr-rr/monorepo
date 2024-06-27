/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';
import { fabric } from 'fabric';
import { useRef, useEffect } from 'react';
import Highlight from 'react-highlight.js';
import { useTranslation } from 'react-i18next';

export default function FabricPage() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      preserveObjectStacking: true,
    });

    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      stroke: '#2BEBC8',
    });
    canvas?.add(rect);
    canvas?.requestRenderAll();
  }, []);

  return (
    <div>
      <h1 className="blog-h1">{t('initial')}</h1>
      <canvas ref={canvasRef} width={600} height={400} />
      <p className="blog-p">安装fabric:</p>
      <Highlight language="javascript">
        {`
npm install @types/fabric@5.3.7 --save
npm install fabric@5.3.0 --save
        `}
      </Highlight>
      <p>nextjs的配置:</p>
      <Highlight language="javascript">
        {`
webpack: (config) => {
  config.externals.push({
    'utf-8-validate': 'commonjs utf-8-validate',
    bufferutil: 'commonjs bufferutil',
    canvas: 'commonjs canvas',
  });
  // config.infrastructureLogging = { debug: /PackFileCache/ };
  return config;
},
        `}
      </Highlight>
      <p>react的初始化代码:</p>
      <Highlight language="javascript">{`
useEffect(() => {
  const canvas = new fabric.Canvas(canvasRef.current, {
    fireRightClick: true, // 启用右键，button的数字为3
    stopContextMenu: true, // 禁止默认右键菜单
    controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    preserveObjectStacking: true,
  });

  const rect = new fabric.Rect({
    height: 280,
    width: 200,
    stroke: '#2BEBC8',
  });
  canvas?.add(rect);
  canvas?.requestRenderAll();
}, []);
    `}</Highlight>
    </div>
  );
}
