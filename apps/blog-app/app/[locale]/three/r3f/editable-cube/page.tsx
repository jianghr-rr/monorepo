/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unknown-property */
'use client';
import { TransformControls, OrbitControls } from '@react-three/drei';
import {
  Canvas,
  useFrame,
  type Vector3,
  type ThreeEvent,
} from '@react-three/fiber';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';
import { Button } from '~ui/button';
import { CubeList } from './cube';
const BoxWithLinesAndPoints = ({
  position,
  id,
  currentCubeId,
  size,
  mode,
  vertices,
  edges,
  onClickCB,
  selectedObject,
}: {
  selectedObject: any;
  position: Vector3;
  size: Vector3;
  mode: string;
  id: string;
  currentCubeId: string;
  vertices: number[];
  edges: number[];
  onClickCB?: (id: string, e: ThreeEvent<MouseEvent>) => void;
}) => {
  const groupRef = useRef();
  const transformControlsRef = useRef();

  // 创建 BufferGeometry
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  lineGeometry.setIndex(edges);

  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  useEffect(() => {
    console.log('groupRef:::', groupRef.current);
    transformControlsRef.current?.attach(groupRef.current);
  }, [transformControlsRef, groupRef, mode]);

  // useEffect(() => {
  //   if (selectedObject && transformControlsRef) {
  //     transformControlsRef.current?.attach(groupRef.current);
  //   }
  // }, [currentCubeId, transformControlsRef, groupRef]);

  return (
    <TransformControls
      // @ts-ignore
      ref={transformControlsRef}
      mode={mode}
    >
      <group
        ref={groupRef}
        key={id}
        onClick={(e) => {
          e.stopPropagation();
          onClickCB?.(id, e);
        }}
        position={position}
        scale={size}
      >
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="red" />
        </lineSegments>
        <points geometry={pointGeometry}>
          <pointsMaterial color="red" size={0.05} />
        </points>
      </group>
    </TransformControls>
  );
};

export default function EditableCubePage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<string>('translate');
  const [currentCubeId, setCurrentCubeId] = useState<string>('');
  const [selectedObject, setSelectedObject] = useState(null);

  // useEffect(() => {
  //   if (selectedObject && transformControlsRef) {
  //     transformControlsRef.current?.attach(selectedObject);

  //     return () => {
  //       transformControlsRef.current?.detach();
  //     };
  //   }
  // }, [selectedObject, transformControlsRef]);

  return (
    <div>
      <h1 className="blog-h1">{t('r3f.editableCube')}</h1>
      <div className="w-1000 h-700 relative my-4 overflow-hidden">
        <Image
          src={'/images/cube_bg.jpg'}
          width={1600}
          height={900}
          alt="editable cube"
        />
        <div className="absolute start-0 top-0 size-full">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {CubeList.map((cube) => (
              <BoxWithLinesAndPoints
                key={cube.cubeId + '_' + currentCubeId}
                id={cube.cubeId}
                currentCubeId={currentCubeId}
                position={cube.position as unknown as Vector3}
                size={cube.size as unknown as Vector3}
                vertices={cube.vertices}
                edges={cube.edges}
                mode={mode}
                selectedObject={selectedObject}
                onClickCB={(id: string, e: ThreeEvent<MouseEvent>) => {
                  // setCurrentCubeId(id);
                  // e.stopPropagation();
                  // console.log(e);
                  // setSelectedObject(e.eventObject);
                }}
              />
            ))}
          </Canvas>
        </div>
      </div>

      <Button
        className="mr-2"
        variant={mode === 'translate' ? 'default' : 'secondary'}
        onClick={() => setMode('translate')}
      >
        Translate
      </Button>
      <Button
        className="mr-2"
        variant={mode === 'scale' ? 'default' : 'secondary'}
        onClick={() => setMode('scale')}
      >
        Scale
      </Button>
      <Button
        className="mr-2"
        variant={mode === 'rotate' ? 'default' : 'secondary'}
        onClick={() => setMode('rotate')}
      >
        rotate
      </Button>
    </div>
  );
}
