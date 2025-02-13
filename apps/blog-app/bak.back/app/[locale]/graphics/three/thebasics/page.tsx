'use client';
import Highlight from 'react-highlight.js';

export default function theBasics() {
  return (
    <div className="blog-container">
      <h1 className="blog-h1">Three.js 封装了哪些内容</h1>
      <div className="blog-h2">场景 (Scene)</div>
      <p className="blog-p">
        Three.js 封装了一个场景对象，用来存储和管理所有的 3D
        对象、灯光和相机。场景是一个容器，所有你想要渲染的东西都需要添加到场景中。
      </p>
      <Highlight language="tsx">
        {`
const scene = new THREE.Scene();
        `}
      </Highlight>
      <div className="blog-h2">相机 (Camera)</div>
      <p className="blog-p">
        相机决定了从哪个角度看场景。Three.js
        提供了多种相机类型，其中最常用的是透视相机 (PerspectiveCamera)
        和正交相机 (OrthographicCamera)。
      </p>
      <Highlight language="tsx">
        {`
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        `}
      </Highlight>
      <div className="blog-h2">渲染器 (Renderer)</div>
      <p className="blog-p">
        渲染器负责将场景和相机渲染到屏幕上。Three.js 提供了
        WebGLRenderer，它使用 WebGL 渲染 3D 图形。
      </p>
      <Highlight language="tsx">
        {`
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
        `}
      </Highlight>
      <div className="blog-h2">几何体 (Geometry)</div>
      <p className="blog-p">
        几何体是 3D 物体的形状。Three.js 提供了多种内置几何体，如立方体
        (BoxGeometry)、球体 (SphereGeometry)、平面 (PlaneGeometry) 等。
      </p>
      <Highlight language="tsx">
        {`
const geometry = new THREE.BoxGeometry();
        `}
      </Highlight>
      <div className="blog-h2">材质 (Material)</div>
      <p className="blog-p">
        材质决定了物体的外观，如颜色、纹理、反射率等。Three.js
        提供了多种材质类型，如基本材质 (MeshBasicMaterial)、Lambert 材质
        (MeshLambertMaterial)、Phong 材质 (MeshPhongMaterial) 等。
      </p>
      <Highlight language="tsx">
        {`
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        `}
      </Highlight>
      <div className="blog-h2">网格 (Mesh)</div>
      <p className="blog-p">
        网格是几何体和材质的组合。它是实际添加到场景中的对象。
      </p>
      <Highlight language="tsx">
        {`
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
        `}
      </Highlight>
      <div className="blog-h2">灯光 (Lights)</div>
      <p className="blog-p">
        灯光用于照亮场景中的对象。Three.js 提供了多种灯光类型，如环境光
        (AmbientLight)、点光源 (PointLight)、平行光 (DirectionalLight) 等。
      </p>
      <Highlight language="tsx">
        {`
const light = new THREE.PointLight(0xffffff);
light.position.set(10, 10, 10);
scene.add(light);
        `}
      </Highlight>
      <div className="blog-h2">加载器 (Loaders)</div>
      <p className="blog-p">
        Three.js
        提供了多种加载器，用于加载外部资源，如模型、纹理、动画等。常见的加载器包括
        OBJLoader、GLTFLoader、TextureLoader 等。
      </p>
      <Highlight language="tsx">
        {`
const loader = new THREE.GLTFLoader();
loader.load('path/to/model.glb', function (gltf) {
  scene.add(gltf.scene);
});
        `}
      </Highlight>
      <div className="blog-h2">控制器 (Controls) </div>
      <p className="blog-p">
        Three.js 提供了一些控制器，用于用户交互，如轨道控制器
        (OrbitControls)，允许用户通过鼠标旋转、缩放和平移场景。
      </p>
      <Highlight language="tsx">
        {`
const controls = new THREE.OrbitControls(camera, renderer.domElement);
        `}
      </Highlight>
    </div>
  );
}
