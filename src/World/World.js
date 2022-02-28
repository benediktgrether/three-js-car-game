import ThreeJSApp from '../Setup/ThreeJSApp';
import Floor from './Environment/Floor';
import BasicCube from './Example/BasicCube';
import Car from './Environment/Car';
import BlenderBasicCube from './Example/BlenderBasicCube';
import Environment from './Example/Environment';
import CarEnvironment from './Environment/CarEnvironment';

export default class World {
    constructor(){
        this.threeJSApp = new ThreeJSApp();
        this.scene = this.threeJSApp.scene;
        this.resources = this.threeJSApp.resources;

        //  Load Basic Cube
        // this.basicCube = new BasicCube();
        // this.floor = new Floor();
        // this.car = new Car();

        this.resources.on('ready', () => {
            // Setup
            console.log('resources are loaded');
            // Here goes the Loaded Stuff
            this.carEnvironment = new CarEnvironment();

        });
    }

    // setTexture(){
    //     this.bakedMaterial = new THREE.MeshBasicMaterial({
    //         map: this.carTexture
    //     });
    //     console.log('cartexture', this.carTexture);
    //     console.log('Worldtest', this.carEnvironment.scene)
    //     this.bakedMesh = this.carEnvironment.model.children.find((child) => child.name === 'baked');
    //     console.log(this.bakedMesh.material);

    //     this.bakedMesh.material = this.bakedMaterial;
    // }

    update(){
        if(this.car){
            this.car.update();
        }
    }
}