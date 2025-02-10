'use client';
import { fabric } from 'fabric';
import React, {
  useImperativeHandle,
  useRef,
  useEffect,
  forwardRef,
  type ForwardedRef,
  type MutableRefObject,
} from 'react';
import { useTranslation } from 'react-i18next';
// import type { FabricPageProps } from './FabricPageProps'; // Assuming this type is defined in another file.

interface FabricPageProps {
  forwardRef?: React.MutableRefObject<HTMLCanvasElement | null>;
}

const FabricPage = forwardRef<HTMLCanvasElement, FabricPageProps>(
  (props, forwardedRef) => {
    const { t } = useTranslation();
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    useImperativeHandle(forwardedRef, () => {
      if (fabricCanvasRef.current) {
        // Access the native canvas element through the Fabric.js canvas instance
        const element = fabricCanvasRef.current.getElement();
        if (element) {
          return element;
        }
      }
      throw new Error(
        'Fabric canvas is not initialized or getElement returned null'
      );
    });

    useEffect(() => {
      // Ensure ref is a MutableRefObject before accessing its current property
      if (forwardedRef && 'current' in forwardedRef && forwardedRef.current) {
        fabricCanvasRef.current = new fabric.Canvas(forwardedRef.current, {
          fireRightClick: true,
          stopContextMenu: true,
          controlsAboveOverlay: true,
          preserveObjectStacking: true,
        });
      }

      return () => {
        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.dispose();
          fabricCanvasRef.current = null;
        }
      };
    }, [forwardedRef]);

    // Provide a display name for the functional component to satisfy ESLint
    FabricPage.displayName = 'FabricPage';

    return (
      <div className="blog-container">
        <h1 className="blog-h1">{t('fabricDemo.ErasingWithEraserBrush')}</h1>
        <canvas
          ref={forwardedRef}
          width={960}
          height={540}
          className="mb-5 rounded border border-gray-200 shadow"
        />
      </div>
    );
  }
);

export default FabricPage;
