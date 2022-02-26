import ThreeJSApp from '../Setup/ThreeJSApp';
import BasicCube from './Example/BasicCube';
import BlenderBasicCube from './Example/BlenderBasicCube';
import Environment from './Example/Environment';

export default class World {
    constructor(){
        this.threeJSApp = new ThreeJSApp();
        this.scene = this.threeJSApp.scene;
        this.resources = this.threeJSApp.resources;

        //  Load Basic Cube
        this.basicCube = new BasicCube();

        this.resources.on('ready', () => {
            // Setup
            console.log('resources are loaded');
            // Here goes the Loaded Stuff
            // this.blenderBasicCube = new BlenderBasicCube();
            // this.environment = new Environment();
        });
    }

    update(){
    }
}