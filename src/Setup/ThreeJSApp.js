import * as THREE from 'three';
import World from '../World/World';
import Renderer from './Renderer';
import Resources from './Utils/Resources';
import Camera from './Camera';
import Sizes from "./Utils/Sizes";
import sources from './Utils/sources';
import Time from './Utils/Time';

let instance = null;

export default class ThreeJSApp {
    constructor(_canvas) {

        // Singleton
        if(instance) {
            return instance;
        }

        instance = this;

        // Options
        this.canvas = _canvas;

        // Setup;
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();

        console.log(this.world);

        // Size resize event
        this.sizes.on('resize', () => {
            this.resize();
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update();
        })
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update(){
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }
}