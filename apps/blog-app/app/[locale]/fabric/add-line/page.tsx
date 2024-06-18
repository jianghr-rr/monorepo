/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';
import { fabric } from 'fabric';
import { useRef, useEffect } from 'react';
import Highlight from 'react-highlight.js';
import { useTranslation } from 'react-i18next';
import { Button } from '~ui/button';

// let fcanvas: fabric.Canvas | null = null;

export default function AddLinePage() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  // const [fcanvas, setFcanvas] = useState<fabric.Canvas | null>(null);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const canvas = new fabric.Canvas(canvasRef.current, {
  //       fireRightClick: true, // 启用右键，button的数字为3
  //       stopContextMenu: true, // 禁止默认右键菜单
  //       controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
  //       preserveObjectStacking: true,
  //     });
  //     setFcanvas(canvas);
  //   }
  // }, [canvasRef.current]);

  // useLayoutEffect(() => {
  //   if (!fcanvas) {
  //     fcanvas = new fabric.Canvas(canvasRef.current, {
  //       fireRightClick: true, // 启用右键，button的数字为3
  //       stopContextMenu: true, // 禁止默认右键菜单
  //       controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
  //       preserveObjectStacking: true,
  //     });
  //     console.log('fcanvas', fcanvas);
  //   }

  //   return () => {
  //     fcanvas?.dispose();
  //     fcanvas = null;
  //   };
  // }, [canvasRef.current]);

  useEffect(() => {
    if (!fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        fireRightClick: true, // 启用右键，button的数字为3
        stopContextMenu: true, // 禁止默认右键菜单
        controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
        preserveObjectStacking: true,
      });
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  const addLine = () => {
    // 这里监听所有的鼠标事件
    console.log('fcanvas', fabricCanvasRef.current);
    let line: fabric.Line | null;
    let isMouseDown = false;

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.selection = false;
    }

    // 添加第一个点
    fabricCanvasRef.current?.on('mouse:down', (o) => {
      const point = fabricCanvasRef.current?.getPointer(o.e);
      isMouseDown = true;
      if (point?.x !== undefined && point?.y !== undefined) {
        line = new fabric.Line([point?.x, point?.y, point?.x, point?.y], {
          stroke: 'red',
          fill: 'transparent',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center',
        });

        fabricCanvasRef.current?.add(line);
        fabricCanvasRef.current?.requestRenderAll();
      }
    });
    // 开始绘制
    fabricCanvasRef.current?.on('mouse:move', (o) => {
      const point = fabricCanvasRef.current?.getPointer(o.e);
      console.log('isMouseDown', isMouseDown);
      if (isMouseDown) {
        console.log(123);
        line?.set({
          x2: point?.x,
          y2: point?.y,
        });
        fabricCanvasRef.current?.requestRenderAll();
      }
    });
    // 结束绘制
    fabricCanvasRef.current?.on('mouse:up', () => {
      isMouseDown = false;
    });
  };

  return (
    <div>
      <h3>{t('addLine')}</h3>
      <canvas
        ref={canvasRef}
        width={960}
        height={540}
        className="mb-5 rounded border border-gray-200 shadow"
      />
      <Button className="mt-2" onClick={addLine}>
        {t('addLine')}
      </Button>
      <Highlight language={'javascript'}>
        {`
const canvasRef = useRef(null);
const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

useEffect(() => {
  if (!fabricCanvasRef.current) {
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      preserveObjectStacking: true,
    });
  }

  return () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }
  };
}, []);

const addLine = () => {
  // 这里监听所有的鼠标事件
  console.log('fcanvas', fabricCanvasRef.current);
  let line: fabric.Line | null;
  let isMouseDown = false;

  if (fabricCanvasRef.current) {
    fabricCanvasRef.current.selection = false;
  }

  // 添加第一个点
  fabricCanvasRef.current?.on('mouse:down', (o) => {
    const point = fabricCanvasRef.current?.getPointer(o.e);
    isMouseDown = true;
    if (point?.x !== undefined && point?.y !== undefined) {
      line = new fabric.Line([point?.x, point?.y, point?.x, point?.y], {
        stroke: 'red',
        fill: 'transparent',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
      });

      fabricCanvasRef.current?.add(line);
      fabricCanvasRef.current?.requestRenderAll();
    }
  });
  // 开始绘制
  fabricCanvasRef.current?.on('mouse:move', (o) => {
    const point = fabricCanvasRef.current?.getPointer(o.e);
    console.log('isMouseDown', isMouseDown);
    if (isMouseDown) {
      console.log(123);
      line?.set({
        x2: point?.x,
        y2: point?.y,
      });
      fabricCanvasRef.current?.requestRenderAll();
    }
  });
  // 结束绘制
  fabricCanvasRef.current?.on('mouse:up', () => {
    isMouseDown = false;
  });
};

// dom
return (
<>
  <canvas
    ref={canvasRef}
    width={960}
    height={540}
    className="mb-5 rounded border border-gray-200 shadow"
  />
  <Button className="mt-2" onClick={addLine}>
    {t('addLine')}
  </Button>
</>
)
        `}
      </Highlight>
    </div>
  );
}
