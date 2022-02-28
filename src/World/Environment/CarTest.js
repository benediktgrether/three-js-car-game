import * as THREE from 'three';
import CANNON, { Quaternion } from 'cannon';
import ThreeJSApp from '../../Setup/ThreeJSApp';

export default class CarTest {
    constructor() {
        this.threeJSApp = new ThreeJSApp();
        this.scene = this.threeJSApp.scene;
        this.resources = this.threeJSApp.resources;
        this.time = this.threeJSApp.time;
        this.cannonWorld = this.threeJSApp.cannonWorld;
        this.defaultMaterial = this.threeJSApp.physic.defaultMaterial;


        //Setup Physic
        this.setPhysic();

        this.setGeometry();

        this.setMaterial();
        this.setMesh();
        this.setRaycastVehicle();
        this.setCarWheels();
        console.log(this.vehicle)
        this.keyEvent();

        // Car Movement
        // const onDocumentKey = (event) => {
        //     keyMap[event.key] = event.type === 'keydown'
        // }

        // document.addEventListener('keydown', onDocumentKey, false)
        // document.addEventListener('keyup', onDocumentKey, false)
    }

    setPhysic(){
        this.chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
        this.chassisBody = new CANNON.Body({
            mass: 150,
        });
        this.chassisBody.addShape(this.chassisShape);
        this.chassisBody.position.set(0, 0.2, 0);
        this.chassisBody.angularVelocity.set(0, 0 ,0);
    }

    setGeometry(){
        this.geometry = new THREE.BoxGeometry(2, 0.6, 4);
    }

    setTexture(){
        this.texture = {};
    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // Position Mesh over plane
        // this.mesh.position.y = 1/2;
        this.mesh.position.y = 1/2;

        this.scene.add(this.mesh);
    }

    setRaycastVehicle(){
        this.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.chassisBody,
            indexRightAxis: 0,
            indexUpAxis: 1,
            indexForwardAxis: 2,
        });

    }

    setCarWheels(){
        this.options = {
            radius: 0.3,
            directionLocal: new CANNON.Vec3(0, -1, 0),
            suspensionStiffness: 45,
            suspensionRestLength: 0.4,
            frictionSlip: 5,
            dampingRelaxation: 2.3,
            dampingCompression: 4.5,
            maxSuspensionForce: 200000,
            rollInfluence:  0.01,
            axleLocal: new CANNON.Vec3(-1, 0, 0),
            chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
            maxSuspensionTravel: 0.25,
            customSlidingRotationalSpeed: -30,
            useCustomSlidingRotationalSpeed: true,
        };

        this.alexwidth = 0.7;
        this.options.chassisConnectionPointLocal.set(this.axlewidth, 0, -1);
        this.vehicle.addWheel(this.options);

        this.options.chassisConnectionPointLocal.set(- this.axlewidth, 0, -1);
        this.vehicle.addWheel(this.options);

        this.options.chassisConnectionPointLocal.set(this.axlewidth, 0, 1);
        this.vehicle.addWheel(this.options);

        this.options.chassisConnectionPointLocal.set(- this.axlewidth, 0, 1);
        this.vehicle.addWheel(this.options);

        this.vehicle.addToWorld(this.cannonWorld);

        console.log(this.vehicle);

        this.wheelBodies = [];
        this.wheelVisuals = [];

        this.vehicle.wheelInfos.forEach((wheel) => {
            this.shape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
            this.body = new CANNON.Body({mass: 1, material: this.defaultMaterial});
            this.quarternionWheel = new CANNON.Quaternion();
            this.quarternionWheel.setFromAxisAngle(new CANNON.Vec3(1, 0,0), Math.PI);
            this.body.addShape(this.shape, new CANNON.Vec3(),this.quarternionWheel);
            this.wheelBodies.push(this.body);

            // Showing Wheel
            this.wheelGeometry = new THREE.CylinderBufferGeometry(wheel.radius, wheel.radius, 0.4, 32);
            this.wheelMaterials = new THREE.MeshPhongMaterial({
                color: 0xd0901d,
                emissive: 0xaa0000,
                side: THREE.DoubleSide,
            });
            this.wheelMesh = new THREE.Mesh(this.wheelGeometry, this.wheelMaterials);
            this.wheelMesh.rotateZ(Math.PI/2);
            this.wheelVisuals.push(this.wheelMesh);
            this.scene.add(this.wheelMesh);
        });

        this.cannonWorld.addEventListener('postStep', () => {
            for(let i = 0; i < this.vehicle.wheelInfos.length; i++) {
                this.vehicle.updateWheelTransform(i);
                // console.log(this.vehicle);
                this.transformWheel = this.vehicle.wheelInfos[i].worldTransform;

                // Update wheel Physics
                this.wheelBodies[i].position.copy(this.transformWheel.position);
                // console.log(this.wheelBodies[i].quarternion);
                this.wheelBodies[i].quaternion.copy(this.transformWheel.quaternion);

                // Update Wheel Visuals
                this.wheelVisuals[i].position.copy(this.transformWheel.position);
                this.wheelVisuals[i].quaternion.copy(this.transformWheel.quaternion);

            }
        });
    }

    updatePhysics(){
        this.cannonWorld.step(1/60);
        this.mesh.position.copy(this.chassisBody.position);
        this.mesh.quaternion.copy(this.chassisBody.quaternion);
    }

    update(){
        this.updatePhysics();
    }

    driving(e) {
        if (e.type != 'keydown' && e.type != 'keyup') return;
        this.keyup = e.type == 'keyup';
        // this.vehicle.setBrake(0, 0);
        // this.vehicle.setBrake(0, 1);
        // this.vehicle.setBrake(0, 2);
        // this.vehicle.setBrake(0, 3);
        console.log(this.vehicle);
      
        var engineForce = 800,
            maxSteerVal = 0.3;
        switch(e.keyCode) {
      
          case 38: // forward
            this.vehicle.applyEngineForce(this.keyup ? 0 : -engineForce, 2);
            this.vehicle.applyEngineForce(this.keyup ? 0 : -engineForce, 3);
            break;
      
          case 40: // backward
            this.vehicle.applyEngineForce(this.keyup ? 0 : engineForce, 2);
            this.vehicle.applyEngineForce(this.keyup ? 0 : engineForce, 3);
            break;
      
          case 39: // right
            vehicle.setSteeringValue(this.keyup ? 0 : -maxSteerVal, 2);
            vehicle.setSteeringValue(this.keyup ? 0 : -maxSteerVal, 3);
            break;
      
          case 37: // left
            vehicle.setSteeringValue(this.keyup ? 0 : maxSteerVal, 2);
            vehicle.setSteeringValue(this.keyup ? 0 : maxSteerVal, 3);
            break;
        }
    }

    keyEvent(){
        console.log(this.vehicle);
        window.addEventListener('keydown', this.driving);
        window.addEventListener('keyup', this.driving);
    }
}
