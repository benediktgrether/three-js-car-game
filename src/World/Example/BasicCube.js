import * as THREE from 'three';
import ThreeJSApp from '../../Setup/ThreeJSApp';

export default class BasicCube {
    constructor() {

        this.threeJSApp = new ThreeJSApp();
        this.scene = this.threeJSApp.scene;
        this.resources = this.threeJSApp.resources;
        this.time = this.threeJSApp.time;

        this.setGeometry();
        // this.setTexture();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry(){
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    setTexture(){
        this.texture = {};
    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.y = 1 / 2;
        this.scene.add(this.mesh);
    }
}