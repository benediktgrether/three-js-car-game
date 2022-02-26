import * as THREE from 'three';

import ThreeJSApp from "../../Setup/ThreeJSApp";

export default class Environment{
    constructor(){
        this.threeJSApp = new ThreeJSApp();
        this.scene = this.threeJSApp.scene;
        this.resources = this.threeJSApp.resources;


        this.setSunlight();
    }

    setSunlight() {
        this.sunlight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunlight.position.set(3.5, 2, - 1.25);
        this.threeJSApp.scene.add(this.sunlight);
    }
}