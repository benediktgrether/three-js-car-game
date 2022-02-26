import * as THREE from 'three';
import ThreeJSApp from './ThreeJSApp';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Camera {
    constructor() {
        this.threeJSApp = new ThreeJSApp();
        this.sizes = this.threeJSApp.sizes;
        this.scene = this.threeJSApp.scene;
        this.canvas = this.threeJSApp.canvas;

        this.setInstance();
        this.setOrbitControls();
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);

        this.instance.position.set(6, 4, 8);

        this.scene.add(this.instance);
        console.log('cameraInstance: ', this.scene);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    resize(){
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update(){
        this.controls.update();
    }
}