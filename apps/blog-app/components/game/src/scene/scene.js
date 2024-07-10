import sceneConf from '../../confs/scene-conf';
import * as THREE from '../../libs/three.js';
import background from '../objects/background';
import camera from './camera';

import light from './light';

class Scene {
  constructor() {
    if (this.singletonScene) {
      return this.singletonScene;
    }
    this.singletonScene = this;
  }

  init(canvas) {
    this.instance = new THREE.Scene();
    console.log('123', this.instance);
    const renderer = (this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      canvas: canvas,
      preserveDrawingBuffer: true,
    }));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    // renderer.setClearColor(sceneConf.backgroundColor);
    this.camera = camera;
    this.light = light;
    this.camera.init();
    this.light.init();
    this.instance.add(this.camera.instance);
    for (let lightType in this.light.instances) {
      this.instance.add(this.light.instances[lightType]);
    }
    this.background = background;
    this.background.init();
    this.background.instance.position.z = -84;
    this.camera.instance.add(this.background.instance);
  }

  reset() {
    this.camera.reset();
    this.light.reset();
  }

  render() {
    this.renderer.render(this.instance, this.camera.instance);
  }

  updateCameraPosition(targetPosition) {
    this.camera.updatePosition(targetPosition);
    this.light.updatePosition(targetPosition);
  }

  addScore(scoreInstance) {
    this.currentScore = scoreInstance;
    this.camera.instance.add(scoreInstance);
    scoreInstance.position.x = -20;
    scoreInstance.position.y = 40;
  }

  updateScore(scoreInstance) {
    this.camera.instance.remove(this.currentScore);
    this.currentScore = scoreInstance;
    this.camera.instance.add(scoreInstance);
    scoreInstance.position.x = -20;
    scoreInstance.position.y = 40;
  }
}

export default new Scene();
