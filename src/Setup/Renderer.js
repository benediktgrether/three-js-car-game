import * as THREE from 'three';
import ThreeJSApp from './ThreeJSApp';

export default class Renderer {
    constructor() {
        this.threeJSApp = new ThreeJSApp();
        this.canvas = this.threeJSApp.canvas;
        this.sizes = this.threeJSApp.sizes;
        this.scene = this.threeJSApp.scene;
        this.camera = this.threeJSApp.camera;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}