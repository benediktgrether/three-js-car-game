import ThreeJSApp from "../../Setup/ThreeJSApp";

export default class BlenderBasicCube {
    constructor(){
        this.threeJSApp = new ThreeJSApp();
        this.scene = this.threeJSApp.scene;
        this.resources = this.threeJSApp.resources;

        // Setup

        this.resources = this.resources.item.blenderBasicModel;

        this.setModel();
    }

    setModel() {
        this.model = this.resources.scene;
        this.scene.add(this.model);
    }
}