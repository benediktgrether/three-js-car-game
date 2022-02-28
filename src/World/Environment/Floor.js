import * as THREE from 'three';
import ThreeJSApp from "../../Setup/ThreeJSApp";
import CANNON from 'cannon';

export default class Floor {
    constructor(){
        this.threeJSApp = new ThreeJSApp();
        this.scene = this.threeJSApp.scene;
        this.resources = this.threeJSApp.resources;
        this.time = this.threeJSApp.time;
        this.cannonWorld = this.threeJSApp.cannonWorld;
        this.defaultMaterial = this.threeJSApp.physic.defaultMaterial;

        // Setup Floor
        this.setGeometry();
        this.setMaterial();
        this.setMesh();
        this.setPhysics();
    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(10, 10, 10);
    }

    setTexture(){
        this.texture = {};
    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({
            color: 0x567d46,
            side: THREE.DoubleSide
        })
    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = Math.PI / 2;
        // this.mesh.position.y = -2;
        this.scene.add(this.mesh);
    }

    setPhysics(){

        this.floorShape = new CANNON.Plane();
        this.floorBody = new CANNON.Body({
            mass: 0,
            shape: this.floorShape,
            material: this.defaultMaterial
        });
        this.floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5);
        // this.floorBody.position.y = -2;
        this.cannonWorld.addBody(this.floorBody);
        console.log(this.floorBody.position);
    }
}