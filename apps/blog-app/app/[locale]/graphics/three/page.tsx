'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function PatternsPage() {
  const { t } = useTranslation();

  return (
    <div className="blog-container">
      <h1 className="blog-h1">{t('graphics.three.title')}</h1>

      <Image
        src={'/images/threejs/o-1.jpg'}
        width={1600}
        height={900}
        alt="extend"
      />
      <p className="blog-p">
        Three.js 通过对 WebGL 的高层次抽象和封装，使得 3D
        图形编程变得更加简单和高效。它提供了丰富的功能和内置工具，极大地简化了常见的
        3D 图形任务，同时还拥有活跃的社区和丰富的资源
      </p>
      <p className="blog-p">
        Three.js 对 WebGL
        进行了高层次的抽象和封装，使得开发者不需要处理底层复杂的 WebGL API
        调用。开发者可以更专注于场景的构建和逻辑的实现，而不是图形渲染的细节。
      </p>
      <p className="blog-p">
        Three.js 提供了大量的内置几何体、材质、灯光和加载器，极大地简化了常见的
        3D 图形任务。开发者可以直接使用这些工具，而不需要从零开始实现。
      </p>
    </div>
  );
}
