import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
    constructor(_sources) {
        super();
        this.sources = _sources;

        // Setup Resources
        this.item = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loader = {};
        this.loader.gltfLoader = new GLTFLoader();
        this.loader.textureLoader = new THREE.TextureLoader();
        this.loader.cubeTextureLoader = new THREE.CubeTextureLoader();

        // To Do - Add Draco Loader
    }

    startLoading(){
        for (const source of this.sources) {
            if(source.type === 'gltfModel') {
                this.loader.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            }
            else if(source.type === 'texture') {
                this.loader.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            }
            else if(source.type === 'cubeTexture'){
                this.loader.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            }
        }
    }

    sourceLoaded(source, file) {
        this.item[source.name] = file;

        this.loaded++;

        if(this.loaded = this.toLoad) {
            console.log('Resource finished loaded');
            this.trigger('ready');
        }
    }
}