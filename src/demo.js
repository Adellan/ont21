import * as BABYLON from 'babylonjs';
import { sky } from './sky';
import { terrain } from './ground';
import { tunnel } from './tunnel'
import { beeFlight } from './beeFlight';
import { bee } from './bee';
import { addVector } from './assets/addVector';
import { degToRad } from './assets/degToRad';


//flightcam is borked


const rundemo = () => {
    const canvas = document.getElementById('renderCanvas');
    // Load the 3D engine
    const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
    const createWorld = () => {
        const scene = new BABYLON.Scene(engine);
        // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
        const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        light1.intensity = 0.5;
        //aimed about so that it looks like the sunlight
        const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-2.2, -2, -1), scene);
        light.position = new BABYLON.Vector3(20, 200, 20);
        light.intensity = 0.65;

        //temp cam
        // Parameters: name, alpha, beta, radius, target position, scene
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(20, 50, 10), scene);

        // Positions the camera overwriting alpha, beta, radius
        camera.setPosition(new BABYLON.Vector3(0, 40, 20));

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        //end of temp cam

        const shadowGenerator = new BABYLON.ShadowGenerator(512, light);
        //const bzz = new bee(scene);
        //bzz.position = addVector(-5,28,10);
        
        terrain(scene, shadowGenerator);
        //sky(scene);
        /*if(!joojoo){
            //beeFlight(scene, canvas, bzz);
        }
        let vika = false;
        if(vika){
            console.log('vika')
            bzz.position = addVector(10,50,2);
            const vcam = new BABYLON.ArcRotateCamera("vcam", 3 * Math.PI / 2, Math.PI / 8, 100, addVector(bzz.position.x + 1, bzz.position.y + 50, bzz.position.z + 1), scene);
            vcam.attachControl(canvas, true);
            scene.activeCamera = vcam;
            
            bzz.rotation.x = degToRad(90);
            scene.registerAfterRender(function() {
                vcam.rotate(BABYLON.Axis.Y, Math.PI/96, BABYLON.Space.WORLD);
            });*/
        //}
        
        //sky(scene);
        /*const music = new BABYLON.Sound("Music", "audio/Tankekart.mp3", scene, function() {
            music.play();
        }, {
            loop: false,
            autoplay: false,
            volume: 0.2
        });*/

        return scene;
    }
    const defaultScene = createWorld();
    /*const createTunnelScene = () => {
        const scene = new BABYLON.Scene(engine);
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        const bzz = new bee(scene);
        tunnel(scene, canvas, bzz);
        return scene;
    }
    
    //const tunnelScene = createTunnelScene();

    let joo = false;
    let joojoo = false;
    let vika = false;
    setTimeout(() => {
        joo = true;
    }, 64000);
    setTimeout(() => {
        joo = false;
        joojoo = true;
        vika = true;
    }, 84000);
    setTimeout(() => {
        engine.stopRenderLoop();
    }, 99000);*/
    
    // run the render loop
    engine.runRenderLoop(() => {
        /*if(joo) {
            tunnelScene.render()
        } else {
            defaultScene.render();
        }*/
        defaultScene.render();
    });
    
    // the canvas/window resize event handler
    window.addEventListener('resize', () =>{
        engine.resize();
    });
};
window.onload = () => {
    rundemo();
    /*var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}
    var front = document.getElementById("front");
    var btn = document.getElementById("btn");
    window.addEventListener('click', () =>{
        console.log('btn')
        //openFullscreen();
        btn.onclick = rundemo();
        front.style.display = "none"
    });
    */
};