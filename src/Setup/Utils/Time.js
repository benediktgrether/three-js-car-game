import EventEmitter from "./EventEmitter";
import ThreeJSApp from "../ThreeJSApp";
import CANNON from 'cannon';

export default class Time extends EventEmitter {
    constructor(){
        super();

        // Setup Time
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.threeJSApp = new ThreeJSApp();
        this.cannonWorld = this.threeJSApp.cannonWorld;

        window.requestAnimationFrame(() => {
            this.updateAnimationFrame();
        })
    }

    updateAnimationFrame() {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        // this.cannonWorld.step(1 / 60, this.delta, 3);


        this.trigger('updateAnimationFrame');

        window.requestAnimationFrame(() => {
            this.updateAnimationFrame();
        })
    }
}