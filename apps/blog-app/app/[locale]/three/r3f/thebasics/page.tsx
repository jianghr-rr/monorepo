/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/no-unknown-property */
/**
 * https://www.youtube.com/watch?v=vTfMjI4rVSI
 */
'use client';
import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
} from '@react-three/drei';
import { Canvas, useFrame, type Vector3 } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef, useState } from 'react';
import Highlight from 'react-highlight.js';
import { useTranslation } from 'react-i18next';
import { DirectionalLightHelper } from 'three';

const Cube = ({
  position,
  side,
  color,
}: {
  position: Vector3;
  side: number;
  color: string;
}) => {
  const ref = useRef();

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// 旋转的正方体
const AnimateCube = ({
  position,
  side,
  color,
}: {
  position: Vector3;
  side: number;
  color: string;
}) => {
  const ref = useRef();

  useFrame((state, delta) => {
    // @ts-ignore
    ref.current.rotation.x += delta;
    // @ts-ignore
    ref.current.rotation.y += delta * 2;
    // @ts-ignore
    ref.current.position.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Scene = () => {
  const directionalLightRef = useRef();

  const { lightColour, lightIntensity } = useControls({
    lightColour: 'white',
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'white');

  return (
    <>
      <directionalLight
        position={[0, 1, 2]}
        intensity={lightIntensity}
        ref={directionalLightRef}
        color={lightColour}
      />
    </>
  );
};

const Sphere = ({
  position,
  args,
  color,
}: {
  position: Vector3;
  args:
    | [
        radius?: number | undefined,
        widthSegments?: number | undefined,
        heightSegments?: number | undefined,
        phiStart?: number | undefined,
        phiLength?: number | undefined,
        thetaStart?: number | undefined,
        thetaLength?: number | undefined,
      ]
    | undefined;
  color: string;
}) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    // @ts-ignore
    ref.current.rotation.y += delta * speed;
    // ref.current.position.z = Math.sin(state.clock.elapsedTime * 4);
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={args} />
      <meshStandardMaterial
        color={isHovered ? 'lightblue' : 'orange'}
        wireframe
      />
    </mesh>
  );
};

const TorusKnot = ({ position, args }: { position: Vector3; args: any }) => {
  const ref = useRef();

  const { color, radius } = useControls({
    color: 'lightblue',
    radius: {
      value: 5,
      min: 1,
      max: 10,
      step: 0.5,
    },
  });

  return (
    <mesh position={position} ref={ref}>
      {/* @ts-ignore */}
      <torusKnotGeometry args={[radius, ...args]} />
      {/* @ts-ignore */}
      <MeshWobbleMaterial factor={3} color={color} />
    </mesh>
  );
};

const Scene2 = () => {
  const directionalLightRef = useRef();

  const { lightColour, lightIntensity } = useControls({
    lightColour: 'black',
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'black');

  return (
    <>
      <directionalLight
        position={[0, 1, 2]}
        intensity={lightIntensity}
        ref={directionalLightRef}
        color={lightColour}
      />
      <ambientLight intensity={0.5} />
      <TorusKnot args={[0.1, 1000, 50, 5]} position={[0, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </>
  );
};

export default function FabricPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="blog-h1">{t('theBasics')}</h1>
      <h2 className="blog-h2">了解如下知识点</h2>
      <ul className="blog-ul">
        <li className="blog-li">创建盒子</li>
        <li className="blog-li">灯光</li>
        <li className="blog-li">动画</li>
        <li className="blog-li">交互</li>
        <li className="blog-li">开发助手</li>
      </ul>
      <h2 className="blog-h2">初始化</h2>
      <p className="blog-p">添加一个canvas及一些元素</p>
      <div className="size-96">
        <Canvas>
          <mesh>
            <boxGeometry />
          </mesh>
        </Canvas>
      </div>
      <Highlight language="tsx">
        {`
  import { Canvas } from '@react-three/fiber';

  // ...
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
      </mesh>
    </Canvas>
  )
        `}
      </Highlight>
      <p className="blog-p">它是一个3D对象，只不过我们现在是在Z轴直视它</p>
      <h2 className="blog-h2">改变盒子的颜色</h2>
      <ul className="blog-ul">
        <li className="blog-li">
          设置标准材质，设置材质的颜色(meshStandardMaterial)
        </li>
        <li className="blog-li">添加光源(directionalLight)</li>
      </ul>
      <div className="size-96">
        <Canvas>
          <directionalLight position={[0, 0, 2]} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color={'orange'} />
          </mesh>
        </Canvas>
      </div>
      <Highlight language="tsx">
        {`
  import { Canvas } from '@react-three/fiber';

  // ...
  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    </Canvas>
  )
        `}
      </Highlight>
      <h2 className="blog-h2">分组</h2>
      <p className="blog-p">将多个cube分组</p>
      <div className="size-96">
        <Canvas>
          <directionalLight position={[0, 0, 2]} />
          <group position={[0, -1, 0]}>
            <Cube position={[1, 0, 0]} color={'green'} side={1} />
            <Cube position={[-1, 0, 0]} color={'hotpink'} side={1} />
            <Cube position={[-1, 2, 0]} color={'blue'} side={1} />
            <Cube position={[1, 2, 0]} color={'yellow'} side={1} />
          </group>
        </Canvas>
      </div>
      <Highlight language="tsx">
        {`
  import { Canvas } from '@react-three/fiber';

  // ...
  return (
  <Canvas>
    <directionalLight position={[0, 0, 2]} />
    <group position={[0, -1, 0]}>
      <Cube position={[1, 0, 0]} color={'green'} side={1} />
      <Cube position={[-1, 0, 0]} color={'hotpink'} side={1} />
      <Cube position={[-1, 2, 0]} color={'blue'} side={1} />
      <Cube position={[1, 2, 0]} color={'yellow'} side={1} />
    </group>
  </Canvas>
  )
        `}
      </Highlight>
      <h2 className="blog-h2">动画</h2>
      <p className="blog-p">使用useFrame来做动画</p>
      <div className="size-96">
        <Canvas>
          <directionalLight position={[0, 0, 2]} />
          <AnimateCube position={[1, 0, 0]} color={'green'} side={1} />
        </Canvas>
      </div>
      <Highlight language="tsx">
        {`
import { Canvas } from '@react-three/fiber';


// 旋转的正方体
const AnimateCube = ({
  position,
  side,
  color,
}: {
  position: Vector3;
  side: number;
  color: string;
}) => {
  const ref = useRef();

  useFrame((state, delta) => {
    // @ts-ignore
    ref.current.rotation.x += delta;
    // @ts-ignore
    ref.current.rotation.y += delta * 2;
    // @ts-ignore
    ref.current.position.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

  // ...
  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} />
      <AnimateCube position={[1, 0, 0]} color={'green'} side={1} />
    </Canvas>
  )
        `}
      </Highlight>
      <h2 className="blog-h2">点击事件</h2>
      <p className="blog-p">添加一个球, 触发点击事件</p>
      <div className="size-96">
        <Canvas>
          <directionalLight position={[0, 0, 2]} />
          <Sphere position={[1, 0, 0]} color={'orange'} args={[1, 30, 30]} />
        </Canvas>
      </div>
      <Highlight language="tsx">
        {`
const Sphere = ({
  position,
  args,
  color,
}: {
  position: Vector3;
  args:
    | [
        radius?: number | undefined,
        widthSegments?: number | undefined,
        heightSegments?: number | undefined,
        phiStart?: number | undefined,
        phiLength?: number | undefined,
        thetaStart?: number | undefined,
        thetaLength?: number | undefined,
      ]
    | undefined;
  color: string;
}) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    // @ts-ignore
    ref.current.rotation.y += delta * speed;
    // ref.current.position.z = Math.sin(state.clock.elapsedTime * 4);
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={args} />
      <meshStandardMaterial
        color={isHovered ? 'lightblue' : 'orange'}
        wireframe
      />
    </mesh>
  );
};
        `}
      </Highlight>
      <h2 className="blog-h2">查看光源</h2>
      <p className="blog-p">
        useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'black');
      </p>
      <div className="size-96">
        <Canvas>
          <Scene2 />
        </Canvas>
      </div>

      <Highlight language="tsx">
        {`
  import { Canvas } from '@react-three/fiber';

  const TorusKnot = ({ position, args }: { position: Vector3; args: any }) => {
    const ref = useRef();
  
    const { color, radius } = useControls({
      color: 'lightblue',
      radius: {
        value: 5,
        min: 1,
        max: 10,
        step: 0.5,
      },
    });
  
    return (
      <mesh position={position} ref={ref}>
        {/* @ts-ignore */}
        <torusKnotGeometry args={[radius, ...args]} />
        {/* @ts-ignore */}
        <MeshWobbleMaterial factor={3} color={color} />
      </mesh>
    );
  };
  
  const Scene2 = () => {
    const directionalLightRef = useRef();
  
    const { lightColour, lightIntensity } = useControls({
      lightColour: 'black',
      lightIntensity: {
        value: 0.5,
        min: 0,
        max: 5,
        step: 0.1,
      },
    });
  
    useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'black');
  
    return (
      <>
        <directionalLight
          position={[0, 1, 2]}
          intensity={lightIntensity}
          ref={directionalLightRef}
          color={lightColour}
        />
        <ambientLight intensity={0.5} />
        <TorusKnot args={[0.1, 1000, 50, 5]} position={[0, 0, 0]} />
        <OrbitControls enableZoom={false} />
      </>
    );
  };
  // ...
  return (
      <div className="size-96">
        <Canvas>
          <Scene2 />
        </Canvas>
      </div>
  )
        `}
      </Highlight>
    </div>
  );
}
