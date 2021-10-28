import * as BABYLON from 'babylonjs';
import { sky } from './sky';
import { terrain } from './ground';
import { bee } from './bee';
import { trees } from './plants';

const start = () => {
    console.log("it starts!")

const canvas = document.getElementById('renderCanvas');
// Load the 3D engine
const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene
const createScene = () => {
    // Create a basic BJS Scene object
    const scene = new BABYLON.Scene(engine);

    //const position = new BABYLON.Vector3(0, 5, -10);
    const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    scene.activeCamera = camera;
    //camera.upperBetaLimit = Math.PI / 2.2;

    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);

    bee(scene);
    sky(scene);
    //terrain(scene);
    //trees(scene);

    return scene;
}

const scene = createScene();
// run the render loop
engine.runRenderLoop(() => {
    scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', () =>{
    engine.resize();
});
}

window.onload = () => {
    start();
}
