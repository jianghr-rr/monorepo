/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';
import { useToggle } from 'ahooks';
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
  const addFunClickedRef = useRef<boolean | null>(false);
  const [drawState, { set: setDrawState }] = useToggle();
  const [selectState, { set: setSelectState }] = useToggle();

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

  const deactiveLineShapes = () => {
    setDrawState(false);
    setSelectState(true);

    addFunClickedRef.current = false;
    fabricCanvasRef.current?.off('mouse:down');
    fabricCanvasRef.current?.off('mouse:move');
    fabricCanvasRef.current?.off('mouse:up');

    fabricCanvasRef.current?.getObjects().forEach((shape) => {
      shape.set({
        selectable: true,
      });
    });

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.hoverCursor = 'all-scroll';
    }
  };

  const addLine = () => {
    if (!addFunClickedRef.current) {
      // 这里监听所有的鼠标事件
      let line: fabric.Line | null;
      let isMouseDown = false;

      addFunClickedRef.current = true;

      setDrawState(true);
      setSelectState(false);

      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.selection = false;
        fabricCanvasRef.current.hoverCursor = 'auto';
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
            selectable: false,
          });

          fabricCanvasRef.current?.add(line);
          fabricCanvasRef.current?.requestRenderAll();
        }
      });
      // 开始绘制
      fabricCanvasRef.current?.on('mouse:move', (o) => {
        const point = fabricCanvasRef.current?.getPointer(o.e);
        if (isMouseDown) {
          line?.set({
            x2: point?.x,
            y2: point?.y,
          });
          fabricCanvasRef.current?.requestRenderAll();
        }
      });
      // 结束绘制
      fabricCanvasRef.current?.on('mouse:up', () => {
        line?.setCoords();
        isMouseDown = false;
      });
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-h1">{t('selectLine')}</h1>
      <canvas
        ref={canvasRef}
        style={{ width: 'auto' }}
        width={'auto'}
        height={540}
        className="mb-5 rounded border border-gray-200 shadow"
      />
      <Button
        className="my-2"
        variant={drawState ? 'default' : 'outline'}
        onClick={addLine}
      >
        {t('addLine')}
      </Button>
      <Button
        className="m-2"
        variant={selectState ? 'default' : 'outline'}
        onClick={deactiveLineShapes}
      >
        {t('selectLine')}
      </Button>
      <ol className="blog-ul">
        <li className="blog-li">
          1. 画完线段后使用setCoords()方法更新控制点和边界框
        </li>
        <li className="blog-li">
          2.
          监听事件：mouse:down、mouse:move、mouse:up只监听一次，使用变量记录状态
        </li>
        <li className="blog-li">3. 在拖动线段时禁用选择功能</li>
      </ol>
      <Highlight language={'javascript'}>
        {`
  // ...
  // 标记位，用于fabric不重复监听事件
  const addFunClickedRef = useRef<boolean | null>(false);

  // 绘制线段
  const addLine = () => {
    if (!addFunClickedRef.current) {
      addFunClickedRef.current = true;

      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.selection = false;
        fabricCanvasRef.current.hoverCursor = 'auto';
      }

      // ...
    }
  }

  // 选择线段
  const deactiveLineShapes = () => {
    setDrawState(false);
    setSelectState(true);

    addFunClickedRef.current = false;
    fabricCanvasRef.current?.off('mouse:down');
    fabricCanvasRef.current?.off('mouse:move');
    fabricCanvasRef.current?.off('mouse:up');

    fabricCanvasRef.current?.getObjects().forEach((shape) => {
      shape.set({
        selectable: true,
      });
    });

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.hoverCursor = 'all-scroll';
    }
  };
        `}
      </Highlight>
    </div>
  );
}
