/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const newLineCoordinates = useRef<Record<string, any> | null>(null);
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

  const addingControlPoint = (e: any) => {
    const obj = e.target;
    console.log(obj);
    if (obj && obj.name === 'line-custom') {
      const point1 = new fabric.Circle({
        left: newLineCoordinates.current?.x1,
        top: newLineCoordinates.current?.y1,
        radius: obj.strokeWidth * 2,
        fill: 'red',
        originX: 'center',
        originY: 'center',
        hasBorders: false,
        hasControls: false,
        name: 'start-point',
      });

      const point2 = new fabric.Circle({
        left: newLineCoordinates.current?.x2,
        top: newLineCoordinates.current?.y2,
        radius: obj.strokeWidth * 2,
        fill: 'blue',
        originX: 'center',
        originY: 'center',
        hasBorders: false,
        hasControls: false,
        name: 'end-point',
      });

      fabricCanvasRef.current?.add(point1, point2);
      fabricCanvasRef.current?.requestRenderAll();
    }
  };

  const endOfLineToFollowPointer = (e: any) => {
    const obj = e.target;

    if (obj.name === 'start-point') {
      fabricCanvasRef.current?.getObjects().forEach((shape) => {
        if (shape.name === 'line-custom') {
          shape.set({
            // @ts-ignore
            x1: obj.left,
            y1: obj.top,
          });
          shape.setCoords();
        }
      });
    }

    if (obj.name === 'end-point') {
      fabricCanvasRef.current?.getObjects().forEach((shape) => {
        if (shape.name === 'line-custom') {
          shape.set({
            // @ts-ignore
            x2: obj.left,
            y2: obj.top,
          });
          shape.setCoords();
        }
      });
    }
  };

  const updateNewLineCoordinates = (e: fabric.IEvent<MouseEvent>) => {
    const obj = e.target ?? e.selected?.[0];
    newLineCoordinates.current = {};
    if (obj && obj.name === 'line-custom') {
      const centerX = obj.getCenterPoint()?.x;
      const centerY = obj.getCenterPoint()?.y;
      // @ts-ignore
      const coords = obj.calcLinePoints();
      console.log(coords);
      const x1Offset = coords.x1;
      const y1Offset = coords.y1;
      const x2Offset = coords.x2;
      const y2Offset = coords.y2;

      newLineCoordinates.current = {
        x1: centerX + x1Offset,
        y1: centerY + y1Offset,
        x2: centerX + x2Offset,
        y2: centerY + y2Offset,
      };

      obj.set({
        // @ts-ignore
        x1: centerX + x1Offset,
        y1: centerY + y1Offset,
        x2: centerX + x2Offset,
        y2: centerY + y2Offset,
      });

      obj.setCoords();
    }
  };

  const deactiveLineShapes = () => {
    setDrawState(false);
    setSelectState(true);

    addFunClickedRef.current = false;
    fabricCanvasRef.current?.off('mouse:down');
    fabricCanvasRef.current?.off('mouse:move');
    fabricCanvasRef.current?.off('mouse:up');
    // fabricCanvasRef.current?.off('mouse:dblclick');

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
            name: 'line-custom',
            hasControls: false,
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

      // 双击控制线段
      fabricCanvasRef.current?.on('mouse:dblclick', addingControlPoint);
      fabricCanvasRef.current?.on('object:modified', updateNewLineCoordinates);
      fabricCanvasRef.current?.on(
        'selection:created',
        updateNewLineCoordinates
      );
      fabricCanvasRef.current?.on(
        'selection:updated',
        updateNewLineCoordinates
      );

      // 移动点时改变线段的坐标
      fabricCanvasRef.current?.on('object:moving', endOfLineToFollowPointer);
    }
  };

  return (
    <div>
      <h1 className="blog-h1">{t('redrawLine')}</h1>
      <canvas
        ref={canvasRef}
        width={960}
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
      <p>双击控制线段</p>
      <p className="blog-p">
        绑定object的move事件，在移动时更新line的坐标，记得setCoords
      </p>
      <Highlight language={'javascript'}>
        {`
        `}
      </Highlight>
    </div>
  );
}
