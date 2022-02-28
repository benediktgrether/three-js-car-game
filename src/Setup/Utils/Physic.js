import ThreeJSApp from "../ThreeJSApp";
import CANNON from 'cannon';

export default class Physic {
    constructor(){

        this.threeJSApp = new ThreeJSApp();
        this.cannonWorld = this.threeJSApp.cannonWorld;
        this.setPhysicVariables();

    }

    setPhysicVariables(){
        this.cannonWorld.gravity.set(0, -9.82, 0);
        this.defaultMaterial = new CANNON.Material('default')
        this.broadphase = new CANNON.SAPBroadphase(this.cannonWorld);
        this.defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.3
            }
        )
        this.cannonWorld.addContactMaterial(this.defaultContactMaterial)
    }
}