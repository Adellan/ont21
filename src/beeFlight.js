import * as BABYLON from 'babylonjs';
import * as core from '@babylonjs/core';
import { addVector } from './assets/addVector';
import { bee } from './bee';
import { degToRad } from './assets/degToRad';

export const beeFlight = (scene, canvas) => {


    const beeOut = new bee(scene);
    const cam =  new BABYLON.UniversalCamera("unicam", new BABYLON.Vector3(0,10,0), scene);
    cam.upperBetaLimit = Math.PI / 2.2;
    cam.attachControl(canvas, true);
    
    scene.activeCamera = cam;
    cam.fov = Math.PI/2;
    cam.minZ = 3;
    cam.maxZ = 600;
    cam.updateUpVectorFromRotation = true;
    //The goal distance of camera from target
    cam.radius = 8;
    
    //start, control1, control2, end, points on curve
    //x, y, z -> here -x = right and -z = toward cam/"down"
    let curve = BABYLON.Curve3.CreateCubicBezier(addVector(-5,26,10), addVector(-28,25,22), addVector(-45,26,33), addVector(-60,30,45), 8);
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(-60,30,45), addVector(-70,40,40), addVector(-86,36,50), addVector(-135,40,55), 8));
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(160,40,60), addVector(120,45,20), addVector(117,40,0), addVector(200,45,-20), 8));
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(-125,32,90), addVector(-100,50,70), addVector(-80,40,-40), addVector(-25,35,-10), 8));
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(-25,15,-10), addVector(-16,20,-20), addVector(80,15,-40), addVector(10,10,60), 8));
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(-10,50,-20), addVector(-20,40,-10), addVector(-30,40,50), addVector(-51,28,44), 8));

    // Transform the curves into a proper Path3D object and get its orientation information
    var path3d = new BABYLON.Path3D(curve.getPoints());
    var tangents = path3d.getTangents();
    var binormals = path3d.getBinormals();
    var curvePath = path3d.getCurve();

    // visualisation
    /*let pathGroup = new BABYLON.Mesh("pathGroup");
    var normals = path3d.getNormals();
    for(var p = 0; p < curvePath.length; p++) {
        var tg = BABYLON.Mesh.CreateLines('tg', [ curvePath[p], curvePath[p].add(tangents[p]) ], scene);
        tg.color = BABYLON.Color3.Red();
        tg.parent = pathGroup;
        var no = BABYLON.Mesh.CreateLines('no', [ curvePath[p], curvePath[p].add(normals[p]) ], scene);
        no.color = BABYLON.Color3.Blue();
        no.parent = pathGroup;
        var bi = BABYLON.Mesh.CreateLines('bi', [ curvePath[p], curvePath[p].add(binormals[p]) ], scene);
        bi.color = BABYLON.Color3.Green();
        bi.parent = pathGroup;
    }*/

    // Define the position and orientation animations that will be populated
    // according to the Path3D properties 
    const frameRate = 60;
    const posAnim = new BABYLON.Animation("beepos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    const posKeys = [];
    const moveAnim = new BABYLON.Animation("cam", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    const moveKeys = [];
    const rotAnim = new BABYLON.Animation("beerot", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
    const rotKeys = [];


    for (let i = 0; i < curvePath.length; i++) {
        const position = curvePath[i];
        //const tangent = tangents[i];
        const binormal = binormals[i]
        rotKeys.push({frame: i * frameRate, value: i * binormal.y});
        posKeys.push({frame: i * frameRate, value: position});
        const counted = addVector(position.x + 10, position.y + 10, position.z - 5);
        moveKeys.push({frame: i * frameRate, value: counted});
    }

    posAnim.setKeys(posKeys);
    moveAnim.setKeys(moveKeys);
    rotAnim.setKeys(rotKeys);
    beeOut.animations.push(posAnim);
    beeOut.animations.push(rotAnim);
    cam.animations.push(moveAnim);
    const remo = () => {
    cam.rotation.x = degToRad(30)
    cam.rotation.y = degToRad(-30)
    cam.position.z = -15;
    cam.position.x = 30;
    cam.position.y = 45;
    }
    
    scene.beginDirectAnimation(beeOut, beeOut.animations, 0, frameRate*curvePath.length-2, false, 2, remo());
    scene.beginDirectAnimation(cam, cam.animations, 0, frameRate*curvePath.length-4, false, 2);

    return cam;

}