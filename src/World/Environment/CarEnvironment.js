import * as THREE from 'three';

import ThreeJSApp from "../../Setup/ThreeJSApp";

export default class CarEnvironment {
    constructor(){
        this.threeJSApp = new ThreeJSApp();
        this.scene = this.threeJSApp.scene;
        this.resources = this.threeJSApp.resources;

        if(this.resources.item.baked) {
            this.setModel();
        }
    }

    setModel(){

        this.model = {};
        this.model.mesh = this.resources.item.blenderCarModel.scene.children[0];

        // Textures
        this.model.texture = this.resources.item.baked;
        this.model.texture.flipY = false;

        // Baked Material
        this.bakedMaterial = new THREE.MeshBasicMaterial({
            map: this.model.texture
        });
        this.model.mesh.material = this.bakedMaterial;

        this.scene.add(this.model.mesh);
    }
}