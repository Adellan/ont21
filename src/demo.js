import * as BABYLON from 'babylonjs';
import { sky } from './sky';
import { terrain } from './ground';
import { bee } from './bee';
import { tunnel } from './tunnel'
import { uniCam } from './cameraHandler';

const start = () => {

    let dt;
    const canvas = document.getElementById('renderCanvas');
        // Load the 3D engine
    const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

    const createWorld = () => {
        const scene = new BABYLON.Scene(engine);

        //TODO: camera handling, better view
        //const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/2,  Math.PI/2, 30, BABYLON.Vector3(0, 50, 0), scene);
        
        //scene.activeCamera = camera;
        //camera.upperBetaLimit = Math.PI / 2.2;
        const camera = new uniCam(scene);
        camera.attachControl(canvas, true);
        scene.activeCamera = camera;

        // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
        const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        light1.intensity = 0.5;
        //aimed about so that it looks like the sunlight
        const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-2.2, -2, -1), scene);
        light.position = new BABYLON.Vector3(20, 200, 20);
        light.intensity = 0.65;
        const shadowGenerator = new BABYLON.ShadowGenerator(512, light);
        terrain(scene, shadowGenerator);
        //bee(scene);
        //sky(scene);
        /*const music = new BABYLON.Sound("Music", "audio/Tankekart.mp3", scene, function() {
            //music.play();
        }, {
            loop: false,
            autoplay: false,
            volume: 0.2
        });*/

        return scene;

    }

    const createTunnelScene = () => {
        const scene = new BABYLON.Scene(engine);
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        //let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(), scene);
        //const camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero());
        //camera.attachControl(canvas, true);
        //scene.activeCamera = camera;
        tunnel(scene, canvas);

        return scene;
    }
    const defaultScene = createWorld();
    //const tunnelScene = createTunnelScene();
    
    // run the render loop
    engine.runRenderLoop(() => {
        dt = engine.getDeltaTime();
        defaultScene.render();
        //tunnelScene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener('resize', () =>{
        engine.resize();
    });
}


window.onload = () => {
    
    start();
    
}
