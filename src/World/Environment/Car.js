import * as THREE from 'three';
import CANNON from 'cannon';
import ThreeJSApp from '../../Setup/ThreeJSApp';

export default class Car {
    constructor() {
        this.threeJSApp = new ThreeJSApp();
        this.scene = this.threeJSApp.scene;
        this.resources = this.threeJSApp.resources;
        this.time = this.threeJSApp.time;
        this.cannonWorld = this.threeJSApp.cannonWorld;
        this.defaultMaterial = this.threeJSApp.physic.defaultMaterial;

        this.setGeometry();

        this.setMaterial();
        this.setMesh();
        this.setPhysics();
    }

    setGeometry(){
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    setTexture(){
        this.texture = {};
    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.y = 3;

        this.scene.add(this.mesh);
    }

    setPhysics() {
        this.chassisShape = new CANNON.Box(new CANNON.Vec3(1 * 0.5, 1 * 0.5, 1 * 0.5));
        this.chassisBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 3, 0),
            angularVelocity: new CANNON.Vec3(0, 0, 1 * 0.5),
            shape: this.chassisShape,
            material: this.defaultMaterial
        });
        this.chassisBody.position.copy(this.mesh.position)
        this.cannonWorld.addBody(this.chassisBody);
    }

    update(){
        this.cannonWorld.step(1 / 60, this.delta, 3);
        this.mesh.position.copy(this.chassisBody.position);
        this.mesh.quaternion.copy(this.chassisBody.quaternion);
    }
}